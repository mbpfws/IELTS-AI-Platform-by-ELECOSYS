'use client';

import { useEffect, useState } from 'react';
import { practiceService } from '@/services/practiceService';
import { Progress } from '../ui/progress';
import { Card, CardContent } from '../ui/card';

interface SessionTimerProps {
  onSessionEnd?: () => void;
}

export function SessionTimer({ onSessionEnd }: SessionTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = practiceService.getTimeRemaining();
      setTimeRemaining(remaining);

      const session = practiceService.getCurrentSession();
      if (session) {
        const duration = session.duration * 60 * 1000; // Convert minutes to milliseconds
        const elapsed = Date.now() - session.startTime;
        const progressValue = Math.max(0, Math.min(100, ((duration - elapsed) / duration) * 100));
        setProgress(progressValue);

        if (elapsed >= duration && onSessionEnd) {
          onSessionEnd();
          clearInterval(timer);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onSessionEnd]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardContent className="py-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Session Progress</span>
            <span className={timeRemaining <= 60000 ? 'text-red-500 font-medium' : ''}>
              {formatTime(timeRemaining)}
            </span>
          </div>
          <Progress value={progress} />
        </div>
      </CardContent>
    </Card>
  );
}
