"use client";

import { useState, useEffect, useRef } from 'react';
import { FiSend, FiMic, FiMessageSquare, FiClock, FiX, FiPlayCircle, FiPauseCircle, FiStopCircle } from 'react-icons/fi';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { AgentType } from '@/types';
import SessionSidebar from './SessionSidebar';
import AudioRecorder from './AudioRecorder';
import { LearningMetrics } from "@/types/learningMetrics";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { geminiService } from '@/services/geminiService';

interface Message {
  role: 'assistant' | 'user';
  content: string;
  id?: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  metrics: {
    fluency: number;
    lexical: number;
    grammar: number;
    pronunciation: number;
  };
  timeRemaining: number;
  inputMode: 'audio' | 'text';
  audioState: {
    isRecording: boolean;
    isPaused: boolean;
    audioUrl?: string | null;
  };
  textMessage: string;
  isLoading: boolean;
  onEndSession: () => void;
  onToggleInputMode: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onPauseRecording: () => void;
  onResumeRecording: () => void;
  onSendMessage: (content: string, isAudio?: boolean) => void;
  onTextMessageChange: (text: string) => void;
}

export default function ChatInterface({
  messages,
  metrics,
  timeRemaining,
  inputMode,
  audioState,
  textMessage,
  isLoading,
  onEndSession,
  onToggleInputMode,
  onStartRecording,
  onStopRecording,
  onPauseRecording,
  onResumeRecording,
  onSendMessage,
  onTextMessageChange,
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Chat Header */}
      <header className="border-b border-border/40 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                if (confirm('Are you sure you want to end this session?')) {
                  onEndSession();
                }
              }}
            >
              <FiX className="h-4 w-4 mr-2" />
              End Session
            </Button>
            <div className="flex items-center gap-2">
              <FiClock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Fluency</span>
                    <span>{metrics.fluency.toFixed(1)}</span>
                  </div>
                  <Progress value={metrics.fluency * 11.11} className="h-2" />
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Lexical</span>
                    <span>{metrics.lexical.toFixed(1)}</span>
                  </div>
                  <Progress value={metrics.lexical * 11.11} className="h-2" />
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Grammar</span>
                    <span>{metrics.grammar.toFixed(1)}</span>
                  </div>
                  <Progress value={metrics.grammar * 11.11} className="h-2" />
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pronunciation</span>
                    <span>{metrics.pronunciation.toFixed(1)}</span>
                  </div>
                  <Progress value={metrics.pronunciation * 11.11} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-[800px] mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id || index}
              className={cn(
                'flex',
                message.role === 'assistant' ? 'justify-start' : 'justify-end'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] rounded-lg p-4',
                  message.role === 'assistant'
                    ? 'bg-muted/50 text-foreground'
                    : 'bg-primary text-primary-foreground'
                )}
              >
                <div className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="border-t border-border/40 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-[800px] mx-auto flex gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={onToggleInputMode}
            className={cn(
              'transition-colors',
              inputMode === 'audio' && 'bg-primary text-primary-foreground'
            )}
            disabled={isLoading}
          >
            {inputMode === 'audio' ? <FiMic className="h-4 w-4" /> : <FiMessageSquare className="h-4 w-4" />}
          </Button>
          
          {inputMode === 'audio' ? (
            <div className="flex-1 flex items-center gap-2">
              {audioState.isRecording ? (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={audioState.isPaused ? onResumeRecording : onPauseRecording}
                    className="transition-colors hover:bg-muted"
                  >
                    {audioState.isPaused ? (
                      <FiPlayCircle className="h-4 w-4" />
                    ) : (
                      <FiPauseCircle className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onStopRecording}
                    className="transition-colors hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <FiStopCircle className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button
                  onClick={onStartRecording}
                  variant="outline"
                  size="icon"
                  className="transition-colors hover:bg-primary hover:text-primary-foreground"
                  disabled={isLoading}
                >
                  <FiMic className="h-4 w-4" />
                </Button>
              )}
              {audioState.audioUrl && (
                <audio src={audioState.audioUrl} controls className="flex-1 h-10" />
              )}
              {audioState.audioUrl && (
                <Button
                  onClick={() => onSendMessage(audioState.audioUrl!, true)}
                  disabled={isLoading}
                  className="transition-colors"
                >
                  <FiSend className="h-4 w-4" />
                </Button>
              )}
            </div>
          ) : (
            <div className="flex-1 flex gap-2">
              <Textarea
                value={textMessage}
                onChange={(e) => onTextMessageChange(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 min-h-[44px] resize-none"
                rows={1}
                disabled={isLoading}
              />
              <Button
                onClick={() => {
                  onSendMessage(textMessage);
                  onTextMessageChange('');
                }}
                disabled={!textMessage.trim() || isLoading}
                className="transition-colors"
              >
                <FiSend className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
