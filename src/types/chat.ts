export type AgentType = 'writing' | 'speaking' | 'custom';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  contentType?: 'text' | 'audio' | 'feedback';
  audioUrl?: string;
}

export interface Session {
  id: string;
  name: string;
  messages: ChatMessage[];
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
