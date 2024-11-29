"use client";

import React from 'react';
import { Dialog as HeadlessDialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const NeumorphicDialog = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}: DialogProps) => {
  return (
    <HeadlessDialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <HeadlessDialog.Panel
          className={cn(
            "mx-auto max-w-xl w-full rounded-2xl p-6",
            "bg-gray-100",
            "shadow-[-10px_-10px_30px_rgba(255,255,255,0.5),10px_10px_30px_rgba(70,70,70,0.12)]",
            "backdrop-blur-lg",
            className
          )}
        >
          <div className="flex items-center justify-between mb-4">
            {title && (
              <HeadlessDialog.Title className="text-xl font-semibold text-gray-900">
                {title}
              </HeadlessDialog.Title>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          {children}
        </HeadlessDialog.Panel>
      </div>
    </HeadlessDialog>
  );
};

export default NeumorphicDialog;
