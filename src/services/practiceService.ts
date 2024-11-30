import { createClient } from '@supabase/supabase-js';
import { Template } from '@/types/template';
import { v4 as uuidv4 } from 'uuid';
import { ieltsGeminiService } from './ieltsGeminiService';

// Initialize Supabase client with error handling
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

export interface PracticeSession {
  id: string;
  type: 'tutor' | 'template' | 'mock-test';
  startTime: number;
  endTime?: number;
  duration: number;
  topics: string[];
  feedback: SessionFeedback[];
  messages: Message[];
  audioUrls: string[];
}

export interface SessionFeedback {
  timestamp: number;
  metrics: {
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    fluency: number;
    coherence: number;
  };
  notes: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  audioUrl?: string;
}

export interface UserProgress {
  totalSessions: number;
  averageScores: {
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    fluency: number;
    coherence: number;
  };
  recentTopics: string[];
  weakAreas: string[];
  strongAreas: string[];
}

export interface SessionWithIncludes {
  id: string;
  user_id: string;
  template_id?: string;
  start_time: string;
  end_time?: string;
  duration: number;
  status: string;
  messages: Message[];
  recordings: { url: string; duration: number }[];
  metrics: {
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    fluency: number;
    coherence: number;
  } | null;
  feedback: {
    content: string;
    score: number;
  } | null;
}

class PracticeService {
  private static instance: PracticeService;

  private constructor() {}

  public static getInstance(): PracticeService {
    if (!PracticeService.instance) {
      PracticeService.instance = new PracticeService();
    }
    return PracticeService.instance;
  }

  async startSession(template: any, userName: string, duration: number) {
    try {
      console.log('Starting session with template:', template);
      
      // Validate template data
      if (!template || typeof template !== 'object') {
        throw new Error('Invalid template data');
      }

      // Initialize Gemini session first to ensure AI is ready
      const aiResponse = await ieltsGeminiService.startSession(template, userName, duration);
      
      // Create session in database with explicit UUID for test user
      const testUserId = uuidv4(); // Generate a unique UUID for each session
      
      // First, create the session
      const sessionData = {
        template_id: template.id || null, // Handle case where template has no ID
        duration: Math.floor(duration * 60), // Convert to seconds and ensure integer
        user_id: testUserId,
        status: 'active',
        start_time: new Date().toISOString()
      };
      
      console.log('Creating session with data:', sessionData);
      
      // Test database connection first
      const { error: testError } = await supabase
        .from('ailts_sessions')
        .select('id')
        .limit(1);
        
      if (testError) {
        console.error('Database connection error:', testError);
        throw new Error(`Database connection error: ${testError.message}`);
      }
      
      // Create session
      const { data: createdSession, error: sessionError } = await supabase
        .from('ailts_sessions')
        .insert(sessionData)
        .select('id')
        .single();

      if (sessionError) {
        console.error('Session creation error:', sessionError);
        throw new Error(`Database error: ${sessionError.message}`);
      }

      if (!createdSession?.id) {
        throw new Error('No session ID returned from database');
      }

      console.log('Session created with ID:', createdSession.id);

      // Add initial user message
      const userMessage = {
        session_id: createdSession.id,
        role: 'user',
        content: `Hi, I'm ${userName}. I would like to practice IELTS Speaking about "${template.title}". The topic is: ${template.description}. I want to practice for ${duration} minutes. Can you be my tutor and help me improve my speaking skills?`,
        content_type: 'text',
        timestamp: new Date().toISOString()
      };
      
      console.log('Adding user message:', userMessage);

      const { error: userMessageError } = await supabase
        .from('ailts_messages')
        .insert(userMessage);

      if (userMessageError) {
        console.error('User message error:', userMessageError);
        throw new Error(`Failed to create user message: ${userMessageError.message}`);
      }

      // Add AI response message
      const assistantMessage = {
        session_id: createdSession.id,
        role: 'assistant',
        content: aiResponse.message,
        content_type: 'text',
        timestamp: new Date().toISOString()
      };
      
      console.log('Adding assistant message:', assistantMessage);

      const { error: assistantMessageError } = await supabase
        .from('ailts_messages')
        .insert(assistantMessage);

      if (assistantMessageError) {
        console.error('Assistant message error:', assistantMessageError);
        throw new Error(`Failed to create assistant message: ${assistantMessageError.message}`);
      }

      // Get the complete session data
      console.log('Retrieving complete session data');
      
      const { data: session, error: getSessionError } = await supabase
        .from('ailts_sessions')
        .select(`
          *,
          ailts_messages (*)
        `)
        .eq('id', createdSession.id)
        .single();

      if (getSessionError) {
        console.error('Get session error:', getSessionError);
        throw new Error(`Failed to retrieve session: ${getSessionError.message}`);
      }

      if (!session) {
        throw new Error('Failed to retrieve session data');
      }

      console.log('Session retrieved successfully:', session);

      return {
        ...session,
        initialMessage: aiResponse.message,
        metrics: aiResponse.metrics
      };
    } catch (error: any) {
      // Enhanced error logging
      const errorDetails = {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        statusCode: error.statusCode,
        name: error.name,
        stack: error.stack
      };
      console.error('Failed to start session with details:', errorDetails);
      
      // Re-throw with enhanced message
      throw new Error(`Database error: ${error.message || 'Unknown database error'}`);
    }
  }

