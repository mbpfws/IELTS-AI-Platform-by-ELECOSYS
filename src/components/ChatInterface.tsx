"use client";

import { useState, useEffect, useRef } from 'react';
import { FiSend, FiRefreshCw } from 'react-icons/fi';
import { geminiService } from '@/services/geminiService';
import type { AgentType } from '@/types';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SessionSidebar from './SessionSidebar';
import type { ChatMessage } from '@/types/chat';
import AudioRecorder from './AudioRecorder';
import { LearningMetrics } from "@/types/learningMetrics";
import { Progress } from "@/components/ui/progress";

interface ChatInterfaceProps {
  agentType: AgentType;
  systemInstruction: string;
  templatePrompt?: string;
  sessionId?: string;
  customConfig?: {
    modelName?: string;
    temperature?: number;
    topP?: number;
    maxOutputTokens?: number;
  }
}

function ChatInterface({ agentType, systemInstruction, templatePrompt, sessionId, customConfig }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [metrics, setMetrics] = useState<LearningMetrics>({
    sessionId: sessionId || '',
    timestamp: new Date(),
    duration: 0,
    energyScore: {
      engagement: 85,
      comprehension: 80,
      progress: 70,
      confidence: 75
    },
    performance: {
      taskResponse: 6.5,
      coherenceCohesion: 6.0,
      lexicalResource: 6.5,
      grammaticalRange: 6.0
    },
    learningProgress: {
      completedObjectives: [],
      masteredConcepts: [],
      areasForImprovement: [],
      recommendedNextSteps: []
    },
    interactionMetrics: {
      totalQuestions: 0,
      questionsAnswered: 0,
      averageResponseTime: 0,
      clarificationRequests: 0
    },
    adaptivityMetrics: {
      difficultyAdjustments: 0,
      conceptRevisits: 0,
      alternativeExplanations: 0,
      customizedExamples: 0
    },
    feedback: {
      strengthPoints: [],
      improvementAreas: [],
      bandScoreEstimate: 0,
      confidenceLevel: 0
    }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && templatePrompt && sessionId) {
      const initialMessage: ChatMessage = {
        role: 'assistant',
        content: templatePrompt,
        timestamp: Date.now(),
        id: `initial-${sessionId}`
      };
      setMessages([initialMessage]);
    }
  }, [isClient, templatePrompt, sessionId]);

  const updateMetrics = (userMessage: string, aiResponse: string) => {
    setMetrics(prev => ({
      ...prev,
      interactionMetrics: {
        ...prev.interactionMetrics,
        totalQuestions: prev.interactionMetrics.totalQuestions + 1,
        questionsAnswered: prev.interactionMetrics.questionsAnswered + 1,
      },
      energyScore: {
        ...prev.energyScore,
        progress: Math.min(100, prev.energyScore.progress + 5)
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
      id: `user-${Date.now()}`
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await geminiService.generateResponse(
        input.trim(),
        systemInstruction,
        customConfig
      );

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
        id: `assistant-${Date.now()}`
      };

      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      updateMetrics(input.trim(), response);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
        id: `error-${Date.now()}`
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return <div className="flex-1 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="flex-1 flex flex-col max-w-5xl mx-auto">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={cn(
                "max-w-3xl mx-auto p-4 rounded-lg",
                message.role === 'user'
                  ? "ml-auto bg-blue-500 text-white"
                  : "bg-white shadow-md"
              )}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 text-slate-500 max-w-3xl mx-auto">
              <span>AI đang suy nghĩ</span>
              <div className="animate-pulse">...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t max-w-3xl mx-auto w-full">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn của bạn..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              <FiSend className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>

      {/* Learning Metrics Sidebar */}
      <div className="w-80 border-l bg-slate-50 overflow-y-auto p-4">
        <div className="space-y-4">
          <Card>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Năng lượng học tập
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Mức độ tập trung</p>
                  <Progress value={metrics.energyScore.engagement} className="h-2" />
                  <p className="text-xs text-right mt-1">{metrics.energyScore.engagement}%</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Mức độ hiểu bài</p>
                  <Progress value={metrics.energyScore.comprehension} className="h-2" />
                  <p className="text-xs text-right mt-1">{metrics.energyScore.comprehension}%</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Tiến độ</p>
                  <Progress value={metrics.energyScore.progress} className="h-2" />
                  <p className="text-xs text-right mt-1">{metrics.energyScore.progress}%</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Độ tự tin</p>
                  <Progress value={metrics.energyScore.confidence} className="h-2" />
                  <p className="text-xs text-right mt-1">{metrics.energyScore.confidence}%</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Điểm số IELTS
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Task Response</p>
                  <p className="text-lg font-medium">{metrics.performance.taskResponse}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Coherence</p>
                  <p className="text-lg font-medium">{metrics.performance.coherenceCohesion}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Lexical</p>
                  <p className="text-lg font-medium">{metrics.performance.lexicalResource}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Grammar</p>
                  <p className="text-lg font-medium">{metrics.performance.grammaticalRange}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Thống kê tương tác
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Số câu hỏi</p>
                  <p className="text-lg font-medium">{metrics.interactionMetrics.totalQuestions}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Đã trả lời</p>
                  <p className="text-lg font-medium">{metrics.interactionMetrics.questionsAnswered}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Thời gian TB</p>
                  <p className="text-lg font-medium">{Math.round(metrics.interactionMetrics.averageResponseTime / 1000)}s</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Yêu cầu làm rõ</p>
                  <p className="text-lg font-medium">{metrics.interactionMetrics.clarificationRequests}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
