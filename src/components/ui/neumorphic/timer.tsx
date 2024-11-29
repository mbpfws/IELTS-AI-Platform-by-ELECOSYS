"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TimerProps {
  duration: number; // Duration in minutes
  onComplete?: () => void;
  className?: string;
}

const NeumorphicTimer = ({
  duration,
  onComplete,
  className,
}: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
  const [isRunning, setIsRunning] = useState(true);

  // Reset timer when duration changes
  useEffect(() => {
    setTimeLeft(duration * 60);
    setIsRunning(true);
  }, [duration]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      setTimeLeft((prev) => {
        const newTime = prev - elapsedSeconds;
        if (newTime <= 0) {
          clearInterval(timer);
          setIsRunning(false);
          onComplete?.();
          return 0;
        }
        return newTime;
      });
    }, 100); // Update more frequently for smoother countdown

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Calculate progress percentage
  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;
  
  // Determine color based on time remaining
  const getProgressColor = () => {
    if (timeLeft <= 30) return 'from-red-500 to-red-600';
    if (timeLeft <= 120) return 'from-yellow-500 to-yellow-600';
    return 'from-blue-500 to-purple-500';
  };

  return (
    <div className={cn(
      "relative p-6 rounded-xl",
      "bg-gray-100",
      "shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(70,70,70,0.12)]",
      className
    )}>
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div
          className={cn(
            "absolute left-0 top-0 h-full bg-gradient-to-r transition-all duration-300",
            getProgressColor()
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="relative z-10 flex items-center justify-center">
        <div className={cn(
          "text-4xl font-bold",
          timeLeft <= 30 ? "text-red-600" :
          timeLeft <= 120 ? "text-yellow-600" :
          "text-gray-800"
        )}>
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default NeumorphicTimer;