  async submitAudio(sessionId: string, audioBlob: Blob) {
    try {
      // Upload audio file
      const audioFileName = `${sessionId}/${Date.now()}.webm`;
      const { data: audioData, error: uploadError } = await supabase.storage
        .from('recordings')
        .upload(audioFileName, audioBlob);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('recordings')
        .getPublicUrl(audioFileName);

      // Get transcription from Gemini
      const transcription = await ieltsGeminiService.transcribeAudio(audioBlob);

      // Save message to database
      const { data: message, error: messageError } = await supabase
        .from('ailts_messages')
        .insert({
          session_id: sessionId,
          role: 'user',
          content: transcription,
          content_type: 'audio',
          audio_url: publicUrl
        })
        .select()
        .single();

      if (messageError) throw messageError;

      return {
        transcription,
        audioUrl: publicUrl,
        message
      };
    } catch (error) {
      console.error('Failed to submit audio:', error);
      throw error;
    }
  }

  async getResponse(sessionId: string, userMessage: string) {
    try {
      // Get session history
      const { data: messages, error: historyError } = await supabase
        .from('ailts_messages')
        .select('role, content')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (historyError) throw historyError;

      // Get AI response
      const response = await ieltsGeminiService.getResponse(messages, userMessage);

      // Save AI response
      const { data: message, error: messageError } = await supabase
        .from('ailts_messages')
        .insert({
          session_id: sessionId,
          role: 'assistant',
          content: response.message,
          content_type: 'text'
        })
        .select()
        .single();

      if (messageError) throw messageError;

      // Update metrics if provided
      if (response.metrics) {
        await this.updateMetrics(sessionId, response.metrics);
      }

      return response;
    } catch (error) {
      console.error('Failed to get response:', error);
      throw error;
    }
  }

  async updateMetrics(sessionId: string, metrics: any) {
    try {
      const { error } = await supabase
        .from('ailts_metrics')
        .upsert({
          session_id: sessionId,
          ...metrics
        });

      if (error) throw error;
    } catch (error) {
      console.error('Failed to update metrics:', error);
      throw error;
    }
  }

  async endSession(sessionId: string) {
    try {
      // Get session history
      const { data: messages, error: historyError } = await supabase
        .from('ailts_messages')
        .select('role, content')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (historyError) throw historyError;

      // Get final feedback from Gemini
      const feedback = await ieltsGeminiService.getFinalFeedback(messages);

      // Save feedback
      await supabase
        .from('ailts_feedback')
        .insert({
          session_id: sessionId,
          content: feedback.summary,
          score: feedback.score
        });

      // Update session status
      await supabase
        .from('ailts_sessions')
        .update({
          status: 'completed',
          end_time: new Date().toISOString()
        })
        .eq('id', sessionId);

      return feedback;
    } catch (error) {
      console.error('Failed to end session:', error);
      throw error;
    }
  }
}

export const practiceService = PracticeService.getInstance();
