export type AgentType = 'writing' | 'speaking' | 'custom';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  contentType?: 'text' | 'audio';
  audioUrl?: string;
}

export interface Session {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Date;
  lastUpdated?: Date;
  agentType: AgentType;
  summary?: string;
  systemPrompt?: string;
}

export interface ChatState {
  sessions: { [key in AgentType]: Session[] };
  currentSession: Session | null;
  isRecording: boolean;
  isProcessing: boolean;
}
