"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
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

  return (
    <div className="flex justify-start">
      <Card className="max-w-[80%] p-4 prose prose-sm dark:prose-invert">
        <ReactMarkdown>{content}</ReactMarkdown>
      </Card>
    </div>
  );
}
