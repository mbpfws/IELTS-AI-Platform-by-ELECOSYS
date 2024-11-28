export interface LearningMetrics {
  sessionId: string;
  timestamp: Date;
  duration: number; // in minutes
  energyScore: {
    engagement: number; // 0-100
    comprehension: number; // 0-100
    progress: number; // 0-100
    confidence: number; // 0-100
  };
  performance: {
    taskResponse: number; // 0-9
    coherenceCohesion: number; // 0-9
    lexicalResource: number; // 0-9
    grammaticalRange: number; // 0-9
  };
  learningProgress: {
    completedObjectives: string[];
    masteredConcepts: string[];
    areasForImprovement: string[];
    recommendedNextSteps: string[];
  };
  interactionMetrics: {
    totalQuestions: number;
    questionsAnswered: number;
    averageResponseTime: number; // in seconds
    clarificationRequests: number;
  };
  adaptivityMetrics: {
    difficultyAdjustments: number;
    conceptRevisits: number;
    alternativeExplanations: number;
    customizedExamples: number;
  };
  feedback: {
    strengthPoints: string[];
    improvementAreas: string[];
    bandScoreEstimate: number;
    confidenceLevel: number; // 0-100
  };
}
