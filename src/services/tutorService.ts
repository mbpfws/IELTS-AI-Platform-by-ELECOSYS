import { part1Questions, part2Questions, part3Questions, advancedTopics } from '../data/speakingQuestions';
import { tutorDialogues, TutorSession, SessionFeedback, FeedbackMetrics } from '../data/speakingTutorSession';
import { speakingService } from './speakingService';
import { tutorResponseService } from './tutorResponseService';
import { AudioService, audioService } from './audioService';
import { ieltsGeminiService } from './ieltsGeminiService';

export class TutorService {
  private static instance: TutorService;
  private currentSession: TutorSession | null = null;
  private feedbackHistory: SessionFeedback[] = [];
  private audioService = audioService;
  private isRecording = false;

  private constructor() {}

  public static getInstance(): TutorService {
    if (!TutorService.instance) {
      TutorService.instance = new TutorService();
    }
    return TutorService.instance;
  }

  async initializeSession(userId: string, template?: any) {
    const session = await speakingService.startSession(userId, template);
    
    // Send initial system message
    await speakingService.sendMessage({
      sessionId: session.id,
      role: 'system',
      content: 'Session started. I am your IELTS Speaking tutor. Let\'s begin our practice session.',
      contentType: 'text'
    });

    // Send first question based on template
    const firstQuestion = template?.questions?.[0] || 'Let\'s start with a general question. Could you tell me about yourself and your background?';
    await speakingService.sendMessage({
      sessionId: session.id,
      role: 'assistant',
      content: firstQuestion,
      contentType: 'text'
    });

    return session;
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

    // Start IELTS speaking session with Gemini
    const systemPrompt = `you are an expert Language Teacher for the IELTS you are going to teach the following: ${this.currentSession.progress.currentTopic}`;
    ieltsGeminiService.setTemplate(systemPrompt);
    ieltsGeminiService.clearContext();
    ieltsGeminiService.addToContext({
      role: 'user',
      content: `My name is ${studentInfo.name}, and I would like to start a tutoring session of ${duration} minutes learning about ${this.currentSession.progress.currentTopic}`,
      timestamp: Date.now()
    });

    return this.currentSession;
  }

  async startRecording(): Promise<void> {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    this.isRecording = true;
    await this.audioService.startRecording();
  }

  async stopRecording(): Promise<string> {
    if (!this.isRecording || !this.currentSession) {
      throw new Error('No active recording or session');
    }

    this.isRecording = false;
    const audioData = await this.audioService.stopRecording();
    
    // Process the audio with Gemini
    const response = await ieltsGeminiService.processAudioResponse(audioData);
    return response;
  }

  async processAudioResponse(audioBlob: Blob): Promise<FeedbackMetrics> {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    try {
      const feedback = await ieltsGeminiService.processAudioResponse(audioBlob);
      
      // Convert IELTS feedback to FeedbackMetrics
      const metrics: FeedbackMetrics = {
        overallBand: feedback.overallBand,
        criteria: {
          fluency: feedback.fluencyScore,
          vocabulary: feedback.vocabularyScore,
          grammar: feedback.grammarScore,
          pronunciation: feedback.pronunciationScore
        },
        strengths: feedback.strengths,
        improvements: feedback.areasForImprovement,
        recommendations: feedback.recommendedPractice
      };

      this.feedbackHistory.push({
        timestamp: Date.now(),
        metrics,
        audioUrl: URL.createObjectURL(audioBlob)
      });

      return metrics;
    } catch (error) {
      console.error('Error processing audio response:', error);
      throw error;
    }
  }

  async endSession(): Promise<SessionFeedback> {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    try {
      const finalFeedback = await ieltsGeminiService.getFinalEvaluation();
      
      const feedback: SessionFeedback = {
        timestamp: Date.now(),
        metrics: {
          overallBand: finalFeedback.overallBand,
          criteria: {
            fluency: finalFeedback.fluencyScore,
            vocabulary: finalFeedback.vocabularyScore,
            grammar: finalFeedback.grammarScore,
            pronunciation: finalFeedback.pronunciationScore
          },
          strengths: finalFeedback.strengths,
          improvements: finalFeedback.areasForImprovement,
          recommendations: finalFeedback.recommendedPractice
        }
      };

      this.feedbackHistory.push(feedback);
      this.currentSession = null;
      ieltsGeminiService.clearContext();

      return feedback;
    } catch (error) {
      console.error('Error ending session:', error);
      throw error;
    }
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

  private generateFinalFeedback(): SessionFeedback {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    const metrics: FeedbackMetrics = {
      pronunciation: 0,
      fluency: 0,
      grammar: 0,
      vocabulary: 0,
      coherence: 0,
      overallBand: 0
    };
    const feedback = tutorResponseService.generateFeedback(metrics);

    // Parse the feedback content to extract strengths and improvements
    const strengths = feedback.richTextContent
      .split('💪 Your Strengths:')[1]
      .split('🎯 Areas to Focus On:')[0]
      .split('\n')
      .filter(s => s.trim().startsWith('•'))
      .map(s => s.trim().substring(2));

    const improvements = feedback.richTextContent
      .split('🎯 Areas to Focus On:')[1]
      .split('📊 Detailed Breakdown:')[0]
      .split('\n')
      .filter(s => s.trim().startsWith('•'))
      .map(s => s.trim().substring(2));

    const tips = [feedback.richTextContent
      .split('💡 Quick Tip:')[1]
      .split('\n')[0]
      .trim()];

    // Make the feedback more conversational
    return {
      metrics,
      strengths: strengths.map(s => `👍 ${s}`),
      improvements: improvements.map(i => `💡 ${i}`),
      tips: tips.map(t => `✨ ${t}`),
      recordedResponses: [{
        question: this.currentSession.progress.currentTopic || '',
        response: '',
        feedback: feedback.message
      }]
    };
  }
}

export const tutorService = TutorService.getInstance();
