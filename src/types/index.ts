export type AgentType = 'writing' | 'speaking' | 'custom';

export interface AgentConfig {
  modelName: string;
  temperature: number;
  topP: number;
  maxOutputTokens: number;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  contentType?: 'text' | 'audio';
}
