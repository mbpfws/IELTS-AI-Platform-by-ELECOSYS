export interface SpeakingMetrics {
  fluency: number;
  grammar: number;
  vocabulary: number;
  pronunciation: number;
}

export interface UserProfile {
  id: string;
  name: string;
  level: string;
  targetScore: number;
  weakPoints: string[];
  strongPoints: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  audioUrl?: string;
}

export interface SpeakingTemplate {
  id: string;
  title: string;
  part: 1 | 2 | 3;
  difficulty: 'easy' | 'medium' | 'hard';
  systemInstruction: string;
  category: string;
  description: string;
  targetBand: number;
  duration: number;
  initialQuestion: string;
  learningObjectives: string[];
  tags: string[];
}

export interface SpeakingSession {
  id: string;
  userId: string;
  startTime: Date;
  duration: number; 
  status: 'active' | 'completed' | 'cancelled';
  topic?: string;
  template?: {
    id: string;
    title: string;
    part: 1 | 2 | 3;
    difficulty: 'easy' | 'medium' | 'hard';
    systemInstruction: string;
  };
  messages: Message[];
  finalFeedback?: {
    metrics: SpeakingMetrics;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    overallScore: number;
  };
}

export interface SpeakingHistory {
  userId: string;
  sessions: {
    [sessionId: string]: SpeakingSession;
  };
  stats: {
    totalSessions: number;
    averageBand: number;
    timeSpent: number; 
    lastSessionDate: number;
  };
}
