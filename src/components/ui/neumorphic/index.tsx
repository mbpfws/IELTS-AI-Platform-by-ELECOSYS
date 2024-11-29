"use client";

import React from 'react';
import { cn } from '@/lib/utils';

const neumorphicBase = `
  bg-[#e0e5ec] 
  shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]
  hover:shadow-[6px_6px_10px_rgba(163,177,198,0.6),-6px_-6px_10px_rgba(255,255,255,0.5)]
  transition-shadow duration-300
  rounded-xl
`;

export const NeumorphicCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(neumorphicBase, 'p-6', className)}
    {...props}
  />
));
NeumorphicCard.displayName = "NeumorphicCard";

export const NeumorphicButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'danger'
  }
>(({ className, variant = 'primary', ...props }, ref) => {
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  };

  return (
    <button
      ref={ref}
      className={cn(
        neumorphicBase,
        'px-4 py-2 font-medium',
        variantStyles[variant],
        'active:shadow-[inset_6px_6px_10px_rgba(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)]',
        className
      )}
      {...props}
    />
  );
});
NeumorphicButton.displayName = "NeumorphicButton";

export const NeumorphicTab = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    active?: boolean
  }
>(({ className, active, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      neumorphicBase,
      'px-4 py-2 font-medium',
      active ? 
        'bg-blue-500 text-white shadow-[inset_6px_6px_10px_rgba(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)]' :
        'hover:bg-gray-100',
      className
    )}
    {...props}
  />
));
NeumorphicTab.displayName = "NeumorphicTab";

export const NeumorphicSidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    show: boolean
  }
>(({ className, show, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      neumorphicBase,
      'fixed right-0 top-0 h-full w-64 transform transition-transform duration-300 ease-in-out',
      show ? 'translate-x-0' : 'translate-x-full',
      className
    )}
    {...props}
  />
));
NeumorphicSidebar.displayName = "NeumorphicSidebar";

export const NeumorphicInput = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      neumorphicBase,
      'w-full p-4 resize-none focus:outline-none',
      'shadow-[inset_6px_6px_10px_rgba(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)]',
      className
    )}
    {...props}
  />
));
NeumorphicInput.displayName = "NeumorphicInput";
