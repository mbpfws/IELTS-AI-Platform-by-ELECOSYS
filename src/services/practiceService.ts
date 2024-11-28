import { part1Questions, part2Questions, part3Questions } from '../data/speakingQuestions';
import { tutorSystemPrompt } from '../data/tutorSystemPrompt';
import { audioService } from './audioService';
import { speakingService } from './speakingService';
import { Template } from '../types/template';
import { SpeakingMetrics } from '../types/speakingSession';
import { v4 as uuidv4 } from 'uuid';

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

interface SpeakingSession {
  id: string;
  userId: string;
  duration: number; // in minutes
  startTime: number;
  endTime?: number;
  messages: Message[];
  feedback?: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  contentType?: 'text' | 'audio' | 'feedback';
  audioUrl?: string;
}

class PracticeService {
  private static instance: PracticeService;
  private currentSession: SpeakingSession | null = null;
  private sessionHistory: PracticeSession[] = [];
  private sessionStartTime: number | null = null;
  private sessionDuration: number | null = null;

  private constructor() {}

  public static getInstance(): PracticeService {
    if (!PracticeService.instance) {
      PracticeService.instance = new PracticeService();
    }
    return PracticeService.instance;
  }

  // Start a new practice session
  async startSession(
    type: 'tutor' | 'template' | 'mock-test', 
    duration: number,
    template?: Template
  ): Promise<PracticeSession> {
    // Initialize timing
    this.sessionStartTime = Date.now();
    this.sessionDuration = duration * 60 * 1000; // Convert to milliseconds

    // Create practice session
    this.currentSession = {
      id: uuidv4(),
      userId: 'user', // default user id
      duration,
      startTime: Date.now(),
      messages: []
    };

    // Initialize speaking service with template context
    const mode = type === 'template' ? 'template' : 'practice';
    speakingService.startSession(
      this.currentSession.id,
      duration,
      mode,
      template?.id
    );

    let initialPrompt = '';
    if (template) {
      let questions: string[] = [];
      
      // Get relevant questions based on the template part
      if (template.part === 'PART1') {
        const topic = template.topic 
          ? template.topic.toLowerCase().replace(/[^a-z0-9]/g, '_') 
          : 'default';
        const questionKey = `speaking_part1_${topic}`;
        questions = part1Questions[questionKey] || [];

        // If no specific questions found, use default questions for the topic
        if (questions.length === 0) {
          questions = [
            `Tell me about your interests.`,
            `What do you enjoy doing in your free time?`,
            `Can you describe your hometown or where you currently live?`,
            `What are some of your future goals?`,
            `How do you like to relax?`
          ];
        }
      }

      initialPrompt = `
Here is the speaking task for ${template.part}:
Topic: ${template.topic || 'default'}

Here are the questions I will ask you about this topic:
${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

I will now start asking these questions one by one. Please respond naturally as you would in an IELTS Speaking test.

Let's begin with the first question: ${questions[0]}`;
    } else {
      // For non-template sessions, provide a welcome message
      initialPrompt = `Welcome to your ${duration}-minute IELTS Speaking practice session! 

I am your speaking practice partner. I'll help you practice your English speaking skills through natural conversation and provide feedback when needed.

Let's start with a common IELTS Speaking Part 1 topic: Your hobbies and interests.

Could you tell me about your favorite hobby or interest?`;
    }

    // Send initial message through speaking service
    await this.sendMessage(initialPrompt);

    const practiceSession: PracticeSession = {
      id: this.currentSession.id,
      type,
      startTime: Date.now(),
      duration,
      topics: template ? [template.topic || 'default'] : [],
      feedback: [],
      messages: this.currentSession.messages,
      audioUrls: []
    };

    // Add to session history
    this.sessionHistory.push(practiceSession);

    return practiceSession;
  }

