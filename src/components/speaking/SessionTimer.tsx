'use client';

import { useEffect, useState } from 'react';
import { practiceService } from '@/services/practiceService';
import { Progress } from '../ui/progress';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';

interface SessionTimerProps {
  onSessionEnd?: () => void;
}

export function SessionTimer({ onSessionEnd }: SessionTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [progress, setProgress] = useState(100);
  const [isWarning, setIsWarning] = useState(false);
  const [isCritical, setIsCritical] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const updateTimer = () => {
      const session = practiceService.getCurrentSession();
      if (!session) return;

      const startTimeMs = new Date(session.startTime).getTime();
      const durationMs = session.duration * 1000; // Convert seconds to milliseconds
      const now = Date.now();
      const elapsedMs = now - startTimeMs;
      const remainingMs = Math.max(0, durationMs - elapsedMs);
      
      setTimeRemaining(remainingMs);
      setProgress(Math.max(0, Math.min(100, (remainingMs / durationMs) * 100)));

      // Set warning states
      setIsWarning(remainingMs <= 120000); // 2 minutes
      setIsCritical(remainingMs <= 30000); // 30 seconds

      if (remainingMs <= 0) {
        if (onSessionEnd) onSessionEnd();
        clearInterval(timer);
      }
    };

    // Initial update
    updateTimer();
    
    // Start interval
    timer = setInterval(updateTimer, 1000);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [onSessionEnd]);

  const formatTime = (ms: number): string => {
    if (!ms || isNaN(ms)) return "0:00";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className={cn(
      'transition-colors duration-300',
      isCritical ? 'bg-red-50 dark:bg-red-950' : 
      isWarning ? 'bg-yellow-50 dark:bg-yellow-950' : 
      'bg-white dark:bg-slate-800'
    )}>
      <CardContent className="py-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium text-sm">Time Remaining</span>
            <span className={cn(
              'font-bold text-lg transition-colors duration-300',
              isCritical ? 'text-red-600 dark:text-red-400' :
              isWarning ? 'text-yellow-600 dark:text-yellow-400' :
              'text-blue-600 dark:text-blue-400'
            )}>
              {formatTime(timeRemaining)}
            </span>
          </div>
          <Progress 
            value={progress} 
            className={cn(
              'h-2 transition-colors duration-300',
              isCritical ? 'bg-red-600 dark:bg-red-400' :
              isWarning ? 'bg-yellow-600 dark:bg-yellow-400' :
              'bg-blue-600 dark:bg-blue-400'
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
