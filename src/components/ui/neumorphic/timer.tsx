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

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <div className={cn(
      "relative p-6 rounded-xl",
      "bg-gray-100",
      "shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(70,70,70,0.12)]",
      className
    )}>
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="relative z-10 flex items-center justify-center">
        <div className="text-4xl font-bold text-gray-800">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default NeumorphicTimer;
