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
      const response = await fetch('/api/templates');
      if (!response.ok) {
        throw new Error('Failed to fetch templates');
      }
      return await response.json();
    }
  }

  // Session Management
  async createSession(data: {
    userId?: string;
    templateId: string;
    duration: number;
  }) {
    if (this.isProduction) {
      return await supabaseService.createSession(data);
    } else {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to create session');
      }
      return await response.json();
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
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to add message');
      }
      return await response.json();
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
      const response = await fetch(`/api/sessions/${sessionId}/metrics`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metrics),
      });
      if (!response.ok) {
        throw new Error('Failed to update metrics');
      }
      return await response.json();
    }
  }

  async getSessionWithDetails(sessionId: string) {
    if (this.isProduction) {
      return await supabaseService.getSessionMessages(sessionId);
    } else {
      const response = await fetch(`/api/sessions/${sessionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch session details');
      }
      return await response.json();
    }
  }
}

export const databaseService = DatabaseService.getInstance();
