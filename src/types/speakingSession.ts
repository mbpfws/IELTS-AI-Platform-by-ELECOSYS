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
  titleVi: string;
  titleEn: string;
  description?: string;
  descriptionVi: string;
  descriptionEn: string;
  systemPrompt: string;
  questions?: string[];
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  targetBand: number;
  criteria: string[];
  topics?: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  taskType: 'task1' | 'task2' | 'task3' | 'lesson';
  duration?: number;
  supportText?: string;
  tags?: string[];
  part?: number;
  objectives?: string[];
}

export interface TemplateFilters {
  category?: string;
  level?: string;
  targetBand?: number;
  difficulty?: string;
  taskType?: string;
  searchQuery?: string;
  tags?: string[];
}

export type SortOption = 
  | 'title'
  | 'level'
  | 'targetBand'
  | 'difficulty'
  | 'category';

export interface SortConfig {
  field: SortOption;
  direction: 'asc' | 'desc';
}

export interface SpeakingSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  template?: {
    id: string;
    title: string;
    part: 1 | 2 | 3;
    difficulty: 'easy' | 'medium' | 'hard';
    systemPrompt: string;
  };
  messages: Message[];
  metrics?: SpeakingMetrics;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface SpeakingStats {
  totalSessions: number;
  averageBand: number;
  timeSpent: number;
  lastSessionDate: number;
}

export interface SpeakingHistory {
  userId: string;
  sessions: {
    [sessionId: string]: SpeakingSession;
  };
  stats: SpeakingStats;
}
