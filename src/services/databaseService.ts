import { PrismaClient } from '@prisma/client';
import { supabaseService } from './supabaseService';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

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

  async syncTemplates() {
    try {
      if (this.isProduction) {
        return await supabaseService.syncTemplates();
      }

      const part1Templates = (await import('@/data/speakingTemplates/part1')).part1Templates;
      const part2Templates = (await import('@/data/speakingTemplates/part2')).part2Templates;
      const part3Templates = (await import('@/data/speakingTemplates/part3')).part3Templates;

      const allTemplates = [
        ...part1Templates.map(t => ({ ...t, type: 'part1' })),
        ...part2Templates.map(t => ({ ...t, type: 'part2' })),
        ...part3Templates.map(t => ({ ...t, type: 'part3' }))
      ];

      for (const template of allTemplates) {
        await prisma.speaking_Template.upsert({
          where: {
            id: template.id
          },
          update: {
            title: template.title,
            title_en: template.title,
            title_vi: template.title,
            description: template.systemPrompt,
            description_en: template.systemPrompt,
            description_vi: template.systemPrompt,
            level: template.level.toLowerCase(),
            duration: 15,
            target_band: template.difficulty === 'easy' ? 5.0 : 
                        template.difficulty === 'medium' ? 6.0 : 7.0,
            topics_json: JSON.stringify(template.questions || []),
            type: template.type
          },
          create: {
            id: template.id,
            title: template.title,
            title_en: template.title,
            title_vi: template.title,
            description: template.systemPrompt,
            description_en: template.systemPrompt,
            description_vi: template.systemPrompt,
            level: template.level.toLowerCase(),
            duration: 15,
            target_band: template.difficulty === 'easy' ? 5.0 : 
                        template.difficulty === 'medium' ? 6.0 : 7.0,
            topics_json: JSON.stringify(template.questions || []),
            type: template.type
          }
        });
      }

      return await this.getTemplates();
    } catch (error) {
      console.error('Error syncing templates:', error);
      throw error;
    }
  }

  async getTemplates() {
    if (this.isProduction) {
      return await supabaseService.getTemplates();
    } else {
      try {
        // First sync templates
        await this.syncTemplates();
        
        // Then get from database
        const templates = await prisma.speaking_Template.findMany({
          orderBy: {
            createdAt: 'asc'
          }
        });

        return templates.map(template => ({
          ...template,
          topics: JSON.parse(template.topics_json || '[]'),
          created_at: template.createdAt.toISOString(),
          updated_at: template.updatedAt.toISOString()
        }));
      } catch (error) {
        console.error('Error getting templates:', error);
        throw error;
      }
    }
  }

  async saveTutoringTemplate(template: any) {
    try {
      if (this.isProduction) {
        return await supabaseService.saveTutoringTemplate(template);
      } else {
        const result = await prisma.tutoring_Template.create({
          data: template
        });
        return result;
      }
    } catch (error) {
      console.error('Error saving tutoring template:', error);
      throw error;
    }
  }

  async getTutoringTemplates() {
    try {
      if (this.isProduction) {
        return await supabaseService.getTutoringTemplates();
      } else {
        const templates = await prisma.tutoring_Template.findMany();
        return templates;
      }
    } catch (error) {
      console.error('Error fetching tutoring templates:', error);
      throw error;
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
      try {
        const response = await fetch('/api/sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const responseData = await response.json().catch(() => null);

        if (!response.ok) {
          const errorMessage = responseData?.error || `Failed to create session (${response.status})`;
          throw new Error(errorMessage);
        }

        if (!responseData) {
          throw new Error('Empty response received from server');
        }

        if (!responseData.id || !responseData.template?.parts?.length) {
          console.error('Invalid session data:', responseData);
          throw new Error('Invalid session data received from server');
        }
        
        return responseData;
      } catch (error) {
        console.error('Error creating session:', error);
        throw error instanceof Error ? error : new Error('Failed to create session');
      }
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

  async updateSession(sessionId: string, data: {
    metrics?: {
      fluency: number;
      lexical: number;
      grammar: number;
      pronunciation: number;
    };
    notes?: string[];
    status?: 'active' | 'completed';
  }) {
    if (this.isProduction) {
      return await supabaseService.updateSession(sessionId, data);
    } else {
      const response = await fetch(`/api/sessions/${sessionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update session');
      }
      return await response.json();
    }
  }
}

export const databaseService = DatabaseService.getInstance();
