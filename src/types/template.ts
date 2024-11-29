export type TestType = 'part1' | 'part2' | 'part3' | 'mock_test' | 'free_style' | 'advanced' | 'task1' | 'task2' | 'PART1' | 'PART2' | 'PART3';
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'All Levels';
export type IELTSBand = '4.0-5.0' | '5.0-6.0' | '6.0-7.0' | '7.0-8.0' | '7.0-8.5' | '7.0-9.0' | 'Any';

export interface BaseTemplate {
  id: string;
  title: string;
  description: string;
  part: string;
  taskType: string;
  level: string;
  targetBand: number;
  criteria: string[];
  duration?: number;
  supportText?: string;
  tags?: string[];
  category?: string;
}

export interface Template extends BaseTemplate {
  systemPrompt: string;
}

export interface WritingTemplate extends BaseTemplate {
  objectives: string[];
  systemPrompt: string;
  taskType: 'task1' | 'task2';
  level: CEFRLevel;
  targetBand: IELTSBand;
}

export interface SpeakingTemplate extends BaseTemplate {
  titleVi: string;
  titleEn: string;
  descriptionVi: string;
  descriptionEn: string;
  taskType: 'task1' | 'task2' | 'lesson';
  level: CEFRLevel;
  targetBand?: IELTSBand;
  criteria?: readonly ('task_response' | 'coherence_cohesion' | 'lexical_resource' | 'grammatical_range')[];
  topics?: string[];
  objectives?: string[];
  questions?: string[];
  cueCard?: string;
  systemPrompt: string;
}

export interface PerformanceStats {
  totalSessions: number;
  averageScore: number;
  timeSpent: number;
  completedTests: {
    part1: number;
    part2: number;
    part3: number;
    mockTest: number;
    freeStyle: number;
  };
  recentScores: number[];
  strengths: string[];
  weaknesses: string[];
}

export interface SpeakingMetrics {
  id: string;
  sessionId: string;
  pronunciation: number;
  fluency: number;
  grammar: number;
  vocabulary: number;
  coherence: number;
  taskResponse: number;
  overallScore: number;
  feedback: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MockTest {
  id: string;
  type: 'full' | 'part1' | 'part2' | 'part3';
  duration: number;
  parts: Template[];
}
