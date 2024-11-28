export interface SpeakingSession {
  id: string;
  startTime: Date;
  duration: number; // in minutes
  mode: 'free' | 'template';
  topic?: string;
  level: string;
  targetBand: string;
  messages: Message[];
  audioRecordings: AudioRecording[];
  metrics: SpeakingMetrics;
  feedback?: SessionFeedback;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  audioUrl?: string;
}

export interface AudioRecording {
  id: string;
  url: string;
  duration: number;
  timestamp: Date;
  transcription?: string;
}

export interface SpeakingMetrics {
  pronunciation: number;
  grammar: number;
  vocabulary: number;
  fluency: number;
  coherence: number;
}

export interface SessionFeedback {
  scores: SpeakingMetrics;
  overallBand: number;
  feedback: {
    strengths: string[];
    improvements: string[];
    tips: string[];
  };
  nextSteps: string[];
  detailedFeedback: {
    english: string;
    vietnamese: string;
  };
}
