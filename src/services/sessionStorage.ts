import { Message, SessionState } from '@/types/speakingSession';
import { LearningMetrics } from '@/types/learningMetrics';
import { promises as fs } from 'fs';
import path from 'path';

export interface SessionData {
  id: string;
  userId: string;
  templateId: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  state: SessionState;
  messages: Message[];
  metrics: LearningMetrics;
  notes: string;
  transcript: string;
}

class SessionStorageService {
  private readonly dataDir = path.join(process.cwd(), 'data', 'sessions');

  constructor() {
    this.ensureDataDirectory();
  }

  private async ensureDataDirectory() {
    try {
      await fs.mkdir(this.dataDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create data directory:', error);
    }
  }

  async createSession(sessionData: Omit<SessionData, 'endTime'>): Promise<string> {
    const fileName = `session_${sessionData.id}.json`;
    const filePath = path.join(this.dataDir, fileName);

    try {
      await fs.writeFile(filePath, JSON.stringify(sessionData, null, 2));
      return sessionData.id;
    } catch (error) {
      console.error('Failed to create session:', error);
      throw new Error('Failed to create session');
    }
  }

  async updateSession(sessionId: string, updates: Partial<SessionData>): Promise<void> {
    const fileName = `session_${sessionId}.json`;
    const filePath = path.join(this.dataDir, fileName);

    try {
      const existingData = await this.getSession(sessionId);
      const updatedData = { ...existingData, ...updates };
      await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));
    } catch (error) {
      console.error('Failed to update session:', error);
      throw new Error('Failed to update session');
    }
  }

  async getSession(sessionId: string): Promise<SessionData> {
    const fileName = `session_${sessionId}.json`;
    const filePath = path.join(this.dataDir, fileName);

    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to get session:', error);
      throw new Error('Failed to get session');
    }
  }

  async getUserSessions(userId: string): Promise<SessionData[]> {
    try {
      const files = await fs.readdir(this.dataDir);
      const sessions: SessionData[] = [];

      for (const file of files) {
        if (!file.endsWith('.json')) continue;

        const filePath = path.join(this.dataDir, file);
        const data = await fs.readFile(filePath, 'utf-8');
        const session = JSON.parse(data) as SessionData;

        if (session.userId === userId) {
          sessions.push(session);
        }
      }

      return sessions.sort((a, b) => 
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
      );
    } catch (error) {
      console.error('Failed to get user sessions:', error);
      throw new Error('Failed to get user sessions');
    }
  }

  async updateSessionNotes(sessionId: string, notes: string): Promise<void> {
    await this.updateSession(sessionId, { notes });
  }

  async updateSessionTranscript(sessionId: string, transcript: string): Promise<void> {
    await this.updateSession(sessionId, { transcript });
  }

  async updateSessionMetrics(sessionId: string, metrics: LearningMetrics): Promise<void> {
    await this.updateSession(sessionId, { metrics });
  }

  async addSessionMessage(sessionId: string, message: Message): Promise<void> {
    const session = await this.getSession(sessionId);
    session.messages.push(message);
    await this.updateSession(sessionId, { messages: session.messages });
  }

  async endSession(sessionId: string): Promise<void> {
    await this.updateSession(sessionId, {
      endTime: new Date(),
      state: 'completed'
    });
  }

  async generateSessionReport(sessionId: string): Promise<string> {
    const session = await this.getSession(sessionId);
    
    const report = {
      sessionId: session.id,
      templateId: session.templateId,
      duration: session.duration,
      startTime: session.startTime,
      endTime: session.endTime,
      metrics: session.metrics,
      transcript: session.transcript,
      notes: session.notes
    };

    const reportFileName = `report_${sessionId}.json`;
    const reportPath = path.join(this.dataDir, reportFileName);
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

    return reportPath;
  }
}

export const sessionStorage = new SessionStorageService();
