import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  AILTS_sessions: {
    Row: {
      id: string;
      user_id: string;
      template_id: string | null;
      start_time: string;
      end_time: string | null;
      duration: number;
      status: string;
      created_at: string;
      updated_at: string;
    };
  };
  AILTS_messages: {
    Row: {
      id: string;
      session_id: string;
      role: 'user' | 'assistant' | 'system';
      content: string;
      content_type: 'text' | 'audio' | 'feedback';
      audio_url: string | null;
      timestamp: string;
      created_at: string;
    };
  };
  AILTS_recordings: {
    Row: {
      id: string;
      session_id: string;
      url: string;
      duration: number;
      created_at: string;
    };
  };
  AILTS_metrics: {
    Row: {
      id: string;
      session_id: string;
      pronunciation: number | null;
      grammar: number | null;
      vocabulary: number | null;
      fluency: number | null;
      coherence: number | null;
      created_at: string;
      updated_at: string;
    };
  };
  AILTS_feedback: {
    Row: {
      id: string;
      session_id: string;
      content: string;
      score: number | null;
      created_at: string;
    };
  };
};
