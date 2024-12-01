import { GoogleGenerativeAI } from "@google/generative-ai";

export interface SessionResponse {
  message: string;
  metrics?: {
    fluency?: number;
    lexical?: number;
    grammar?: number;
    pronunciation?: number;
  };
}

class IELTSGeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private currentSessionId: string | null = null;
  private conversationHistory: { role: string; content: string; timestamp: number; }[] = [];
  private currentTopic: string = '';
  private learningFocus: string[] = [];

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key is not configured');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  setSessionId(sessionId: string) {
    this.currentSessionId = sessionId;
    this.conversationHistory = [];
  }

  setTopicAndFocus(topic: string, focus: string[] = []) {
    this.currentTopic = topic;
    this.learningFocus = focus;
  }

  private getLastMessages(count: number = 3): string {
    return this.conversationHistory
      .slice(-count)
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');
  }

  async sendMessage(content: string): Promise<SessionResponse> {
    try {
      this.conversationHistory.push({ role: 'user', content, timestamp: Date.now() });

      const prompt = `You are an IELTS speaking tutor conducting a practice session.

Current topic: ${this.currentTopic}
Learning focus: ${this.learningFocus.join(', ')}

Recent conversation:
${this.getLastMessages()}

As a tutor:
1. Listen actively and identify areas for improvement
2. Provide gentle corrections and suggestions
3. Encourage expanded answers
4. Teach relevant vocabulary and expressions
5. Help with pronunciation and grammar when needed
6. Keep the conversation natural and engaging

Rules:
- Be encouraging and supportive
- Mix practice with teaching moments
- Provide specific feedback when needed
- Keep the conversation flowing naturally
- Help build confidence
- Suggest alternative expressions or vocabulary when appropriate

Provide your response in this JSON format:
{
  "response": {
    "message": "your response as a tutor, including any teaching points or suggestions",
    "followUp": "your next question or prompt to keep the conversation going"
  },
  "feedback": {
    "strengths": ["point out 1-2 things done well"],
    "suggestions": ["offer 1-2 specific suggestions for improvement"],
    "vocabulary": ["suggest 1-2 relevant words or phrases they could use"]
  }
}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        const parsed = JSON.parse(text);
        const formattedResponse = `${parsed.response.message}\n\n${parsed.feedback.suggestions.join('\n')}\n\n${parsed.response.followUp}`;
        
        this.conversationHistory.push({ 
          role: 'assistant', 
          content: formattedResponse,
          timestamp: Date.now()
        });

        // Calculate metrics based on feedback
        const metrics = {
          fluency: this.calculateMetric(parsed.feedback),
          lexical: this.calculateMetric(parsed.feedback),
          grammar: this.calculateMetric(parsed.feedback),
          pronunciation: this.calculateMetric(parsed.feedback)
        };

        return {
          message: formattedResponse,
          metrics
        };
      } catch (e) {
        console.error('Failed to parse AI response:', e);
        return {
          message: "Let's continue practicing. Could you tell me more about that?",
          metrics: {
            fluency: 6,
            lexical: 6,
            grammar: 6,
            pronunciation: 6
          }
        };
      }
    } catch (error) {
      console.error('Error in sendMessage:', error);
      throw error;
    }
  }

  async sendAudio(audioBlob: Blob): Promise<SessionResponse> {
    try {
      const prompt = `You are an IELTS speaking tutor conducting a practice session.

Current topic: ${this.currentTopic}
Learning focus: ${this.learningFocus.join(', ')}

Recent conversation:
${this.getLastMessages()}

As a tutor:
1. Focus on pronunciation and fluency
2. Provide specific feedback on speaking rhythm
3. Help with intonation and stress
4. Suggest improvements for clarity
5. Encourage natural speech patterns
6. Build speaking confidence

Rules:
- Be encouraging and supportive
- Give specific pronunciation tips
- Help with word stress and rhythm
- Keep the conversation flowing
- Build speaking confidence
- Provide examples when helpful

Provide your response in this JSON format:
{
  "response": {
    "message": "your response as a tutor, including pronunciation feedback",
    "followUp": "your next question or prompt to keep the conversation going"
  },
  "feedback": {
    "strengths": ["point out 1-2 things done well"],
    "pronunciation": ["offer 1-2 specific pronunciation tips"],
    "practice": ["suggest 1-2 speaking exercises or phrases to practice"]
  }
}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        const parsed = JSON.parse(text);
        const formattedResponse = `${parsed.response.message}\n\n${parsed.feedback.pronunciation.join('\n')}\n\n${parsed.response.followUp}`;
        
        this.conversationHistory.push({ 
          role: 'assistant', 
          content: formattedResponse,
          timestamp: Date.now()
        });

        // Calculate metrics based on feedback
        const metrics = {
          fluency: this.calculateMetric(parsed.feedback),
          lexical: this.calculateMetric(parsed.feedback),
          grammar: this.calculateMetric(parsed.feedback),
          pronunciation: this.calculateMetric(parsed.feedback)
        };

        return {
          message: formattedResponse,
          metrics
        };
      } catch (e) {
        console.error('Failed to parse AI response:', e);
        return {
          message: "I heard you. Let's keep practicing. Could you tell me more about that?",
          metrics: {
            fluency: 6,
            lexical: 6,
            grammar: 6,
            pronunciation: 6
          }
        };
      }
    } catch (error) {
      console.error('Error in sendAudio:', error);
      throw error;
    }
  }

  async initializeSession(params: { templateId: string; userName: string; duration: number }): Promise<SessionResponse> {
    const { templateId, userName, duration } = params;
    
    // Set a new session ID (using timestamp for uniqueness)
    const sessionId = `${userName}-${Date.now()}`;
    this.setSessionId(sessionId);
    
    // Initialize with a welcoming message
    const prompt = `You are an IELTS speaking tutor starting a new practice session.
Current context:
- Student Name: ${userName}
- Session Duration: ${duration} minutes
- Template ID: ${templateId}

Please provide a warm, welcoming introduction to the student and explain how the practice session will proceed. Keep it brief but encouraging.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const message = response.text();
      
      this.conversationHistory.push({
        role: 'assistant',
        content: message,
        timestamp: Date.now()
      });

      return { message };
    } catch (error) {
      console.error('Failed to initialize IELTS speaking session:', error);
      throw error;
    }
  }

  private calculateMetric(feedback: any): number {
    // Simple metric calculation based on feedback
    // This could be made more sophisticated based on your needs
    const baseScore = 6;
    const strengthBonus = (feedback.strengths?.length || 0) * 0.5;
    const improvementPenalty = (feedback.suggestions?.length || 0) * 0.25;
    
    return Math.min(9, Math.max(1, baseScore + strengthBonus - improvementPenalty));
  }
}

export const ieltsGeminiService = new IELTSGeminiService();
