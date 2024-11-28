import { SpeakingSession, SpeakingHistory, Message, SpeakingMetrics } from '@/types/speakingSession';

class SpeakingService {
  private static instance: SpeakingService;
  private currentSession: SpeakingSession | null = null;

  private constructor() {}

  static getInstance(): SpeakingService {
    if (!SpeakingService.instance) {
      SpeakingService.instance = new SpeakingService();
    }
    return SpeakingService.instance;
  }

  // Session Management
  startSession(userId: string, duration: number, mode: 'free' | 'template' = 'free', templateId?: string): SpeakingSession {
    const sessionId = `speaking_${Date.now()}`;
    this.currentSession = {
      id: sessionId,
      userId,
      mode,
      templateId,
      startTime: Date.now(),
      duration: duration * 60 * 1000, // Convert minutes to milliseconds
      messages: [],
      audioUrls: [],
      metrics: {
        pronunciation: 0,
        grammar: 0,
        vocabulary: 0,
        fluency: 0,
        coherence: 0
      }
    };

    // Initialize session with welcome message
    const welcomeMessage = this.getWelcomeMessage(duration);
    this.addMessage({
      role: 'assistant',
      content: welcomeMessage
    });

    // Save to local storage
    this.saveSession(this.currentSession);
    return this.currentSession;
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

  private getRemainingTime(): number {
    if (!this.currentSession) return 0;
    const elapsed = Date.now() - this.currentSession.startTime;
    return Math.max(0, this.currentSession.duration - elapsed);
  }

  private isSessionExpired(): boolean {
    return this.getRemainingTime() <= 0;
  }

  async sendMessage(content: string): Promise<string> {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    if (this.isSessionExpired()) {
      // Generate and save final feedback
      const feedback = await this.generateFeedback();
      this.endSession(feedback);
      
      return `Phiên luyện tập đã kết thúc. Dưới đây là nhận xét chi tiết của tôi:

${JSON.stringify(feedback, null, 2)}`;
    }

    // Add user message
    this.addMessage({
      role: 'user',
      content
    });

    // Get AI response
    const response = await this.generateTutoringResponse(content);
    
    // Add AI message
    this.addMessage({
      role: 'assistant',
      content: response
    });

    return response;
  }

  private async generateTutoringResponse(userMessage: string): Promise<string> {
    // TODO: Integrate with actual AI service
    // For now, return a simple response
    const remainingMinutes = Math.ceil(this.getRemainingTime() / (60 * 1000));
    
    if (remainingMinutes <= 2) {
      return `Chúng ta còn ${remainingMinutes} phút. Hãy tiếp tục cuộc trò chuyện và tôi sẽ đưa ra nhận xét chi tiết vào cuối phiên.`;
    }

    return "Interesting point! Could you elaborate more on that?";
  }

  private async generateFeedback(): Promise<any> {
    if (!this.currentSession) return null;

    // Chuẩn bị dữ liệu phân tích
    const sessionData = {
      duration: this.currentSession.duration,
      actualDuration: Date.now() - this.currentSession.startTime,
      messages: this.currentSession.messages,
      audioRecordings: this.currentSession.audioUrls || []
    };

    // Phân tích thời gian phản hồi trung bình
    const userMessages = this.currentSession.messages.filter(m => m.role === 'user');
    const responseTimeGaps = [];
    for (let i = 1; i < userMessages.length; i++) {
      const gap = userMessages[i].timestamp - userMessages[i-1].timestamp;
      responseTimeGaps.push(gap);
    }
    const avgResponseTime = responseTimeGaps.length > 0 
      ? responseTimeGaps.reduce((a, b) => a + b, 0) / responseTimeGaps.length 
      : 0;

    // Phân tích độ dài câu trả lời
    const avgAnswerLength = userMessages
      .map(m => m.content.split(' ').length)
      .reduce((a, b) => a + b, 0) / userMessages.length;

    // Prompt để phân tích chất lượng
    const analysisPrompt = `
Analyze this IELTS speaking practice session:

Session Duration: ${sessionData.duration / 60000} minutes
Messages: ${JSON.stringify(sessionData.messages)}

Consider:
1. Response time patterns (avg: ${avgResponseTime / 1000} seconds)
2. Answer length (avg: ${avgAnswerLength} words)
3. Vocabulary variety
4. Grammar accuracy
5. Topic development
6. Fluency markers

Provide detailed feedback and scores following IELTS criteria.
    `;

    // TODO: Gửi prompt tới AI service
    // Tạm thởi return mock data với các metrics thực tế đã tính được
    return {
      scores: {
        pronunciation: this.calculatePronunciationScore(sessionData),
        grammar: this.calculateGrammarScore(sessionData),
        vocabulary: this.calculateVocabularyScore(sessionData),
        fluency: this.calculateFluencyScore(avgResponseTime),
        coherence: this.calculateCoherenceScore(avgAnswerLength)
      },
      overallBand: 0, // Sẽ được tính dựa trên các scores ở trên
      feedback: {
        strengths: this.identifyStrengths(sessionData),
        improvements: this.identifyImprovements(sessionData),
        tips: [
          "Practice speaking more frequently",
          "Record yourself and analyze your speech",
          "Focus on reducing response time"
        ]
      },
      sessionStats: {
        avgResponseTime: avgResponseTime / 1000, // Convert to seconds
        avgAnswerLength,
        totalMessages: userMessages.length,
        totalDuration: sessionData.actualDuration / 60000 // Convert to minutes
      },
      detailedFeedback: {
        english: this.generateDetailedFeedback(sessionData, "en"),
        vietnamese: this.generateDetailedFeedback(sessionData, "vi")
      }
    };
  }

  private calculatePronunciationScore(sessionData: any): number {
    // TODO: Implement actual pronunciation analysis
    // For now, return a score based on audio recordings presence
    return sessionData.audioRecordings.length > 0 ? 7 : 6;
  }

  private calculateGrammarScore(sessionData: any): number {
    const userMessages = sessionData.messages.filter(m => m.role === 'user');
    // Basic grammar scoring based on message length and variety
    const avgLength = userMessages
      .map(m => m.content.split(' ').length)
      .reduce((a, b) => a + b, 0) / userMessages.length;
    return Math.min(9, Math.max(5, Math.floor(avgLength / 10) + 5));
  }

  private calculateVocabularyScore(sessionData: any): number {
    const userMessages = sessionData.messages.filter(m => m.role === 'user');
    // Count unique words as a basic vocabulary metric
    const uniqueWords = new Set(
      userMessages
        .map(m => m.content.toLowerCase().split(/\W+/))
        .flat()
    ).size;
    return Math.min(9, Math.max(5, Math.floor(uniqueWords / 20) + 5));
  }

  private calculateFluencyScore(avgResponseTime: number): number {
    // Lower response time = higher fluency score
    const baseScore = 7;
    const timeAdjustment = Math.floor(avgResponseTime / 5000); // -1 point per 5 seconds
    return Math.min(9, Math.max(5, baseScore - timeAdjustment));
  }

  private calculateCoherenceScore(avgAnswerLength: number): number {
    // Longer answers suggest better coherence and development
    return Math.min(9, Math.max(5, Math.floor(avgAnswerLength / 15) + 5));
  }

  private identifyStrengths(sessionData: any): string[] {
    const strengths = [];
    const userMessages = sessionData.messages.filter(m => m.role === 'user');
    
    if (userMessages.length > 0) {
      const avgLength = userMessages
        .map(m => m.content.split(' ').length)
        .reduce((a, b) => a + b, 0) / userMessages.length;

      if (avgLength > 20) {
        strengths.push("Good at developing answers with sufficient detail");
      }
      if (sessionData.audioRecordings.length > 0) {
        strengths.push("Willing to practice with voice recordings");
      }
      if (userMessages.length > 5) {
        strengths.push("Active participation in conversation");
      }
    }

    return strengths;
  }

  private identifyImprovements(sessionData: any): string[] {
    const improvements = [];
    const userMessages = sessionData.messages.filter(m => m.role === 'user');
    
    if (userMessages.length > 0) {
      const avgLength = userMessages
        .map(m => m.content.split(' ').length)
        .reduce((a, b) => a + b, 0) / userMessages.length;

      if (avgLength < 15) {
        improvements.push("Try to develop answers with more detail");
      }
      if (sessionData.audioRecordings.length === 0) {
        improvements.push("Practice more with voice recordings");
      }
      if (userMessages.length < 5) {
        improvements.push("Try to engage more in the conversation");
      }
    }

    return improvements;
  }

  private generateDetailedFeedback(sessionData: any, language: "en" | "vi"): string {
    const userMessages = sessionData.messages.filter(m => m.role === 'user');
    const avgLength = userMessages
      .map(m => m.content.split(' ').length)
      .reduce((a, b) => a + b, 0) / userMessages.length;
    
    if (language === "en") {
      return `During this ${sessionData.duration / 60000}-minute session, you provided ${userMessages.length} responses with an average length of ${Math.round(avgLength)} words. ${this.getEngagementFeedback(userMessages.length, avgLength)}`;
    } else {
      return `Trong phiên ${sessionData.duration / 60000} phút này, bạn đã đưa ra ${userMessages.length} câu trả lời với độ dài trung bình ${Math.round(avgLength)} từ. ${this.getEngagementFeedbackVietnamese(userMessages.length, avgLength)}`;
    }
  }

  private getEngagementFeedback(messageCount: number, avgLength: number): string {
    if (messageCount > 10 && avgLength > 20) {
      return "Your engagement level was excellent, with detailed responses.";
    } else if (messageCount > 5) {
      return "You maintained good conversation flow but could develop answers more.";
    } else {
      return "Try to engage more actively in future sessions.";
    }
  }

  private getEngagementFeedbackVietnamese(messageCount: number, avgLength: number): string {
    if (messageCount > 10 && avgLength > 20) {
      return "Mức độ tương tác của bạn rất tốt, với các câu trả lời chi tiết.";
    } else if (messageCount > 5) {
      return "Bạn duy trì được luồng hội thoại tốt nhưng có thể phát triển câu trả lời nhiều hơn.";
    } else {
      return "Hãy cố gắng tương tác tích cực hơn trong các phiên sau.";
    }
  }

  endSession(metrics?: SpeakingMetrics) {
    if (this.currentSession) {
      this.currentSession.endTime = Date.now();
      if (metrics) {
        this.currentSession.metrics = metrics;
      }
      this.saveSession(this.currentSession);
      this.updateHistory(this.currentSession);
      this.currentSession = null;
    }
  }

  // Message Management
  addMessage(message: Omit<Message, 'timestamp'>) {
    if (this.currentSession) {
      const newMessage = {
        ...message,
        timestamp: Date.now(),
      };
      this.currentSession.messages.push(newMessage);
      this.saveSession(this.currentSession);
      return newMessage;
    }
    return null;
  }

  // Audio Management
  addAudioUrl(url: string) {
    if (this.currentSession) {
      this.currentSession.audioUrls.push(url);
      this.saveSession(this.currentSession);
    }
  }

  // Storage Management
  private saveSession(session: SpeakingSession) {
    try {
      const sessions = this.getSessions(session.userId);
      sessions[session.id] = session;
      localStorage.setItem(`speaking_sessions_${session.userId}`, JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving session:', error);
    }
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

  private updateHistory(session: SpeakingSession) {
    try {
      const history = this.getHistory(session.userId);
      history.sessions[session.id] = session;
      history.totalSessions += 1;
      
      // Update stats
      const sessions = Object.values(history.sessions);
      const totalBand = sessions.reduce((sum, s) => sum + (s.metrics?.overallBand || 0), 0);
      history.averageBand = totalBand / sessions.length;
      
      const totalTime = sessions.reduce((sum, s) => {
        return sum + ((s.endTime || 0) - s.startTime);
      }, 0);
      history.timeSpent = Math.round(totalTime / (1000 * 60)); // Convert to minutes
      
      history.lastSessionDate = session.endTime || Date.now();

      localStorage.setItem(`speaking_history_${session.userId}`, JSON.stringify(history));
    } catch (error) {
      console.error('Error updating history:', error);
    }
  }

  getHistory(userId: string): SpeakingHistory {
    try {
      const history = localStorage.getItem(`speaking_history_${userId}`);
      if (history) {
        return JSON.parse(history);
      }
      return {
        userId,
        sessions: {},
        stats: {
          totalSessions: 0,
          averageBand: 0,
          timeSpent: 0,
          lastSessionDate: 0,
        },
      };
    } catch (error) {
      console.error('Error getting history:', error);
      return {
        userId,
        sessions: {},
        stats: {
          totalSessions: 0,
          averageBand: 0,
          timeSpent: 0,
          lastSessionDate: 0,
        },
      };
    }
  }

  getCurrentSession(): SpeakingSession | null {
    return this.currentSession;
  }

  // Get recent sessions for a user
  getRecentSessions(userId: string, limit: number = 5): SpeakingSession[] {
    const sessions = this.getSessions(userId);
    return Object.values(sessions)
      .sort((a, b) => (b.startTime - a.startTime))
      .slice(0, limit);
  }

  // Get session by ID
  getSession(userId: string, sessionId: string): SpeakingSession | null {
    const sessions = this.getSessions(userId);
    return sessions[sessionId] || null;
  }
}

export const speakingService = SpeakingService.getInstance();
