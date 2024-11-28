export interface TutorSession {
  sessionId: string;
  startTime: string;
  duration: number; // in minutes
  studentInfo: {
    name: string;
    targetBand: number;
    currentLevel: number;
    focusAreas: string[];
  };
  progress: {
    completedTopics: string[];
    currentTopic: string;
    timeSpent: number;
  };
}

export interface FeedbackMetrics {
  pronunciation: number;
  grammar: number;
  vocabulary: number;
  fluency: number;
  coherence: number;
  overallBand: number;
}

export interface SessionFeedback {
  metrics: FeedbackMetrics;
  strengths: string[];
  improvements: string[];
  tips: string[];
  recordedResponses: {
    question: string;
    response: string;
    feedback: string;
  }[];
}

export const tutorDialogues = {
  introduction: [
    "Hello! I'm your IELTS Speaking tutor. How long would you like to practice today? (in minutes)",
    "Before we begin, what specific areas would you like to focus on? (pronunciation, grammar, vocabulary, fluency)",
    "What's your target IELTS band score?",
  ],
  transitions: [
    "Let's move on to the next topic.",
    "That was good! Shall we try something more challenging?",
    "Would you like to practice this topic more or move to the next one?",
  ],
  encouragement: [
    "That's a good point! Can you elaborate more?",
    "Interesting perspective! Let's explore that further.",
    "I noticed you used good vocabulary there. Keep it up!",
  ],
  corrections: {
    pronunciation: [
      "Try to emphasize this word more: ",
      "Let's practice that sound again: ",
      "Pay attention to the stress in this word: ",
    ],
    grammar: [
      "Consider using this structure instead: ",
      "Remember to use the correct tense here: ",
      "This is a good place to use a complex sentence: ",
    ],
    vocabulary: [
      "Here's a more advanced word you could use: ",
      "Try using this collocation: ",
      "This idiom would work well here: ",
    ],
  },
  timeChecks: [
    "We have {{time}} minutes remaining.",
    "Let's make the most of our final {{time}} minutes.",
    "Would you like to focus on anything specific in our remaining {{time}} minutes?",
  ],
};

export const feedbackTemplate = {
  pronunciation: {
    excellent: "Your pronunciation is clear and natural, with good stress and intonation patterns.",
    good: "Your pronunciation is generally clear, with occasional minor issues.",
    needsWork: "Let's focus on improving the pronunciation of specific sounds and word stress.",
  },
  grammar: {
    excellent: "You use a wide range of accurate complex structures.",
    good: "You use some complex structures with generally good control.",
    needsWork: "Let's work on using more complex grammatical structures accurately.",
  },
  vocabulary: {
    excellent: "You use a wide range of vocabulary naturally and accurately.",
    good: "You use some advanced vocabulary with generally good control.",
    needsWork: "Let's expand your vocabulary range and work on using more precise terms.",
  },
  fluency: {
    excellent: "You speak fluently with only rare repetition or self-correction.",
    good: "You speak with some hesitation but maintain good flow.",
    needsWork: "Let's work on reducing hesitations and improving speech flow.",
  },
};
