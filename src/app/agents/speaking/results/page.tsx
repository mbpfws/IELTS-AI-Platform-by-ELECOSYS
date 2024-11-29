'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SpeakingMetrics } from '@/types/speakingSession';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function Results() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [metrics, setMetrics] = useState<SpeakingMetrics | null>(null);

  useEffect(() => {
    const metricsParam = searchParams.get('metrics');
    if (metricsParam) {
      try {
        const parsedMetrics = JSON.parse(metricsParam) as SpeakingMetrics;
        setMetrics(parsedMetrics);
      } catch (error) {
        console.error('Error parsing metrics:', error);
      }
    }
  }, [searchParams]);

  const renderMetricBar = (label: string, value: number) => {
    const width = Math.min(Math.max(value * 20, 0), 100); // Scale to 0-100%
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span>{label}</span>
          <span>{value.toFixed(1)}/5</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${width}%` }}
          ></div>
        </div>
      </div>
    );
  };

  if (!metrics) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading results...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Metrics Card */}
        <Card>
          <CardHeader>
            <CardTitle>Speaking Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {renderMetricBar('Pronunciation', metrics.pronunciation)}
            {renderMetricBar('Grammar', metrics.grammar)}
            {renderMetricBar('Vocabulary', metrics.vocabulary)}
            {renderMetricBar('Fluency', metrics.fluency)}
            {renderMetricBar('Coherence', metrics.coherence)}
            {metrics.overallBand && (
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold">
                  Overall Band: {metrics.overallBand.toFixed(1)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Feedback Card */}
        <Card>
          <CardHeader>
            <CardTitle>Feedback & Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            {metrics.feedback && (
              <>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Strengths</h3>
                  <ul className="list-disc pl-5">
                    {metrics.feedback.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Areas for Improvement</h3>
                  <ul className="list-disc pl-5">
                    {metrics.feedback.weaknesses.map((weakness, index) => (
                      <li key={index}>{weakness}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Suggestions</h3>
                  <ul className="list-disc pl-5">
                    {metrics.feedback.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={() => router.push('/agents/speaking')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Start New Session
        </Button>
      </div>
    </div>
  );
}

export default function SpeakingResultsPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <p>Loading results...</p>
      </div>
    }>
      <Results />
    </Suspense>
  );
}
