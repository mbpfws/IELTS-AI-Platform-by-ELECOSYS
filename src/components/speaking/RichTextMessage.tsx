"use client";

import React from 'react';
import { Card } from '@/components/ui/card';

interface RichTextMessageProps {
  content: string;
  role: 'assistant' | 'user';
}

export default function RichTextMessage({ content, role }: RichTextMessageProps) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] p-3 rounded-lg bg-blue-500 text-white">
          {content}
        </div>
      </div>
    );
  }

  // Convert emojis and bullet points to rich text
  const formatContent = (text: string) => {
    // Split text into paragraphs
    return text.split('\n').map((paragraph, index) => {
      // Check if it's a bullet point
      if (paragraph.trim().startsWith('•') || paragraph.trim().startsWith('-')) {
        return (
          <li key={index} className="text-base ml-4">
            {paragraph.trim().substring(1).trim()}
          </li>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-base leading-relaxed my-2">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="flex justify-start">
      <Card className="max-w-[80%] p-4 bg-white dark:bg-slate-800">
        <div className="prose prose-sm dark:prose-invert">
          {formatContent(content)}
        </div>
      </Card>
    </div>
  );
}
