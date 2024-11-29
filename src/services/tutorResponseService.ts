import { FeedbackMetrics } from '../data/speakingTutorSession';

interface TutorResponse {
  message: string;
  richTextContent: string;
}

export class TutorResponseService {
  private static instance: TutorResponseService;

  private constructor() {}

  public static getInstance(): TutorResponseService {
    if (!TutorResponseService.instance) {
      TutorResponseService.instance = new TutorResponseService();
    }
    return TutorResponseService.instance;
  }

  public generateIntroduction(topic: string, studentName: string = ''): TutorResponse {
    const greeting = this.getRandomGreeting();
    const nameIntro = studentName ? `, ${studentName}` : '';
    
    return {
      message: `${greeting}${nameIntro}! I'll be your IELTS Speaking tutor today.`,
      richTextContent: `${greeting}${nameIntro}! 👋

I'll be your IELTS Speaking tutor today. We'll be discussing ${topic} - a common topic in IELTS Speaking tests.

I'm here to help you practice and improve your:
🗣️ Fluency and pronunciation
📚 Vocabulary and expression
✨ Grammar and structure
💡 Ideas and examples

Ready to begin? Let's start with your thoughts on ${topic}!`
    };
  }

  public generateFeedback(metrics: FeedbackMetrics): TutorResponse {
    const strengths = this.getStrengths(metrics);
    const improvements = this.getImprovements(metrics);
    const encouragement = this.getRandomEncouragement();

    return {
      message: `Here's my feedback on your response.`,
      richTextContent: `${encouragement}

💪 Your Strengths:
${strengths.map(s => `• ${s}`).join('\n')}

🎯 Areas to Focus On:
${improvements.map(i => `• ${i}`).join('\n')}

📊 Detailed Breakdown:
🗣️ Pronunciation: ${metrics.pronunciation}/9.0
    ${this.getMetricFeedback('pronunciation', metrics.pronunciation)}
📚 Vocabulary: ${metrics.vocabulary}/9.0
    ${this.getMetricFeedback('vocabulary', metrics.vocabulary)}
✨ Grammar: ${metrics.grammar}/9.0
    ${this.getMetricFeedback('grammar', metrics.grammar)}
🌊 Fluency: ${metrics.fluency}/9.0
    ${this.getMetricFeedback('fluency', metrics.fluency)}
🔄 Coherence: ${metrics.coherence}/9.0
    ${this.getMetricFeedback('coherence', metrics.coherence)}

💡 Quick Tip: ${this.getQuickTip(metrics)}

Would you like to practice any specific area I mentioned?`
    };
  }

  private getRandomGreeting(): string {
    const greetings = [
      "Hi there",
      "Hello",
      "Welcome",
      "Great to meet you",
      "Nice to meet you"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  private getRandomEncouragement(): string {
    const encouragements = [
      "You're making good progress! Let's look at what you did well and where we can improve.",
      "That was a good attempt! Here's some helpful feedback to make it even better.",
      "Well done on your response! Let me share some observations to help you improve.",
      "Thanks for your detailed response! Let's analyze it together.",
      "Great effort! Here's some constructive feedback to help you advance."
    ];
    return encouragements[Math.floor(Math.random() * encouragements.length)];
  }

  private getStrengths(metrics: FeedbackMetrics): string[] {
    const strengths: string[] = [];
    
    if (metrics.pronunciation >= 7.0) {
      strengths.push("Your pronunciation is clear and natural");
    }
    if (metrics.vocabulary >= 7.0) {
      strengths.push("You use a good range of vocabulary");
    }
    if (metrics.grammar >= 7.0) {
      strengths.push("Your grammar structures are well-formed");
    }
    if (metrics.fluency >= 7.0) {
      strengths.push("You speak fluently with good pace");
    }
    if (metrics.coherence >= 7.0) {
      strengths.push("Your ideas flow logically");
    }

    return strengths.length > 0 ? strengths : ["You're making an effort to express your ideas"];
  }

  private getImprovements(metrics: FeedbackMetrics): string[] {
    const improvements: string[] = [];

    if (metrics.pronunciation < 7.0) {
      improvements.push("Practice pronouncing key topic vocabulary");
    }
    if (metrics.vocabulary < 7.0) {
      improvements.push("Try using more varied and specific vocabulary");
    }
    if (metrics.grammar < 7.0) {
      improvements.push("Focus on using more complex sentence structures");
    }
    if (metrics.fluency < 7.0) {
      improvements.push("Work on speaking more smoothly with fewer pauses");
    }
    if (metrics.coherence < 7.0) {
      improvements.push("Try connecting your ideas more clearly");
    }

    return improvements;
  }

  private getMetricFeedback(metric: string, score: number): string {
    if (score >= 7.5) {
      return "Excellent! Keep maintaining this level";
    } else if (score >= 6.5) {
      return "Good performance with room for refinement";
    } else {
      return "This area needs some focused practice";
    }
  }

  private getQuickTip(metrics: FeedbackMetrics): string {
    // Find the lowest scoring area
    const scores = {
      pronunciation: { score: metrics.pronunciation, tip: "Record yourself speaking and compare with native speakers" },
      vocabulary: { score: metrics.vocabulary, tip: "Keep a vocabulary journal for new words and phrases" },
      grammar: { score: metrics.grammar, tip: "Practice using a variety of sentence structures" },
      fluency: { score: metrics.fluency, tip: "Try speaking for 2 minutes without long pauses" },
      coherence: { score: metrics.coherence, tip: "Use linking words to connect your ideas better" }
    };

    const lowestMetric = Object.entries(scores).reduce((a, b) => 
      a[1].score < b[1].score ? a : b
    );

    return lowestMetric[1].tip;
  }
}

export const tutorResponseService = TutorResponseService.getInstance();
