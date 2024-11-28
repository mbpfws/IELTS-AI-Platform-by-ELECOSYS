import { Message, SpeakingSession, SpeakingMetrics, SpeakingHistory } from '@/types/speakingSession';
import { tutorSystemPrompt } from '@/data/tutorSystemPrompt';
import { GeminiService } from './gemini';
import { audioService } from './audioService';
import { getSystemPrompt, getFeedbackPrompt } from '../data/tutorSystemPrompt';

// Interface for AudioService
interface IAudioService {
  processAudio(audioBlob: Blob, mode?: 'conversation' | 'scoring', context?: string): Promise<string>;
  uploadAudio(audioBlob: Blob): Promise<string>;
}

// Create a class-based service to maintain compatibility with existing code
export class SpeakingService {
  private static instance: SpeakingService;
  private currentSession: SpeakingSession | null = null;
  private sessionStartTime: number | null = null;
  private sessionDuration: number | null = null;
  private mode: 'practice' | 'mocktest' = 'practice';

  private constructor(
    private geminiService: GeminiService,
    private audioService: IAudioService
  ) {}

  public static getInstance(): SpeakingService {
    if (!SpeakingService.instance) {
      SpeakingService.instance = new SpeakingService(GeminiService.getInstance(), audioService);
    }
    return SpeakingService.instance;
  }

  startSession(
    userId: string, 
    duration: number, 
    mode: 'practice' | 'template' = 'practice',
    templateId?: string
  ): SpeakingSession {
    // Initialize session timing
    this.sessionStartTime = Date.now();
    this.sessionDuration = duration * 60 * 1000; // Convert minutes to milliseconds
    this.mode = mode === 'template' ? 'mocktest' : 'practice';

    // Create session with initialized messages array
    const sessionId = `speaking_${Date.now()}`;
    const session: SpeakingSession = {
      id: sessionId,
      userId,
      startTime: Date.now(),
      duration,
      templateId: templateId || 'default-template',
      messages: [],
      audioUrls: []
    };

    this.currentSession = session;
    return session;
  }

  private getWelcomeMessage(duration: number): string {
    return `Xin chào! Tôi là trợ lý luyện nói IELTS của bạn. Chúng ta sẽ có ${duration} phút để luyện tập cùng nhau. 
    
Trong suốt phiên này, chúng ta sẽ tập trung vào:
- Phát âm và ngữ điệu
- Từ vựng và ngữ pháp
- Tính lưu loát trong giao tiếp

Tôi sẽ đóng vai trò là người đối thoại và hướng dẫn bạn. Bạn có thể nói tự nhiên, và tôi sẽ chỉ đưa ra nhận xét chi tiết vào cuối phiên.

Bạn muốn bắt đầu với chủ đề nào?`;
  }

  private isSessionActive(): boolean {
    if (!this.sessionStartTime || !this.sessionDuration) return false;
    return Date.now() - this.sessionStartTime < this.sessionDuration;
  }

  private shouldProvideScoring(): boolean {
    if (!this.sessionStartTime || !this.sessionDuration) return false;
    return Date.now() - this.sessionStartTime >= this.sessionDuration;
  }

  addMessage(message: Omit<Message, 'timestamp'>): Message {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    // Initialize messages array if it doesn't exist
    if (!Array.isArray(this.currentSession.messages)) {
      this.currentSession.messages = [];
    }

    const messageWithTimestamp: Message = {
      ...message,
      timestamp: Date.now()
    };

    this.currentSession.messages.push(messageWithTimestamp);
    return messageWithTimestamp;
  }

