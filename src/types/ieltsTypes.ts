export interface IELTSCriteria {
  score: number;
  strengths: string[];
  weaknesses: string[];
  examples: string[];
}

export interface IELTSFeedback {
  fluencyAndCoherence: IELTSCriteria;
  lexicalResource: IELTSCriteria;
  grammaticalRange: IELTSCriteria;
  pronunciation: IELTSCriteria;
  overallBand: number;
  nextSteps: string[];
}

export interface IELTSTemplate {
  id: string;
  title: string;
  titleVi: string;
  titleEn: string;
  description: string;
  descriptionVi: string;
  descriptionEn: string;
  taskType: 'part1' | 'part2' | 'part3' | 'tutoring';
  level: string;
  targetBand: number;
  duration?: number;
  systemPrompt?: string;
  supportText?: string;
}

export interface IELTSSession {
  id: string;
  userId: string;
  template: IELTSTemplate;
  startTime: Date;
  duration: number;
  status: 'active' | 'completed';
  feedback?: IELTSFeedback;
}
