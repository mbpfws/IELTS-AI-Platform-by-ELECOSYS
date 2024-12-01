'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import AudioRecorder from '@/app/agents/speaking/components/AudioRecorder';
import { 
  Settings, Mic, MessageSquare, 
  PauseCircle, PlayCircle, StopCircle, Save, X 
} from 'lucide-react';
import { Message, SessionState } from '@/types/speakingSession';
import RichTextMessage from './RichTextMessage';
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

const IELTSChatInterface: React.FC<IELTSChatInterfaceProps> = ({
  sessionId,
  messages,
  onSendMessage,
  onSendAudio,
  isProcessing = false,
  sessionState,
  metrics,
  duration,
  onEndSession
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [timeRemaining, setTimeRemaining] = useState(duration);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    scrollToBottom;
  }, [messages]);

  // Session timer
  useEffect(() => {
    if (sessionState === 'active' && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [sessionState, timeRemaining]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isProcessing) return;

    onSendMessage(inputMessage.trim());
    setInputMessage('');
  };

  const handleAudioComplete = async (audioBlob: Blob) => {
    if (isProcessing) return;
    onSendAudio(audioBlob);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Session Info Bar */}
      <div className="bg-secondary p-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Session ID: {sessionId}</Badge>
          <Badge variant="outline">
            <Timer className="w-4 h-4 mr-1" />
            {timeRemaining}
          </Badge>
          {isRecording && (
            <Badge variant="destructive" className="animate-pulse">
              <Mic className="w-4 h-4 mr-1" />
              Recording...
            </Badge>
          )}
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
          <div className="flex-1 pr-4">
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
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <AudioRecorder
                onRecordingComplete={handleAudioComplete}
                isRecording={isRecording}
                setIsRecording={setIsRecording}
                disabled={isProcessing}
              />
              <form onSubmit={handleSubmit} className="flex-1 flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={isProcessing || isRecording}
                  placeholder={
                    isProcessing
                      ? 'Processing...'
                      : isRecording
                      ? 'Recording in progress...'
                      : 'Type your message...'
                  }
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
                />
                <Button 
                  type="submit" 
                  disabled={isProcessing || !inputMessage.trim() || isRecording}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes Sidebar */}
      <div className="bg-secondary p-4 space-y-2">
        <div className="flex justify-between items-center">
          <span>Engagement</span>
          <div className="w-32" />
        </div>
        <div className="flex justify-between items-center">
          <span>Comprehension</span>
          <div className="w-32" />
        </div>
        <div className="flex justify-between items-center">
          <span>Progress</span>
          <div className="w-32" />
        </div>
      </div>
    </div>
  );
};

export default IELTSChatInterface;