  async sendMessage(content: string, audioUrl?: string): Promise<string> {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    try {
      // Initialize messages array if it doesn't exist
      if (!Array.isArray(this.currentSession.messages)) {
        this.currentSession.messages = [];
      }

      // Add user message to session
      const userMessage = this.addMessage({
        role: 'user',
        content,
        audioUrl,
        contentType: audioUrl ? 'audio' : 'text'
      });

      // Get context from previous messages
      const context = this.currentSession.messages
        .slice(-4) // Get last 4 messages for context
        .map(m => `${m.role}: ${m.content}`)
        .join('\n');

      // Generate system prompt with mode and context
      const systemPrompt = getSystemPrompt(this.mode);
      const fullPrompt = `${systemPrompt}\n\nContext:\n${context}\n\nUser: ${content}`;

      // Get AI response
      const response = await this.geminiService.sendMessage(
        fullPrompt,
        undefined,
        'speaking',
        {
          temperature: this.mode === 'mocktest' ? 0.3 : 0.7,
          topP: this.mode === 'mocktest' ? 0.9 : 0.8,
        }
      );

      // Check if response is feedback
      const isFeedback = response.includes('Pronunciation:') || 
                        response.includes('Grammar:') || 
                        response.includes('Vocabulary:') ||
                        response.includes('Fluency:');

      // Add AI response to session
      const aiMessage = this.addMessage({
        role: 'assistant',
        content: response,
        contentType: isFeedback ? 'feedback' : 'text'
      });

      return response;
    } catch (error) {
      console.error('Error in sendMessage:', error);
      throw error;
    }
  }

  async handleAudioInput(audioBlob: Blob): Promise<string> {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    try {
      // Check if we should provide scoring
      const shouldScore = !this.isSessionActive() && this.shouldProvideScoring();
      
      // Process audio with appropriate mode
      const transcription = await this.audioService.processAudio(
        audioBlob, 
        shouldScore ? 'scoring' : 'conversation'
      );
      
      // If scoring mode, use feedback prompt
      if (shouldScore) {
        const feedbackPrompt = getFeedbackPrompt();
        const response = await this.geminiService.sendMessage(
          `${feedbackPrompt}\n\nUser response: ${transcription}`,
          undefined,
          'speaking',
          {
            temperature: 0.3,
            topP: 0.9,
          }
        );
        
        // Add messages to session
        this.currentSession?.messages.push({
          role: 'user',
          content: transcription,
          audioUrl: URL.createObjectURL(audioBlob),
          contentType: 'audio',
          timestamp: 0
        });
        
        this.addMessage({
          role: 'assistant',
          content: response,
          contentType: 'feedback'
        });
        
        return response;
      }
      
      // For conversation mode, get context from previous messages
      const context = this.currentSession.messages
        .slice(-4) // Get last 4 messages for context
        .map(m => `${m.role}: ${m.content}`)
        .join('\n');

      // Generate conversation response
      const systemPrompt = getSystemPrompt(this.mode);
      const response = await this.geminiService.sendMessage(
        `${systemPrompt}\n\nContext:\n${context}\n\nUser: ${transcription}`,
        undefined,
        'speaking',
        {
          temperature: 0.7,
          topP: 0.8,
        }
      );

      // Add messages to session
      this.currentSession?.messages.push({
        role: 'user',
        content: transcription,
        audioUrl: URL.createObjectURL(audioBlob),
        contentType: 'audio',
        timestamp: 0
      });

      this.addMessage({
        role: 'assistant',
        content: response,
        contentType: 'text'
      });

      return response;
    } catch (error) {
      console.error('Error handling audio input:', error);
      throw error;
    }
  }

  async sendAudio(audioBlob: Blob): Promise<string> {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    try {
      if (!this.isSessionActive() && this.shouldProvideScoring()) {
        // Session time is up - process audio for scoring
        const feedbackPrompt = getFeedbackPrompt();
        const transcription = await this.audioService.processAudio(audioBlob, 'scoring');
        const response = await this.sendMessage(transcription);

        // Return the assistant message
        return response;
      } else {
        // Session is active - continue conversation
        const transcription = await this.audioService.processAudio(audioBlob, 'conversation');
        const response = await this.sendMessage(transcription);

        // Return the assistant message
        return response;
      }
    } catch (error) {
      console.error('Error processing audio:', error);
      throw error;
    }
  }

  getSessionTimeRemaining(): number {
    if (!this.sessionStartTime || !this.sessionDuration) return 0;
    const elapsed = Date.now() - this.sessionStartTime;
    return Math.max(0, this.sessionDuration - elapsed);
  }

