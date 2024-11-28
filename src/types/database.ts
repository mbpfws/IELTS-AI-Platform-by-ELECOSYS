export interface ChatSession {
  id: string;
  userId: string;
  agentId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  messageId: string;
  type: 'audio' | 'image' | 'document';
  url: string;
  metadata?: Record<string, any>;
}

export interface Agent {
  id: string;
  name: string;
  type: 'writing' | 'speaking' | 'custom';
  model: 'gemini-1.5-pro' | 'gemini-1.5-flash' | 'gemini-1.5-flash-8b' | 'learnlm-1.5-pro-experimental';
  systemPrompt: string;
  temperature: number;
  maxOutputTokens: number;
  topP: number;
  responseFormat: 'structured' | 'plain' | 'code';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProgress {
  id: string;
  userId: string;
  skillType: 'writing' | 'speaking';
  bandScores: {
    taskResponse: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammaticalRange: number;
    pronunciation?: number;
    fluency?: number;
  };
  date: Date;
}
