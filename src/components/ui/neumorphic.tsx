import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

export const NeumorphicCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    selected?: boolean;
    disabled?: boolean;
  }
>(({ className, children, selected, disabled, onClick, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative p-6 rounded-xl transition-all duration-200",
      "bg-gray-100 dark:bg-gray-800",
      "shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(70,70,70,0.12)]",
      selected && "bg-gray-200 dark:bg-gray-700",
      !disabled && "hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer",
      disabled && "opacity-50 cursor-not-allowed",
      className
    )}
    onClick={!disabled ? onClick : undefined}
    role="button"
    tabIndex={disabled ? -1 : 0}
    {...props}
  >
    {children}
  </div>
));
NeumorphicCard.displayName = "NeumorphicCard";

export const NeumorphicButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "accent"
  }
>(({ className, variant = "primary", ...props }, ref) => {
  const variantStyles = {
    primary: "bg-[#e0e5ec] text-gray-700 hover:bg-[#d1d9e6]",
    secondary: "bg-[#4A90E2] text-white hover:bg-[#357ABD]",
    accent: "bg-[#FF6B6B] text-white hover:bg-[#FF5252]"
  };

  return (
    <button
      ref={ref}
      className={cn(
        "px-6 py-3 rounded-xl font-medium",
        "shadow-[6px_6px_10px_rgba(163,177,198,0.6),-6px_-6px_10px_rgba(255,255,255,0.5)]",
        "active:shadow-[2px_2px_5px_rgba(163,177,198,0.6),-2px_-2px_5px_rgba(255,255,255,0.5)]",
        "transition-all duration-300",
        variantStyles[variant],
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
      "px-6 py-3 rounded-xl font-medium",
      active
        ? "bg-[#d1d9e6] shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]"
        : "bg-[#e0e5ec] shadow-[6px_6px_10px_rgba(163,177,198,0.6),-6px_-6px_10px_rgba(255,255,255,0.5)]",
      "transition-all duration-300",
      className
    )}
    {...props}
  />
));
NeumorphicTab.displayName = "NeumorphicTab";

export const NeumorphicInput = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full p-4 rounded-xl bg-[#e0e5ec]",
      "shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]",
      "focus:shadow-[inset_6px_6px_12px_rgba(163,177,198,0.6),inset_-6px_-6px_12px_rgba(255,255,255,0.5)]",
      "outline-none transition-shadow duration-300",
      "resize-none",
      className
    )}
    {...props}
  />
));
NeumorphicInput.displayName = "NeumorphicInput";

export const NeumorphicSidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ className, children, open = true, onOpenChange, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed top-0 right-0 h-screen",
      "bg-gray-100 dark:bg-gray-800",
      "shadow-[-10px_0_20px_rgba(0,0,0,0.1)]",
      "transition-transform duration-300 ease-in-out",
      open ? "translate-x-0" : "translate-x-full",
      className
    )}
    {...props}
  >
    {children}
  </div>
));

NeumorphicSidebar.displayName = "NeumorphicSidebar";

export const NeumorphicTabs = React.forwardRef<
  HTMLDivElement,
  {
    tabs: { id: string; label: string }[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
    className?: string;
  }
>(({ tabs, activeTab, onTabChange, className, ...props }, ref) => (
  <div ref={ref} className={cn("flex space-x-2", className)} {...props}>
    {tabs.map((tab) => (
      <NeumorphicTab
        key={tab.id}
        active={activeTab === tab.id}
        onClick={() => onTabChange(tab.id)}
      >
        {tab.label}
      </NeumorphicTab>
    ))}
  </div>
));
NeumorphicTabs.displayName = "NeumorphicTabs";

export const NeumorphicTimer = React.forwardRef<
  HTMLDivElement,
  {
    duration: number;
    onComplete?: () => void;
    className?: string;
  }
>(({ duration, onComplete, className, ...props }, ref) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onComplete?.();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      ref={ref}
      className={cn(
        "px-6 py-3 rounded-xl font-medium text-center",
        "bg-[#e0e5ec] shadow-[6px_6px_10px_rgba(163,177,198,0.6),-6px_-6px_10px_rgba(255,255,255,0.5)]",
        className
      )}
      {...props}
    >
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
});
NeumorphicTimer.displayName = "NeumorphicTimer";

export const NeumorphicDialog = React.forwardRef<
  HTMLDivElement,
  {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
  }
>(({ isOpen, onClose, title, children, className, ...props }, ref) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        ref={ref}
        className={cn(
          "bg-[#e0e5ec] rounded-2xl p-6 max-h-[80vh] overflow-y-auto",
          "shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]",
          className
        )}
        {...props}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <NeumorphicButton variant="secondary" onClick={onClose}>
            Đóng
          </NeumorphicButton>
        </div>
        {children}
      </div>
    </div>
  );
});
NeumorphicDialog.displayName = "NeumorphicDialog";
