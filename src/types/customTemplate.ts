export interface CustomTemplateForm {
  title: string;
  titleVi: string;
  difficulty: 'easy' | 'medium' | 'hard';
  systemInstruction: string;
  description?: string;
  descriptionVi?: string;
  objectives?: string[];
  topics?: string[];
  tags?: string[];
  part?: 1 | 2 | 3;
  duration?: number;
  learningObjectives: string[];
  initialQuestion?: string;
}
