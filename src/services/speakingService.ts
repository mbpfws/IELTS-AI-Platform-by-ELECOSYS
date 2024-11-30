import { Message, SpeakingMetrics, SpeakingSession, SpeakingStats, SpeakingTemplate } from '../types/speakingSession';
import { GeminiService } from './gemini';
import { AudioService } from '../services/audioService';
import { part1Templates, part2Templates, part3Templates } from '../data/speakingTemplates';

export class SpeakingService {
  private currentSession: SpeakingSession | null = null;
  private currentTemplate: SpeakingTemplate | null = null;
  private sessionTimer: NodeJS.Timeout | null = null;
  private audioService: AudioService;
  private geminiService: GeminiService;

  constructor(audioService: AudioService, geminiService: GeminiService) {
    this.audioService = audioService;
    this.geminiService = geminiService;
  }

  async startSession(userId: string, templateId: string): Promise<SpeakingSession> {
    if (this.currentSession) {
      throw new Error('A session is already in progress');
    }

    const template = await this.findTemplate(templateId);
    if (!template) {
      throw new Error('Template not found');
    }

    const session: SpeakingSession = {
      id: crypto.randomUUID(),
      userId,
      startTime: new Date(),
      duration: 0,
      template: {
        id: template.id,
        title: template.title,
        part: template.part,
        difficulty: template.difficulty,
        systemPrompt: template.systemPrompt
      },
      messages: [],
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.currentSession = session;
    this.currentTemplate = template;
    this.startTimer();

    return session;
  }

  private async findTemplate(templateId: string): Promise<SpeakingTemplate | null> {
    const allTemplates = [...part1Templates, ...part2Templates, ...part3Templates];
    return allTemplates.find(t => t.id === templateId) || null;
  }

  private startTimer(): void {
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
    }

    this.sessionTimer = setInterval(() => {
      if (this.currentSession) {
        this.currentSession.duration += 1;
      }
    }, 1000);
  }

  async processAudioInput(audioBlob: Blob): Promise<{
    transcription: string;
    response: string;
    metrics: SpeakingMetrics;
  }> {
    if (!this.currentSession || !this.currentTemplate) {
      throw new Error('No active session');
    }

    try {
      const analysis = await this.audioService.processAudio(audioBlob);
      const transcription = analysis.transcription;
      const response = await this.generateResponse(this.currentTemplate, transcription);

      await this.addMessage({
        role: 'user',
        content: transcription
      });

      await this.addMessage({
        role: 'assistant',
        content: response
      });

      const metrics: SpeakingMetrics = {
        fluency: analysis.feedback.fluency,
        vocabulary: analysis.feedback.vocabulary,
        grammar: analysis.feedback.grammar,
        pronunciation: analysis.feedback.pronunciation,
        coherence: analysis.feedback.coherence,
        feedback: {
          strengths: [],
          weaknesses: [],
          suggestions: analysis.suggestions
        }
      };

      return {
        transcription,
        response,
        metrics
      };
    } catch (error) {
      console.error('Error processing audio:', error);
      throw error;
    }
  }

  private async generateResponse(template: SpeakingTemplate, userInput: string): Promise<string> {
    return await this.geminiService.generateContent(userInput, template.systemPrompt, 'chat');
  }

  private async addMessage(messageData: Omit<Message, 'id' | 'timestamp'>): Promise<void> {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    const message: Message = {
      id: crypto.randomUUID(),
      ...messageData,
      timestamp: Date.now()
    };

    this.currentSession.messages.push(message);
    this.currentSession.updatedAt = new Date();
  }

  async endSession(): Promise<SpeakingSession> {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
      this.sessionTimer = null;
    }

    this.currentSession.endTime = new Date();
    this.currentSession.status = 'completed';
    this.currentSession.updatedAt = new Date();

    const finalSession = { ...this.currentSession };
    this.currentSession = null;
    this.currentTemplate = null;

    return finalSession;
  }

  async getStats(userId: string): Promise<SpeakingStats> {
    const sessions = await this.getSessions(userId);
    return {
      totalSessions: Object.keys(sessions).length,
      averageBand: await this.calculateAverageBand(sessions),
      timeSpent: this.calculateTotalTimeSpent(sessions),
      lastSessionDate: this.getLastSessionDate(sessions)
    };
  }

  private isSessionActive(): boolean {
    return this.currentSession !== null && this.currentSession.status === 'active';
  }

  private shouldProvideScoring(): boolean {
    return this.currentSession !== null && this.currentSession.duration > 0;
  }

  private async getSessions(userId: string): Promise<{ [sessionId: string]: SpeakingSession }> {
    // Implement session storage retrieval
    return {};
  }

  private async calculateAverageBand(sessions: { [sessionId: string]: SpeakingSession }): Promise<number> {
    const bands = Object.values(sessions)
      .map(session => session.metrics?.overallBand)
      .filter((band): band is number => band !== undefined);
    
    return bands.length > 0 ? bands.reduce((a, b) => a + b, 0) / bands.length : 0;
  }

  private calculateTotalTimeSpent(sessions: { [sessionId: string]: SpeakingSession }): number {
    return Object.values(sessions).reduce((total, session) => total + session.duration, 0);
  }

  private getLastSessionDate(sessions: { [sessionId: string]: SpeakingSession }): number {
    const dates = Object.values(sessions).map(session => session.endTime?.getTime() || 0);
    return Math.max(...dates, 0);
  }
}

export const speakingService = new SpeakingService(
  new AudioService(), 
  GeminiService.getInstance()
);
