import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('Missing NEXT_PUBLIC_GEMINI_API_KEY environment variable');
}

const genAI = new GoogleGenerativeAI(apiKey);

class GeminiService {
  private static instance: GeminiService;
  private model;

  private constructor() {
    this.model = genAI.getGenerativeModel({ model: "learnlm-1.5-pro-experimental" });
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  }

  async generateChat(messages: { role: string; content: string }[]): Promise<string> {
    try {
      const chat = this.model.startChat({
        history: messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: msg.content,
        })),
      });

      const result = await chat.sendMessage(messages[messages.length - 1].content);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error in chat generation:', error);
      throw error;
    }
  }
}

export const geminiService = GeminiService.getInstance();
