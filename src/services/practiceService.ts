import { part1Questions, part2Questions, part3Questions } from '../data/speakingQuestions';
import { tutorSystemPrompt } from '../data/tutorSystemPrompt';

export interface PracticeSession {
  id: string;
  type: 'tutor' | 'template' | 'mock-test';
  startTime: Date;
  endTime?: Date;
  duration: number;
  topics: string[];
  feedback: SessionFeedback[];
  recordings: string[];
}

export interface SessionFeedback {
  timestamp: Date;
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

class PracticeService {
  private currentSession: PracticeSession | null = null;
  private sessionHistory: PracticeSession[] = [];

  // Start a new practice session
  startSession(type: 'tutor' | 'template' | 'mock-test', duration: number): PracticeSession {
    this.currentSession = {
      id: Date.now().toString(),
      type,
      startTime: new Date(),
      duration,
      topics: [],
      feedback: [],
      recordings: [],
    };
    return this.currentSession;
  }

  // Get questions based on practice type and user level
  getQuestions(type: string, level: number) {
    switch (type) {
      case 'tutor':
        return this.getTutorQuestions(level);
      case 'template':
        return this.getTemplateQuestions();
      case 'mock-test':
        return this.getMockTestQuestions();
      default:
        return [];
    }
  }

  private getTutorQuestions(level: number) {
    // Select questions based on user level
    const questions = {
      ...part1Questions,
      ...(level >= 5 ? part2Questions : {}),
      ...(level >= 6 ? part3Questions : {}),
    };
    return this.shuffleQuestions(questions);
  }

  private getTemplateQuestions() {
    // Return template-based questions
    return {
      part1: part1Questions,
      part2: part2Questions,
      part3: part3Questions,
    };
  }

  private getMockTestQuestions() {
    // Return a structured mock test
    return {
      part1: this.selectRandomQuestions(part1Questions, 3),
      part2: this.selectRandomQuestions(part2Questions, 1),
      part3: this.selectRandomQuestions(part3Questions, 3),
    };
  }

  // Add feedback during the session
  addFeedback(feedback: SessionFeedback) {
    if (this.currentSession) {
      this.currentSession.feedback.push(feedback);
    }
  }

  // Add recording to the session
  addRecording(recordingUrl: string) {
    if (this.currentSession) {
      this.currentSession.recordings.push(recordingUrl);
    }
  }

  // End the current session
  endSession(): PracticeSession | null {
    if (this.currentSession) {
      this.currentSession.endTime = new Date();
      this.sessionHistory.push(this.currentSession);
      const completedSession = this.currentSession;
      this.currentSession = null;
      return completedSession;
    }
    return null;
  }

  // Get user progress
  getUserProgress(): UserProgress {
    const progress = this.calculateProgress();
    return {
      totalSessions: this.sessionHistory.length,
      averageScores: progress.averageScores,
      recentTopics: progress.recentTopics,
      weakAreas: progress.weakAreas,
      strongAreas: progress.strongAreas,
    };
  }

  private calculateProgress() {
    // Calculate user progress based on session history
    // This is a placeholder implementation
    return {
      averageScores: {
        pronunciation: 0,
        grammar: 0,
        vocabulary: 0,
        fluency: 0,
        coherence: 0,
      },
      recentTopics: [],
      weakAreas: [],
      strongAreas: [],
    };
  }

  private shuffleQuestions(questions: any) {
    // Implement question shuffling logic
    return questions;
  }

  private selectRandomQuestions(questions: any, count: number) {
    // Implement random question selection logic
    return questions;
  }
}

export const practiceService = new PracticeService();
