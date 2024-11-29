"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface NeumorphicCardProps {
  title: string;
  description?: string;
  duration?: number;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function NeumorphicCard({
  title,
  description,
  duration,
  selected = false,
  onClick,
  className,
  disabled = false,
}: NeumorphicCardProps) {
  const cardProps = {
    className: cn(
      'relative p-6 rounded-xl transition-all duration-200',
      'bg-white border border-gray-100',
      'hover:shadow-lg hover:scale-[1.02]',
      selected ? 'shadow-inner bg-gray-50' : 'shadow-md',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      className
    ),
    onClick: disabled ? undefined : onClick,
    role: "button",
    tabIndex: disabled ? -1 : 0,
    "aria-pressed": selected,
    "aria-disabled": disabled,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    }
  };

  return (
    <div {...cardProps}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      )}
      {duration !== undefined && (
        <div className="absolute bottom-4 right-4 text-sm text-gray-500">
          {Math.round(duration / 60)} min
        </div>
      )}
    </div>
  );
}
