import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  private static instance: GeminiService;
  private genAI: GoogleGenerativeAI;

  private constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Missing NEXT_PUBLIC_GEMINI_API_KEY environment variable');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  public async generateResponse(prompt: string, systemPrompt?: string, config?: any): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: config?.modelName || "learnlm-1.5-pro-experimental",
        ...config
      });

      const fullPrompt = systemPrompt 
        ? `${systemPrompt}\n\nUser: ${prompt}`
        : prompt;

      const result = await model.generateContent(fullPrompt);
      return result.response.text();
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  }

  public async generateChat(messages: { role: string; content: string }[]): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: "learnlm-1.5-pro-experimental",
      });

      const chat = model.startChat();
      let response = '';

      for (const message of messages) {
        const result = await chat.sendMessage(message.content);
        response = result.response.text();
      }

      return response;
    } catch (error) {
      console.error('Error in chat generation:', error);
      throw error;
    }
  }
}

export const geminiService = GeminiService.getInstance();