  async sendMessage(content: string, audioBlob?: Blob): Promise<void> {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    try {
      // Initialize messages array if it doesn't exist
      if (!Array.isArray(this.currentSession.messages)) {
        this.currentSession.messages = [];
      }

      let response: string;
      
      if (audioBlob) {
        // Handle audio input through speaking service
        response = await speakingService.handleAudioInput(audioBlob);
      } else {
        // Handle text input through speaking service
        response = await speakingService.sendMessage(content);
      }

      // Check if the response is feedback
      const isFeedback = response.includes('Pronunciation:') || 
                        response.includes('Grammar:') || 
                        response.includes('Vocabulary:') ||
                        response.includes('Fluency:');

      // Add messages to practice session history
      this.currentSession.messages.push(
        {
          role: 'user',
          content: audioBlob ? '[Audio Message]' : content,
          timestamp: Date.now(),
          contentType: audioBlob ? 'audio' : 'text',
          audioUrl: audioBlob ? await audioService.uploadAudio(audioBlob) : undefined
        },
        {
          role: 'assistant',
          content: response,
          timestamp: Date.now(),
          contentType: isFeedback ? 'feedback' : 'text'
        }
      );

    } catch (error) {
      console.error('Error in practice service sendMessage:', error);
      throw error;
    }
  }

  async sendAudio(audioBlob: Blob): Promise<string> {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    try {
      // Process audio through speaking service
      const response = await speakingService.handleAudioInput(audioBlob);
      
      // Add messages to session history if not already added by speaking service
      if (!Array.isArray(this.currentSession.messages)) {
        this.currentSession.messages = [];
      }

      // Check if the response is feedback
      const isFeedback = response.includes('Pronunciation:') || 
                        response.includes('Grammar:') || 
                        response.includes('Vocabulary:') ||
                        response.includes('Fluency:');

      this.currentSession.messages.push(
        { 
          role: 'user', 
          content: '[Audio Message]', 
          timestamp: Date.now(),
          contentType: 'audio',
          audioUrl: await audioService.uploadAudio(audioBlob)
        },
        { 
          role: 'assistant', 
          content: response, 
          timestamp: Date.now(),
          contentType: isFeedback ? 'feedback' : 'text'
        }
      );

      return response;
    } catch (error) {
      console.error('Error processing audio:', error);
      throw error;
    }
  }

  getTimeRemaining(): number {
    if (!this.currentSession) return 0;
    
    const elapsedTime = Date.now() - this.currentSession.startTime;
    const totalDuration = this.currentSession.duration * 60 * 1000; // Convert minutes to ms
    return Math.max(0, totalDuration - elapsedTime);
  }

  async endSession(session: SpeakingSession): Promise<{ metrics: SpeakingMetrics } | null> {
    try {
      // Validate session
      if (!session || !session.id) {
        console.error('Invalid session');
        return Promise.resolve(null);
      }

      // Calculate session metrics
      const metrics = this.calculateSessionMetrics(session);

      // Save session to storage or backend
      this.saveSession(session);

      return Promise.resolve({ metrics });
    } catch (error) {
      console.error('Error ending session:', error);
      return Promise.resolve(null);
    }
  }

  getCurrentSession(): SpeakingSession | null {
    return this.currentSession;
  }

  getSessionHistory(): PracticeSession[] {
    return this.sessionHistory;
  }

