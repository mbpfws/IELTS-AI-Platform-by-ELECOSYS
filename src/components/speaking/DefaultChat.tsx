"use client";

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';
import { Message } from '@/types/speakingSession';
import RichTextMessage from './RichTextMessage';

interface DefaultChatProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isProcessing?: boolean;
}

export default function DefaultChat({
  messages,
  onSendMessage,
  isProcessing
}: DefaultChatProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <RichTextMessage 
              key={idx}
              role={msg.role}
              content={msg.content}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập câu hỏi của bạn..."
            disabled={isProcessing}
          />
          <Button type="submit" disabled={isProcessing || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
