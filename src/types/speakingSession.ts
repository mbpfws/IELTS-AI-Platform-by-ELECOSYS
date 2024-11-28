export interface SpeakingMetrics {
  scores: {
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    fluency: number;
    coherence: number;
  };
  feedback: {
    strengths: string[];
    improvements: string[];
    tips: string[];
  };
  overallBand: number;
  nextSteps: string[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface SpeakingSession {
  id: string;
  userId: string;
  templateId: string;
  startTime: number;
  endTime?: number;
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
