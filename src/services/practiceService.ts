import { prisma } from '@/lib/prisma';
import { Template } from '@/types/template';
import { v4 as uuidv4 } from 'uuid';
import { 
  Prisma,
  SpeakingSession as Speaking_Session,
  SpeakingMessage as Speaking_Message,
  AudioRecording as Audio_Recording,
  SpeakingMetrics as Speaking_Metrics,
  SpeakingFeedback as Speaking_Feedback 
} from '@prisma/client';

export interface PracticeSession {
  id: string;
  type: 'tutor' | 'template' | 'mock-test';
  startTime: number;
  endTime?: number;
  duration: number;
  topics: string[];
  feedback: SessionFeedback[];
  messages: Message[];
  audioUrls: string[];
}

export interface SessionFeedback {
  timestamp: number;
  metrics: {
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    fluency: number;
    coherence: number;
  };
  notes: string[];
}

export interface UserProgress {
  totalSessions: number;
  averageScores: {
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    fluency: number;
    coherence: number;
  };
  recentTopics: string[];
  weakAreas: string[];
  strongAreas: string[];
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  contentType?: 'text' | 'audio' | 'feedback';
  audioUrl?: string;
}

type SessionWithIncludes = Speaking_Session & {
  messages: Speaking_Message[];
  recordings: Audio_Recording[];
  metrics: Speaking_Metrics | null;
  feedback: Speaking_Feedback | null;
};

export class PracticeService {
  private static instance: PracticeService;
  private currentSession: SessionWithIncludes | null = null;
  private sessionHistory: Map<string, Message[]> = new Map();
  private sessionStartTime: number | null = null;
  private sessionDuration: number | null = null;
  private userId: string | null = null;

  private constructor() {}

  static getInstance(): PracticeService {
    if (!PracticeService.instance) {
      PracticeService.instance = new PracticeService();
    }
    return PracticeService.instance;
  }

  async createSession(userId: string, template: Template): Promise<SessionWithIncludes> {
    return await prisma.$transaction(async (tx) => {
      const session = await tx.speakingSession.create({
        data: {
          userId,
          duration: template.duration,
          startTime: new Date(),
        },
        include: {
          messages: true,
          recordings: true,
          metrics: true,
          feedback: true,
        },
      });
      return session;
    });
  }

  async startSession(config: {
    userId: string;
    duration: number;
    templateId: string;
    startTime: number;
  }): Promise<SessionWithIncludes> {
    try {
      const { userId, duration, templateId, startTime } = config;
      
      // End any existing session
      if (this.currentSession) {
        await this.endSession(this.currentSession.id);
      }

      // Create new session
      const session = await prisma.speakingSession.create({
        data: {
          id: uuidv4(),
          userId,
          templateId,
          startTime: new Date(startTime),
          duration,
          status: 'active'
        },
        include: {
          messages: true,
          recordings: true,
          metrics: true,
          feedback: true
        }
      });

      this.currentSession = session;
      this.sessionStartTime = startTime;
      this.sessionDuration = duration * 60 * 1000; // Convert minutes to milliseconds
      this.userId = userId;

      return session;
    } catch (error) {
      console.error('Error starting session:', error);
      throw error;
    }
  }

  async endSession(sessionId: string): Promise<void> {
    try {
      await prisma.speakingSession.update({
        where: { id: sessionId },
        data: {
          status: 'completed',
          endTime: new Date()
        }
      });

      if (this.currentSession?.id === sessionId) {
        this.currentSession = null;
        this.sessionStartTime = null;
        this.sessionDuration = null;
      }
    } catch (error) {
      console.error('Error ending session:', error);
      throw error;
    }
  }

  getTimeRemaining(): number {
    if (!this.sessionStartTime || !this.sessionDuration) {
      return 0;
    }

    const elapsed = Date.now() - this.sessionStartTime;
    const remaining = Math.max(0, this.sessionDuration - elapsed);
    return Math.floor(remaining / 1000); // Convert to seconds
  }

  async addMessage(sessionId: string, content: string, role: 'user' | 'assistant' | 'system'): Promise<void> {
    try {
      const message = await prisma.speakingMessage.create({
        data: {
          id: uuidv4(),
          sessionId,
          content,
          role,
          timestamp: new Date()
        }
      });

      const history = this.sessionHistory.get(sessionId) || [];
      this.sessionHistory.set(sessionId, [...history, { role, content, timestamp: Date.now() }]);
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  }

  async addRecording(sessionId: string, url: string, duration: number): Promise<void> {
    try {
      await prisma.audioRecording.create({
        data: {
          id: uuidv4(),
          sessionId,
          url,
          duration
        }
      });
    } catch (error) {
      console.error('Error adding recording:', error);
      throw error;
    }
  }

  async updateMetrics(sessionId: string, metrics: Partial<Speaking_Metrics>): Promise<void> {
    const { pronunciation, grammar, vocabulary, fluency, coherence } = metrics;
    await prisma.speakingMetrics.upsert({
      where: { sessionId },
      create: {
        sessionId,
        pronunciation: pronunciation || 0,
        grammar: grammar || 0,
        vocabulary: vocabulary || 0,
        fluency: fluency || 0,
        coherence: coherence || 0,
        averageResponseTime: 0,
        totalWords: 0,
      },
      update: {
        pronunciation,
        grammar,
        vocabulary,
        fluency,
        coherence,
      },
    });
  }

  async addFeedback(sessionId: string, content: string, score: number): Promise<void> {
    await prisma.speakingFeedback.create({
      data: {
        sessionId,
        content,
        score,
      },
    });
  }

  async getSession(sessionId: string): Promise<SessionWithIncludes | null> {
    return prisma.speakingSession.findUnique({
      where: { id: sessionId },
      include: {
        messages: true,
        recordings: true,
        metrics: true,
        feedback: true,
      },
    });
  }

  async deleteSession(sessionId: string): Promise<void> {
    await prisma.speakingSession.delete({
      where: { id: sessionId },
    });
  }

  getCurrentSession(): SessionWithIncludes | null {
    return this.currentSession;
  }

  getSessionHistory(sessionId: string): Message[] | undefined {
    return this.sessionHistory.get(sessionId);
  }
}

export const practiceService = PracticeService.getInstance();
