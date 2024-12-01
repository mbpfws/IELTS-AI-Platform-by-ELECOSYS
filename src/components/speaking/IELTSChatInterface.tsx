'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, Mic, MessageSquare, Timer, 
  PauseCircle, PlayCircle, StopCircle, Save, X 
} from 'lucide-react';
import { Message, SessionState } from '@/types/speakingSession';
import RichTextMessage from './RichTextMessage';
import AudioRecorder from '../AudioRecorder';
import { LearningMetrics } from "@/types/learningMetrics";

interface IELTSChatInterfaceProps {
  sessionId: string;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onSendAudio: (audioBlob: Blob) => Promise<void>;
  isProcessing?: boolean;
  sessionState: SessionState;
  metrics: LearningMetrics;
  duration: number;
  onEndSession: () => void;
}

export default function IELTSChatInterface({
  sessionId,
  messages,
  onSendMessage,
  onSendAudio,
  isProcessing = false,
  sessionState,
  metrics,
  duration,
  onEndSession
}: IELTSChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [timeRemaining, setTimeRemaining] = useState(duration);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Session timer
  useEffect(() => {
    if (sessionState === 'active' && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [sessionState, timeRemaining]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleAudioComplete = async (audioBlob: Blob) => {
    setIsRecording(false);
    await onSendAudio(audioBlob);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Session Info Bar */}
      <div className="bg-secondary p-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Session ID: {sessionId}</Badge>
          <Badge variant="outline">
            <Timer className="w-4 h-4 mr-1" />
            {formatTime(timeRemaining)}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNotes(!showNotes)}
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            Notes
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onEndSession}
          >
            <X className="w-4 h-4 mr-1" />
            End Session
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 p-4 flex flex-col">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <RichTextMessage 
                  key={idx}
                  role={msg.role}
                  content={msg.content}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="mt-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isProcessing || isRecording}
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={isProcessing || isRecording || !input.trim()}
              >
                Send
              </Button>
              <Button
                type="button"
                variant={isRecording ? "destructive" : "secondary"}
                onClick={() => setIsRecording(!isRecording)}
              >
                {isRecording ? <StopCircle className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            </form>
            {isRecording && (
              <AudioRecorder
                onComplete={handleAudioComplete}
                onCancel={() => setIsRecording(false)}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notes Sidebar */}
      <Sheet open={showNotes} onOpenChange={setShowNotes}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Session Notes</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Take notes during your session..."
              className="min-h-[200px]"
            />
            <Button 
              className="w-full" 
              onClick={() => {
                // Save notes logic here
                setShowNotes(false);
              }}
            >
              <Save className="w-4 h-4 mr-1" />
              Save Notes
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Performance Metrics */}
      <div className="bg-secondary p-4 space-y-2">
        <div className="flex justify-between items-center">
          <span>Engagement</span>
          <Progress value={metrics.energyScore.engagement} className="w-32" />
        </div>
        <div className="flex justify-between items-center">
          <span>Comprehension</span>
          <Progress value={metrics.energyScore.comprehension} className="w-32" />
        </div>
        <div className="flex justify-between items-center">
          <span>Progress</span>
          <Progress value={metrics.energyScore.progress} className="w-32" />
        </div>
      </div>
    </div>
  );
}