  endSession(metrics?: SpeakingMetrics): void {
    if (this.currentSession) {
      this.currentSession.endTime = Date.now();
      if (metrics) {
        this.currentSession.metrics = metrics;
      }
    }
    this.sessionStartTime = null;
    this.sessionDuration = null;
  }

  getCurrentSession(): SpeakingSession | null {
    return this.currentSession;
  }

  calculateSessionMetrics(session: SpeakingSession): SpeakingMetrics {
    // Placeholder implementation for session metrics calculation
    return {
      pronunciation: 6,
      grammar: 6,
      vocabulary: 6,
      fluency: 6,
      coherence: 6,
      overallBand: 6,
      feedback: {
        strengths: ['Good pronunciation', 'Clear speech'],
        improvements: ['Work on grammar', 'Expand vocabulary'],
        tips: ['Practice more', 'Listen to native speakers']
      },
      nextSteps: ['Review common grammar patterns', 'Build vocabulary']
    };
  }

  updateSessionHistory(history: SpeakingHistory, session: SpeakingSession): SpeakingHistory {
    const newSessions = {
      ...history.sessions,
      [session.id]: session
    };

    // Calculate updated stats
    const sessions = Object.values(newSessions);
    const completedSessions = sessions.filter(s => s.endTime);

    return {
      ...history,
      sessions: newSessions,
      stats: {
        totalSessions: completedSessions.length,
        averageBand: completedSessions.length > 0 
          ? completedSessions.reduce((sum, s) => sum + (s.metrics?.overallBand || 0), 0) / completedSessions.length 
          : 0,
        timeSpent: completedSessions.reduce((total, s) => total + this.calculateSessionDuration(s), 0),
        lastSessionDate: completedSessions.length > 0 
          ? Math.max(...completedSessions.map(s => s.endTime || 0)) 
          : 0
      }
    };
  }

  calculateSessionDuration(session: SpeakingSession): number {
    if (!session.startTime || !session.endTime) return 0;
    return (session.endTime - session.startTime) / 60000; // Convert milliseconds to minutes
  }

  getHistory(userId: string): SpeakingHistory {
    const sessions = this.getSessions(userId);
    const history: SpeakingHistory = {
      userId,
      sessions,
      stats: {
        totalSessions: Object.keys(sessions).length,
        averageBand: this.calculateAverageBand(sessions),
        timeSpent: this.calculateTotalTimeSpent(sessions),
        lastSessionDate: this.getLastSessionDate(sessions)
      }
    };
    return history;
  }

  private getSessions(userId: string): { [sessionId: string]: SpeakingSession } {
    try {
      const sessions = localStorage.getItem(`speaking_sessions_${userId}`);
      return sessions ? JSON.parse(sessions) : {};
    } catch (error) {
      console.error('Error getting sessions:', error);
      return {};
    }
  }

  private calculateAverageBand(sessions: { [sessionId: string]: SpeakingSession }): number {
    const bands = Object.values(sessions)
      .map(session => session.metrics?.overallBand || 0)
      .filter(band => band > 0);
    
    return bands.length > 0 
      ? bands.reduce((sum, band) => sum + band, 0) / bands.length 
      : 0;
  }

  private calculateTotalTimeSpent(sessions: { [sessionId: string]: SpeakingSession }): number {
    return Object.values(sessions)
      .map(session => session.endTime && session.startTime 
        ? (session.endTime - session.startTime) / 60000 
        : 0)
      .reduce((sum, time) => sum + time, 0);
  }

  private getLastSessionDate(sessions: { [sessionId: string]: SpeakingSession }): number {
    const dates = Object.values(sessions)
      .map(session => session.endTime || session.startTime)
      .filter(date => date !== undefined);
    
    return dates.length > 0 
      ? Math.max(...dates) 
      : 0;
  }

  getRecentSessions(userId: string, limit: number = 5): SpeakingSession[] {
    const sessions = this.getSessions(userId);
    return Object.values(sessions)
      .sort((a, b) => (b.startTime - a.startTime))
      .slice(0, limit);
  }
}

// Export a singleton instance
export const speakingService = SpeakingService.getInstance();
