import { LearningMetrics } from "@/types/learningMetrics";

export function calculateEngagement(messageCount: number, averageResponseTime: number): number {
  // Simple engagement score based on message frequency and response time
  const messageScore = Math.min(messageCount * 10, 100);
  const timeScore = Math.max(100 - (averageResponseTime / 1000), 0); // Convert ms to seconds
  return Math.round((messageScore + timeScore) / 2);
}

export function calculateComprehension(
  correctResponses: number,
  totalResponses: number
): number {
  if (totalResponses === 0) return 0;
  return Math.round((correctResponses / totalResponses) * 100);
}

export function estimateIELTSScore(metrics: LearningMetrics): number {
  const {
    performance: { taskResponse, coherenceCohesion, lexicalResource, grammaticalRange }
  } = metrics;

  // Calculate overall band score (average of all components)
  const bandScore = (
    taskResponse +
    coherenceCohesion +
    lexicalResource +
    grammaticalRange
  ) / 4;

  // Round to nearest 0.5
  return Math.round(bandScore * 2) / 2;
}

export function calculateProgress(
  completedObjectives: string[],
  totalObjectives: number
): number {
  return Math.round((completedObjectives.length / totalObjectives) * 100);
}

export function calculateConfidence(
  successfulAttempts: number,
  totalAttempts: number
): number {
  if (totalAttempts === 0) return 0;
  return Math.round((successfulAttempts / totalAttempts) * 100);
}

export function analyzeStrengthsAndWeaknesses(metrics: LearningMetrics) {
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  // Analyze performance metrics
  if (metrics.performance.taskResponse >= 7.0) {
    strengths.push("Strong task response and content development");
  } else if (metrics.performance.taskResponse < 6.0) {
    weaknesses.push("Needs improvement in task response and content development");
  }

  if (metrics.performance.coherenceCohesion >= 7.0) {
    strengths.push("Excellent coherence and cohesion");
  } else if (metrics.performance.coherenceCohesion < 6.0) {
    weaknesses.push("Work needed on text organization and linking");
  }

  if (metrics.performance.lexicalResource >= 7.0) {
    strengths.push("Rich vocabulary usage");
  } else if (metrics.performance.lexicalResource < 6.0) {
    weaknesses.push("Vocabulary range could be expanded");
  }

  if (metrics.performance.grammaticalRange >= 7.0) {
    strengths.push("Strong grammatical accuracy");
  } else if (metrics.performance.grammaticalRange < 6.0) {
    weaknesses.push("Grammar needs more attention");
  }

  // Analyze engagement and comprehension
  if (metrics.energyScore.engagement >= 80) {
    strengths.push("High level of engagement");
  } else if (metrics.energyScore.engagement < 60) {
    weaknesses.push("Could be more engaged in the learning process");
  }

  if (metrics.energyScore.comprehension >= 80) {
    strengths.push("Strong understanding of concepts");
  } else if (metrics.energyScore.comprehension < 60) {
    weaknesses.push("Understanding of key concepts needs improvement");
  }

  return { strengths, weaknesses };
}

export function generateRecommendations(metrics: LearningMetrics): string[] {
  const recommendations: string[] = [];
  const { strengths, weaknesses } = analyzeStrengthsAndWeaknesses(metrics);

  // Add specific recommendations based on weaknesses
  weaknesses.forEach(weakness => {
    switch (weakness) {
      case "Needs improvement in task response and content development":
        recommendations.push("Practice analyzing task requirements more carefully");
        recommendations.push("Work on developing ideas with more supporting details");
        break;
      case "Work needed on text organization and linking":
        recommendations.push("Study and practice using transition words");
        recommendations.push("Focus on paragraph organization and essay structure");
        break;
      case "Vocabulary range could be expanded":
        recommendations.push("Build vocabulary through reading academic texts");
        recommendations.push("Practice using synonyms and collocations");
        break;
      case "Grammar needs more attention":
        recommendations.push("Review complex grammatical structures");
        recommendations.push("Practice using a variety of sentence patterns");
        break;
    }
  });

  // Add general recommendations based on metrics
  if (metrics.interactionMetrics.clarificationRequests > 5) {
    recommendations.push("Review basic concepts before moving to advanced topics");
  }

  if (metrics.adaptivityMetrics.conceptRevisits > 3) {
    recommendations.push("Create a study plan focusing on challenging areas");
  }

  return recommendations;
}
