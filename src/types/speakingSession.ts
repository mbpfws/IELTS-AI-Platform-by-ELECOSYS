export interface SpeakingMetrics {
  vocabulary: number;
  grammar: number;
  fluency: number;
  pronunciation: number;
  coherence: number;
  overallBand?: number;
  feedback?: SpeakingFeedback;
}

export interface SpeakingFeedback {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
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
  systemPrompt: string;
  category: string;
  description: string;
  titleVi: string;
  titleEn: string;
  descriptionVi: string;
  descriptionEn: string;
  taskType: 'task1' | 'task2' | 'lesson';
  level: string;
  targetBand: number;
  criteria: string[];
  topics: string[];
  objectives: string[];
  questions?: string[];
  cueCard?: string;
  duration: number;
  supportText: string;
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
    systemPrompt: string;
  };
  messages: Message[];
  finalFeedback?: {
    metrics: SpeakingMetrics;
    feedback: SpeakingFeedback;
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
