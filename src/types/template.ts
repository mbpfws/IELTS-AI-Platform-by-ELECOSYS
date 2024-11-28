export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'All Levels';
export type IELTSBand = '5.0-6.0' | '6.0-7.0' | '7.0-8.0' | '8.0-9.0' | 'Any';

export interface Template {
  id: string;
  title: string;
  titleVi: string;
  titleEn?: string;
  description: string;
  descriptionVi: string;
  descriptionEn?: string;
  systemPrompt: string;
  level: CEFRLevel;
  targetBand: IELTSBand;
  taskType: 'task1' | 'task2';
  criteria: ('task_response' | 'coherence_cohesion' | 'lexical_resource' | 'grammatical_range')[];
  topics: string[];
  tags: string[];
  objectives: string[];
  part?: 'PART1' | 'PART2' | 'PART3';
  topic?: string;
}
