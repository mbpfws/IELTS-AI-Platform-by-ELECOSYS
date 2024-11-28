import { part1Questions, part2Questions, part3Questions, advancedTopics } from '../data/speakingQuestions';
import { tutorDialogues, TutorSession, SessionFeedback, FeedbackMetrics } from '../data/speakingTutorSession';
import { speakingService } from './speakingService';

export class TutorService {
  private static instance: TutorService;
  private currentSession: TutorSession | null = null;
  private feedbackHistory: SessionFeedback[] = [];

  private constructor() {}

  public static getInstance(): TutorService {
    if (!TutorService.instance) {
      TutorService.instance = new TutorService();
    }
    return TutorService.instance;
  }

  startSession(duration: number, studentInfo: any): TutorSession {
    // Create tutor session
    this.currentSession = {
      sessionId: Date.now().toString(),
      startTime: new Date().toISOString(),
      duration,
      studentInfo,
      progress: {
        completedTopics: [],
        currentTopic: '',
        timeSpent: 0,
      },
    };

    // Start speaking session
    speakingService.startSession(
      studentInfo.userId,
      duration,
      'practice'
    );

    return this.currentSession;
  }

  private selectAppropriateQuestions(level: number): {
    [key: string]: string[] | 
      { topic: string; questions: string[] } | 
      { topics: string[]; format: { preparation: string; speaking: string; discussion: string }; criteria: string[] }
  } {
    if (level <= 5) {
      return part1Questions;
    } else if (level <= 6.5) {
      return { ...part1Questions, ...part2Questions };
    } else {
      return { ...part2Questions, ...part3Questions, ...advancedTopics };
    }
  }

  provideFeedback(response: string): SessionFeedback {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    // Get time remaining
    const timeRemaining = this.getTimeRemaining();
    
    // If time is up, provide final feedback
    if (timeRemaining <= 0) {
      return this.generateFinalFeedback();
    }

    // Otherwise, analyze current response
    const metrics: FeedbackMetrics = this.analyzeResponse(response);
    
    return {
      metrics,
      strengths: this.identifyStrengths(response, metrics),
      improvements: this.identifyImprovements(metrics),
      tips: this.generateTips(metrics),
      recordedResponses: [{
        question: this.currentSession.progress.currentTopic || '',
        response,
        feedback: this.generateDetailedFeedback(metrics)
      }]
    };
  }

  private analyzeResponse(response: string): FeedbackMetrics {
    // For now, return placeholder metrics
    return {
      pronunciation: 7,
      grammar: 7,
      vocabulary: 7,
      fluency: 7,
      coherence: 7,
      overallBand: 7
    };
  }

  private identifyStrengths(response: string, metrics: FeedbackMetrics): string[] {
    // Placeholder implementation
    return ['Good pronunciation', 'Natural flow of speech'];
  }

  private identifyImprovements(metrics: FeedbackMetrics): string[] {
    // Placeholder implementation
    return ['Practice complex grammar structures', 'Expand vocabulary range'];
  }

  private generateTips(metrics: FeedbackMetrics): string[] {
    // Placeholder implementation
    return [
      'Try recording yourself speaking',
      'Practice with native speakers when possible'
    ];
  }

  private generateDetailedFeedback(metrics: FeedbackMetrics): string {
    return `
Detailed Feedback:
- Pronunciation: Clear and understandable
- Grammar: Good use of basic structures
- Vocabulary: Appropriate word choice
- Fluency: Maintained good pace
- Coherence: Ideas well connected
    `;
  }

  getNextQuestion(): string {
    if (!this.currentSession) return '';
    
    const questions = this.selectAppropriateQuestions(
      this.currentSession.studentInfo.currentLevel
    );
    
    // Get a random question that hasn't been used
    const availableQuestions = Object.entries(questions).filter(([key, value]) => {
      if (!this.currentSession?.progress.completedTopics.includes(key)) {
        if (Array.isArray(value)) {
          return true; // For part1 and part3 questions
        } else if (typeof value === 'object') {
          if ('topic' in value) {
            return true; // For part2 questions
          } else if ('topics' in value) {
            return true; // For advanced topics
          }
        }
        return false;
      }
      return false;
    });
    
    if (availableQuestions.length === 0) return '';
    
    const [key, value] = availableQuestions[
      Math.floor(Math.random() * availableQuestions.length)
    ];
    
    if (this.currentSession) {
      this.currentSession.progress.currentTopic = key;
      this.currentSession.progress.completedTopics.push(key);
    }
    
    // Return the appropriate question based on the format
    if (Array.isArray(value)) {
      return value[0]; // Return first question for part1 and part3
    } else if (typeof value === 'object') {
      if ('topic' in value) {
        return value.topic; // Return topic for part2
      } else if ('topics' in value) {
        return value.topics[0]; // Return first topic for advanced
      }
    }
    
    return '';
  }

  getTimeRemaining(): number {
    if (!this.currentSession) return 0;
    const elapsed = (Date.now() - new Date(this.currentSession.startTime).getTime()) / 1000 / 60;
    return Math.max(0, this.currentSession.duration - elapsed);
  }

  endSession(): SessionFeedback {
    if (!this.currentSession) {
      throw new Error('No active session');
    }
    
    // End speaking service session
    speakingService.endSession();
    
    const finalFeedback = this.generateFinalFeedback();
    this.feedbackHistory.push(finalFeedback);
    this.currentSession = null;
    
    return finalFeedback;
  }

  private generateFinalFeedback(): SessionFeedback {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    const metrics: FeedbackMetrics = {
      pronunciation: 7,
      grammar: 7,
      vocabulary: 7,
      fluency: 7,
      coherence: 7,
      overallBand: 7
    };

    return {
      metrics,
      strengths: this.identifyStrengths('', metrics),
      improvements: this.identifyImprovements(metrics),
      tips: this.generateTips(metrics),
      recordedResponses: []
    };
  }
}

export const tutorService = TutorService.getInstance();
