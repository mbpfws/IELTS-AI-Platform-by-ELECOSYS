export interface SpeakingMetrics {
  pronunciation: number;
  grammar: number;
  vocabulary: number;
  fluency: number;
  coherence: number;
  overallBand?: number;
  feedback?: {
    strengths: string[];
    improvements: string[];
    tips: string[];
  };
  nextSteps?: string[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  contentType?: 'text' | 'audio' | 'feedback';
  audioUrl?: string;
}

export interface SpeakingSession {
  id: string;
  userId: string;
  templateId: string;
  startTime: number;
  endTime?: number;
  duration: number;
  messages: Message[];
  metrics?: SpeakingMetrics;
  audioUrls: string[]; // URLs to stored audio recordings
}

export interface SpeakingHistory {
  userId: string;
  sessions: {
    [sessionId: string]: SpeakingSession;
  };
  stats: {
    totalSessions: number;
    averageBand: number;
    timeSpent: number; // in minutes
    lastSessionDate: number;
  };
}
