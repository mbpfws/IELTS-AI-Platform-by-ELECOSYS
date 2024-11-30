import { PrismaClient } from '@prisma/client';
import { supabaseService } from './supabaseService';

// Initialize Prisma Client
const prisma = new PrismaClient();

export class DatabaseService {
  private static instance: DatabaseService;
  private isProduction: boolean;

  private constructor() {
    this.isProduction = process.env.NEXT_PUBLIC_ENV === 'production';
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // Template Management
  async createTemplate(data: {
    title: string;
    description: string;
    duration: number;
    parts: { part: number; prompt: string; }[];
  }) {
    if (this.isProduction) {
      // In production, use Supabase
      // Convert the data structure to match Supabase
      return await supabaseService.createTemplate(data);
    } else {
      // In development, use local Prisma
      return await prisma.speaking_Template.create({
        data: {
          title: data.title,
          description: data.description,
          duration: data.duration,
          parts: {
            create: data.parts
          }
        },
        include: {
          parts: true
        }
      });
    }
  }

  async getTemplates() {
    if (this.isProduction) {
      return await supabaseService.getTemplates();
    } else {
      return await prisma.speaking_Template.findMany({
        include: {
          parts: true
        }
      });
    }
  }

  // Session Management
  async createSession(data: {
    userId: string;
    templateId: string;
    duration: number;
  }) {
    if (this.isProduction) {
      return await supabaseService.createSession(data);
    } else {
      return await prisma.speaking_Session.create({
        data: {
          userId: data.userId,
          templateId: data.templateId,
          duration: data.duration,
        }
      });
    }
  }

  async addMessageToSession(data: {
    sessionId: string;
    content: string;
    role: 'user' | 'assistant';
    responseTime?: number;
    wordCount?: number;
  }) {
    if (this.isProduction) {
      return await supabaseService.createMessage({
        session_id: data.sessionId,
        role: data.role,
        content: data.content
      });
    } else {
      return await prisma.speaking_Message.create({
        data: {
          sessionId: data.sessionId,
          content: data.content,
          role: data.role,
          responseTime: data.responseTime,
          wordCount: data.wordCount
        }
      });
    }
  }

  async updateSessionMetrics(sessionId: string, metrics: {
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    fluency: number;
    coherence: number;
    averageResponseTime: number;
    totalWords: number;
  }) {
    if (this.isProduction) {
      return await supabaseService.updateSessionMetrics(sessionId, metrics);
    } else {
      return await prisma.speaking_Metrics.create({
        data: {
          sessionId,
          ...metrics
        }
      });
    }
  }

  async getSessionWithDetails(sessionId: string) {
    if (this.isProduction) {
      return await supabaseService.getSessionMessages(sessionId);
    } else {
      return await prisma.speaking_Session.findUnique({
        where: { id: sessionId },
        include: {
          messages: true,
          metrics: true,
          feedback: true,
          recordings: true,
          template: {
            include: {
              parts: true
            }
          }
        }
      });
    }
  }
}

export const databaseService = DatabaseService.getInstance();
