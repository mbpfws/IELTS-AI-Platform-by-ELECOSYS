export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type IELTSBand = '5.0-6.0' | '6.0-7.0' | '7.0-8.0' | '8.0-9.0';

export interface Template {
  id: string;
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  systemPrompt: string;
  level: CEFRLevel;
  targetBand: IELTSBand;
  taskType: 'task1' | 'task2';
  criteria: ('task_response' | 'coherence_cohesion' | 'lexical_resource' | 'grammatical_range')[];
  topics: string[];
  tags: string[];
  objectives: string[];
}
