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
  startSession(userId: string, templateId: string): SpeakingSession {
    const sessionId = `speaking_${Date.now()}`;
    this.currentSession = {
      id: sessionId,
      userId,
      templateId,
      startTime: Date.now(),
      messages: [],
      audioUrls: [],
    };

    // Save to local storage
    this.saveSession(this.currentSession);
    return this.currentSession;
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
