"use client";

import { LearningMetrics } from "@/types/learningMetrics";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LearningMetricsDisplayProps {
  metrics: LearningMetrics;
}

export function LearningMetricsDisplay({ metrics }: LearningMetricsDisplayProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Energy Scores */}
          <div className="space-y-3">
            <h4 className="font-medium">Energy Scores</h4>
            <div>
              <p className="text-sm text-slate-600 mb-1">Engagement</p>
              <Progress value={metrics.energyScore.engagement} className="h-2" />
              <p className="text-xs text-right mt-1">{metrics.energyScore.engagement}%</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Comprehension</p>
              <Progress value={metrics.energyScore.comprehension} className="h-2" />
              <p className="text-xs text-right mt-1">{metrics.energyScore.comprehension}%</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Progress</p>
              <Progress value={metrics.energyScore.progress} className="h-2" />
              <p className="text-xs text-right mt-1">{metrics.energyScore.progress}%</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Confidence</p>
              <Progress value={metrics.energyScore.confidence} className="h-2" />
              <p className="text-xs text-right mt-1">{metrics.energyScore.confidence}%</p>
            </div>
          </div>

          {/* IELTS Performance */}
          <div className="space-y-3">
            <h4 className="font-medium">IELTS Performance</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600">Task Response</p>
                <p className="text-lg font-medium">{metrics.performance.taskResponse}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Coherence</p>
                <p className="text-lg font-medium">{metrics.performance.coherenceCohesion}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Lexical</p>
                <p className="text-lg font-medium">{metrics.performance.lexicalResource}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Grammar</p>
                <p className="text-lg font-medium">{metrics.performance.grammaticalRange}</p>
              </div>
            </div>
          </div>

          {/* Interaction Stats */}
          <div className="space-y-3">
            <h4 className="font-medium">Interaction Stats</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">Questions</p>
                <p className="font-medium">{metrics.interactionMetrics.totalQuestions}</p>
              </div>
              <div>
                <p className="text-slate-600">Answered</p>
                <p className="font-medium">{metrics.interactionMetrics.questionsAnswered}</p>
              </div>
              <div>
                <p className="text-slate-600">Clarifications</p>
                <p className="font-medium">{metrics.interactionMetrics.clarificationRequests}</p>
              </div>
              <div>
                <p className="text-slate-600">Avg Response</p>
                <p className="font-medium">{Math.round(metrics.interactionMetrics.averageResponseTime / 1000)}s</p>
              </div>
            </div>
          </div>

          {/* Feedback */}
          {metrics.feedback.strengthPoints.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium">Strengths</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                {metrics.feedback.strengthPoints.map((point, index) => (
                  <li key={index} className="text-slate-600">{point}</li>
                ))}
              </ul>
            </div>
          )}

          {metrics.feedback.improvementAreas.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium">Areas for Improvement</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                {metrics.feedback.improvementAreas.map((area, index) => (
                  <li key={index} className="text-slate-600">{area}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
