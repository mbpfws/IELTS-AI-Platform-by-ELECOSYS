import { part1Questions, part2Questions, part3Questions, advancedTopics } from '../data/speakingQuestions';
import { tutorDialogues, TutorSession, SessionFeedback, FeedbackMetrics } from '../data/speakingTutorSession';
import { speakingService } from './speakingService';
import { tutorResponseService } from './tutorResponseService';
import { AudioService } from './AudioService';

export class TutorService {
  private static instance: TutorService;
  private currentSession: TutorSession | null = null;
  private feedbackHistory: SessionFeedback[] = [];
  private audioService = AudioService.getInstance();
  private isRecording = false;

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

    // If time is up, provide final feedback
    if (this.isSessionExpired()) {
      return this.generateFinalFeedback();
    }

    // For ongoing sessions, provide encouraging conversational responses
    const encouragingResponses = [
      "You're doing great! Keep going with your thoughts.",
      "That's interesting! Would you like to elaborate more?",
      "I'm following your points. Please continue.",
      "Good flow of ideas! Feel free to expand on that.",
      "You're expressing yourself well. What else would you add?",
      "I see what you mean. Tell me more about that.",
    ];

    const randomResponse = encouragingResponses[Math.floor(Math.random() * encouragingResponses.length)];

    return {
      metrics: {
        pronunciation: 5,
        grammar: 5,
        vocabulary: 5,
        fluency: 5,
        coherence: 5,
        overallBand: 5
      },
      strengths: [],
      improvements: [],
      tips: [],
      recordedResponses: [{
        question: this.currentSession.progress.currentTopic || '',
        response,
        feedback: randomResponse
      }]
    };
  }

  private analyzeResponse(response: string): FeedbackMetrics {
    // Check if the response contains a request for feedback
    const feedbackRequestRegex = /feedback|score|rate|evaluate|analysis/i;
    const hasFeedbackRequest = feedbackRequestRegex.test(response);

    if (!hasFeedbackRequest) {
      // If no explicit feedback request, return neutral metrics
      return {
        pronunciation: 5,
        grammar: 5,
        vocabulary: 5,
        fluency: 5,
        coherence: 5,
        overallBand: 5
      };
    }

    // Placeholder for more sophisticated analysis
    // In a real implementation, you might use AI to generate more precise metrics
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
    
    const now = Date.now();
    const startTime = new Date(this.currentSession.startTime).getTime();
    const elapsedMinutes = (now - startTime) / 1000 / 60;
    
    // Update time spent in the session
    if (this.currentSession.progress) {
      this.currentSession.progress.timeSpent = Math.floor(elapsedMinutes);
    }
    
    return Math.max(0, this.currentSession.duration - elapsedMinutes);
  }

  trackTimeSpent() {
    if (!this.currentSession) return 0;
    
    const now = Date.now();
    const startTime = new Date(this.currentSession.startTime).getTime();
    const elapsedMinutes = Math.floor((now - startTime) / 1000 / 60);
    
    if (this.currentSession.progress) {
      this.currentSession.progress.timeSpent = elapsedMinutes;
    }
    
    return elapsedMinutes;
  }

  isSessionExpired(): boolean {
    return this.getTimeRemaining() <= 0;
  }

  async startRecording(): Promise<void> {
    if (this.isRecording) {
      throw new Error('Recording already in progress');
    }

    if (!this.currentSession) {
      throw new Error('No active session');
    }

    try {
      await this.audioService.startRecording();
      this.isRecording = true;
    } catch (error) {
      console.error('Failed to start recording:', error);
      this.isRecording = false;
      throw error;
    }
  }

  async stopRecording(): Promise<void> {
    if (!this.isRecording) {
      return; // No recording in progress, just return
    }

    if (!this.currentSession) {
      throw new Error('No active session');
    }

    try {
      const audioBlob = await this.audioService.stopRecording();
      this.isRecording = false;

      // Process the audio
      const transcription = await this.audioService.processAudio(audioBlob, 'scoring', this.currentSession.progress.currentTopic);

      // Add transcription to messages
      const userMessage = {
        role: 'user',
        content: transcription,
        timestamp: Date.now(),
        contentType: 'text'
      };

      // Get AI response
      const response = await speakingService.generateResponse(
        this.currentSession.studentInfo.template,
        transcription
      );

      const aiMessage = {
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
        contentType: 'text'
      };

      // Update feedback history
      this.feedbackHistory.push({
        metrics: this.analyzeResponse(transcription),
        strengths: this.identifyStrengths(transcription, this.analyzeResponse(transcription)),
        improvements: this.identifyImprovements(this.analyzeResponse(transcription)),
        tips: this.generateTips(this.analyzeResponse(transcription)),
        recordedResponses: [{
          question: this.currentSession.progress.currentTopic || '',
          response: transcription,
          feedback: response
        }]
      });

    } catch (error) {
      console.error('Failed to stop recording:', error);
      this.isRecording = false;
      throw error;
    }
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

    const feedback = tutorResponseService.generateDetailedFeedback(
      this.currentSession.progress.completedTopics.join('\n'),
      this.currentSession.studentInfo.targetBand
    );

    // Make the feedback more conversational
    return {
      ...feedback,
      strengths: feedback.strengths.map(s => `👍 ${s}`),
      improvements: feedback.improvements.map(i => `💡 ${i}`),
      tips: feedback.tips.map(t => `✨ ${t}`),
      recordedResponses: feedback.recordedResponses.map(r => ({
        ...r,
        feedback: `Here's my thoughts on your response: ${r.feedback}`
      }))
    };
  }
}

export const tutorService = TutorService.getInstance();
