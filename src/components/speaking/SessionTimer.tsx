import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';

interface SessionTimerProps {
  duration: number; // Duration in minutes
  onTimeEnd?: () => void;
  isActive?: boolean;
}

export function SessionTimer({ duration, onTimeEnd, isActive = true }: SessionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeEnd?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeEnd]);

  useEffect(() => {
    const totalSeconds = duration * 60;
    const progressPercent = (timeLeft / totalSeconds) * 100;
    setProgress(progressPercent);
  }, [timeLeft, duration]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const getTimeColor = () => {
    if (progress > 50) return 'text-green-600';
    if (progress > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Thời gian còn lại</span>
            <span className={`text-lg font-bold ${getTimeColor()}`}>
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </span>
          </div>
          <Progress value={progress} />
        </div>
      </CardContent>
    </Card>
  );
}
