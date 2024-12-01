import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

import { part1Templates } from '@/data/speakingTemplates/part1';
import { part2Templates } from '@/data/speakingTemplates/part2';
import { part3Templates } from '@/data/speakingTemplates/part3';

export interface IELTSTemplate {
  id: string;
  type: 'part1' | 'part2' | 'part3' | 'tutoring';
  title_en: string;
  title_vi: string;
  description_en: string;
  description_vi: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  duration: number;
  target_band: number;
  system_prompt: string;
  created_at: string;
  updated_at: string;
}

export interface IELTSSession {
  id: string;
  user_id: string;
  template_id: string;
  start_time: string;
  end_time: string | null;
  duration: number;
  metrics: {
    fluency: number;
    lexical: number;
    grammar: number;
    pronunciation: number;
  };
}

export interface IELTSMessage {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  audio_url?: string;
  created_at: string;
}

export interface IELTSFeedback {
  id: string;
  session_id: string;
  content: string;
  metrics: {
    fluency: number;
    lexical: number;
    grammar: number;
    pronunciation: number;
  };
  created_at: string;
}

class SupabaseService {
  private readonly TEMPLATES_TABLE = 'ailts_templates';
  private readonly SESSIONS_TABLE = 'ailts_sessions';
  private readonly MESSAGES_TABLE = 'ailts_messages';
  private readonly FEEDBACK_TABLE = 'ailts_feedback';
  private readonly METRICS_TABLE = 'ailts_metrics';
  private readonly RECORDINGS_TABLE = 'ailts_recordings';
  private readonly TEMPLATE_QUESTIONS_TABLE = 'ailts_template_questions';
  private readonly TEMPLATE_TOPICS_TABLE = 'ailts_template_topics';
  private readonly TEMPLATE_VOCABULARY_TABLE = 'ailts_template_vocabulary';
  private readonly RECORDINGS_BUCKET = 'ielts-recordings';
  private readonly TUTORING_TEMPLATES_TABLE = 'tutoring_templates';

  async getTemplates(type?: string): Promise<IELTSTemplate[]> {
    try {
      let query = supabase
        .from(this.TEMPLATES_TABLE)
        .select(`
          *,
          questions:${this.TEMPLATE_QUESTIONS_TABLE}(id, question, type),
          topics:${this.TEMPLATE_TOPICS_TABLE}(id, topic),
          vocabulary:${this.TEMPLATE_VOCABULARY_TABLE}(id, word, meaning, example)
        `);

      if (type) {
        query = query.eq('type', type);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching templates:', error);
      throw error;
    }
  }

  async createSession(session: {
    user_id: string;
    template_id: string;
    duration: number;
  }): Promise<IELTSSession> {
    try {
      // First check if template exists
      const { data: template, error: templateError } = await supabase
        .from(this.TEMPLATES_TABLE)
        .select('id')
        .eq('id', session.template_id)
        .single();

      if (templateError || !template) {
        throw new Error('Template not found');
      }

      // Create session with proper UUID for user_id
      const { data, error } = await supabase
        .from(this.SESSIONS_TABLE)
        .insert({
          user_id: session.user_id,
          template_id: session.template_id,
          duration: session.duration,
          start_time: new Date().toISOString(),
          metrics: {
            fluency: 0,
            lexical: 0,
            grammar: 0,
            pronunciation: 0
          }
        })
        .select('*')
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data) {
        throw new Error('No data returned from session creation');
      }

      return data;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  }

  async endSession(session_id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.SESSIONS_TABLE)
        .update({ end_time: new Date().toISOString() })
        .eq('id', session_id);

      if (error) throw error;
    } catch (error) {
      console.error('Error ending session:', error);
      throw error;
    }
  }

  async createMessage(message: {
    session_id: string;
    role: 'user' | 'assistant';
    content: string;
    audio_url?: string;
  }): Promise<IELTSMessage> {
    try {
      const { data, error } = await supabase
        .from(this.MESSAGES_TABLE)
        .insert({
          session_id: message.session_id,
          role: message.role,
          content: message.content,
          audio_url: message.audio_url,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating message:', error);
      throw error;
    }
  }

  async createFeedback(feedback: {
    session_id: string;
    content: string;
    metrics: IELTSFeedback['metrics'];
  }): Promise<IELTSFeedback> {
    try {
      const { data, error } = await supabase
        .from(this.FEEDBACK_TABLE)
        .insert({
          session_id: feedback.session_id,
          content: feedback.content,
          metrics: feedback.metrics,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating feedback:', error);
      throw error;
    }
  }

  async uploadAudio(file: File, session_id: string): Promise<string> {
    try {
      const filename = `${session_id}/${Date.now()}.webm`;
      const { data, error } = await supabase.storage
        .from(this.RECORDINGS_BUCKET)
        .upload(filename, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from(this.RECORDINGS_BUCKET)
        .getPublicUrl(filename);

      // Record the audio file in the recordings table
      const { error: recordError } = await supabase
        .from(this.RECORDINGS_TABLE)
        .insert({
          session_id,
          file_path: filename,
          public_url: urlData.publicUrl,
          created_at: new Date().toISOString()
        });

      if (recordError) throw recordError;

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading audio:', error);
      throw error;
    }
  }

  async updateSessionMetrics(session_id: string, metrics: IELTSSession['metrics']): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.SESSIONS_TABLE)
        .update({ metrics })
        .eq('id', session_id);

      if (error) throw error;

      // Also record in the metrics table for historical tracking
      const { error: metricsError } = await supabase
        .from(this.METRICS_TABLE)
        .insert({
          session_id,
          metrics,
          created_at: new Date().toISOString()
        });

      if (metricsError) throw metricsError;
    } catch (error) {
      console.error('Error updating session metrics:', error);
      throw error;
    }
  }

  async getSessionMessages(session_id: string): Promise<IELTSMessage[]> {
    try {
      const { data, error } = await supabase
        .from(this.MESSAGES_TABLE)
        .select('*')
        .eq('session_id', session_id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching session messages:', error);
      throw error;
    }
  }

  async getSessionFeedback(session_id: string): Promise<IELTSFeedback[]> {
    try {
      const { data, error } = await supabase
        .from(this.FEEDBACK_TABLE)
        .select('*')
        .eq('session_id', session_id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching session feedback:', error);
      throw error;
    }
  }

  async getSessionRecordings(session_id: string): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from(this.RECORDINGS_TABLE)
        .select('public_url')
        .eq('session_id', session_id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data?.map(r => r.public_url) || [];
    } catch (error) {
      console.error('Error fetching session recordings:', error);
      throw error;
    }
  }

  async saveTutoringTemplate(template: any): Promise<any> {
    try {
      const { data, error } = await supabase
        .from(this.TUTORING_TEMPLATES_TABLE)
        .insert([template])
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving tutoring template:', error);
      throw error;
    }
  }

  async getTutoringTemplates(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from(this.TUTORING_TEMPLATES_TABLE)
        .select('*');

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching tutoring templates:', error);
      throw error;
    }
  }
}

export const supabaseService = new SupabaseService();
