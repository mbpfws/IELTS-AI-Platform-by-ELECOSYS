export interface SpeakingTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory?: string;
  systemInstruction: string;
  initialQuestion: string;
  learningObjectives: string[];
  tags: string[];
}

export interface SpeakingSession {
  id: string;
  templateId?: string;
  customPrompt?: string;
  startTime: Date;
  duration: number; 
  messages: SpeakingMessage[];
  status: 'active' | 'completed';
  metrics?: SpeakingMetrics;
}

export interface SpeakingMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

export interface SpeakingMetrics {
  fluency: number;
  vocabulary: number;
  grammar: number;
  pronunciation: number;
}

export interface SpeakingStats {
  totalSessions: number;
  averageScores: SpeakingMetrics;
  recentSessions: SpeakingSession[];
  commonTopics: string[];
  weakestAreas: string[];
  strongestAreas: string[];
  practiceTime: number; 
}