  getUserProgress(): UserProgress {
    // Calculate progress from session history
    const progress: UserProgress = {
      totalSessions: this.sessionHistory.length,
      averageScores: {
        pronunciation: 0,
        grammar: 0,
        vocabulary: 0,
        fluency: 0,
        coherence: 0
      },
      recentTopics: [],
      weakAreas: [],
      strongAreas: []
    };

    if (this.sessionHistory.length > 0) {
      // Calculate average scores
      const scores = this.sessionHistory.reduce((acc, session) => {
        session.feedback.forEach(fb => {
          acc.pronunciation += fb.metrics.pronunciation;
          acc.grammar += fb.metrics.grammar;
          acc.vocabulary += fb.metrics.vocabulary;
          acc.fluency += fb.metrics.fluency;
          acc.coherence += fb.metrics.coherence;
        });
        return acc;
      }, { ...progress.averageScores });

      const totalFeedback = this.sessionHistory.reduce((sum, session) => 
        sum + session.feedback.length, 0);

      if (totalFeedback > 0) {
        Object.keys(scores).forEach((key) => {
          progress.averageScores[key as keyof typeof scores] = scores[key as keyof typeof scores] / totalFeedback;
        });
      }

      // Get recent topics
      progress.recentTopics = this.sessionHistory
        .slice(-5)
        .flatMap(session => session.topics);

      // Determine weak and strong areas
      const threshold = 7;
      Object.entries(progress.averageScores).forEach(([area, score]) => {
        if (score >= threshold) {
          progress.strongAreas.push(area);
        } else {
          progress.weakAreas.push(area);
        }
      });
    }

    return progress;
  }

  private calculateSessionMetrics(session: SpeakingSession): SpeakingMetrics {
    // Simulate metrics calculation based on session content
    const messageCount = session.messages.length;
    const userMessageCount = session.messages.filter(m => m.role === 'user').length;
    const avgMessageLength = session.messages.reduce((sum, msg) => sum + msg.content.length, 0) / messageCount;

    // Generate random scores between 2.5 and 4.5
    const metrics: SpeakingMetrics = {
      pronunciation: Math.min(4.5, Math.max(2.5, Math.random() * 4.5)),
      grammar: Math.min(4.5, Math.max(2.5, Math.random() * 4.5)),
      vocabulary: Math.min(4.5, Math.max(2.5, Math.random() * 4.5)),
      fluency: Math.min(4.5, Math.max(2.5, Math.random() * 4.5)),
      coherence: Math.min(4.5, Math.max(2.5, Math.random() * 4.5)),
      overallBand: Math.min(7.0, Math.max(4.0, Math.random() * 7.0)),
      feedback: {
        strengths: this.generateStrengths(messageCount, userMessageCount, avgMessageLength),
        improvements: this.generateImprovements(messageCount, userMessageCount, avgMessageLength),
        tips: this.generateTips()
      },
      nextSteps: this.generateNextSteps()
    };

    return metrics;
  }

  private generateStrengths(messageCount: number, userMessageCount: number, avgLength: number): string[] {
    const strengths: string[] = [];
    
    if (messageCount > 5) strengths.push('Good conversation engagement');
    if (userMessageCount > 3) strengths.push('Active participation');
    if (avgLength > 50) strengths.push('Detailed responses');
    
    return strengths.length ? strengths : ['Showing potential in communication'];
  }

  private generateImprovements(messageCount: number, userMessageCount: number, avgLength: number): string[] {
    const improvements: string[] = [];
    
    if (messageCount <= 3) improvements.push('Increase conversation depth');
    if (userMessageCount <= 2) improvements.push('Participate more actively');
    if (avgLength < 30) improvements.push('Provide more detailed responses');
    
    return improvements.length ? improvements : ['Continue practicing to improve skills'];
  }

  private generateTips(): string[] {
    const allTips = [
      'Practice speaking with varied vocabulary',
      'Focus on clear pronunciation',
      'Try to use more complex sentence structures',
      'Listen carefully and respond thoughtfully',
      'Don\'t be afraid to ask for clarification',
      'Practice speaking about a wide range of topics'
    ];

    // Randomly select 3 tips
    return allTips.sort(() => 0.5 - Math.random()).slice(0, 3);
  }

  private generateNextSteps(): string[] {
    const nextSteps = [
      'Review today\'s conversation',
      'Practice vocabulary from the session',
      'Try a more challenging speaking template',
      'Focus on areas of improvement',
      'Listen to native speaker recordings'
    ];

    // Randomly select 2-3 next steps
    return nextSteps.sort(() => 0.5 - Math.random()).slice(0, 3);
  }

  private saveSession(session: SpeakingSession): void {
    // TO DO: implement saving session to storage or backend
  }
}

export const practiceService = PracticeService.getInstance();
