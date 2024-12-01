'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import IELTSChatInterface from '@/components/speaking/IELTSChatInterface';
import { ieltsGeminiService } from '@/services/ieltsGeminiService';
import { Message, SessionState } from '@/types/speakingSession';
import { LearningMetrics } from '@/types/learningMetrics';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { part1Templates } from '@/data/speakingTemplates/part1';
import { part1AdditionalTemplates } from '@/data/speakingTemplates/part1Additional';
import { part2Templates } from '@/data/speakingTemplates/part2';
import { part3Templates } from '@/data/speakingTemplates/part3';
import { tutoringLessons } from '@/data/speakingTemplates/tutoring';

export default function SpeakingSessionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const templateId = searchParams.get('templateId');
  const duration = parseInt(searchParams.get('duration') || '1200', 10);
  const userName = searchParams.get('userName') || 'User';
  
  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionState, setSessionState] = useState<SessionState>('active');
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [isEndingSession, setIsEndingSession] = useState(false);
  const [metrics, setMetrics] = useState<LearningMetrics>({
    sessionId: '',
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
      grammaticalRange: 6.0,
      pronunciation: 6.5
    }
  });
  const [timeRemaining, setTimeRemaining] = useState(duration);

  // Initialize client-side values and start session
  useEffect(() => {
    const startNewSession = async () => {
      if (!templateId || !userName) {
        router.push('/agents/speaking');
        return;
      }

      const sid = crypto.randomUUID();
      setSessionId(sid);
      
      // Initialize session state in storage
      const initialState = {
        messages: [],
        metrics: {
          performance: {
            taskResponse: 0,
            lexicalResource: 0,
            grammaticalRange: 0,
            pronunciation: 0
          }
        },
        timeRemaining: duration
      };
      
      sessionStorage.setItem(`session_${sid}`, JSON.stringify(initialState));
      
      try {
        const response = await ieltsGeminiService.initializeSession({
          sessionId: sid,
          templateId,
          userName,
          duration
        });

        if (response && response.message) {
          setMessages([{
            role: 'assistant',
            content: response.message,
            timestamp: Date.now()
          }]);
        }
      } catch (error) {
        console.error('Failed to initialize session:', error);
        router.push('/agents/speaking');
      }
    };

    startNewSession();
  }, [templateId, userName, router, searchParams, duration]);

  // Session timer
  useEffect(() => {
    if (!timeRemaining) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Format time for display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle page unload/navigation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const sessionData = sessionStorage.getItem(`session_${sessionId}`);
      if (sessionData) {
        // Save final state to database if needed
        fetch('/api/sessions/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sessionId,
            data: JSON.parse(sessionData)
          }),
          keepalive: true
        }).catch(console.error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeUnload', handleBeforeUnload);
    };
  }, [sessionId]);

  const handleNavigateToSpeaking = async () => {
    if (sessionState === 'active') {
      await handleEndSession(true);
    }
    router.push('/agents/speaking');
  };

  const handleEndSession = async (autoSave = false) => {
    if (isEndingSession) return;
    
    setIsEndingSession(true);
    try {
      setSessionState('ended');

      if (!autoSave) {
        setShowEndDialog(true);
      }
    } catch (error) {
      console.error('Failed to end session:', error);
    } finally {
      setIsEndingSession(false);
      if (autoSave) {
        router.push('/agents/speaking');
      }
    }
  };

  const handleConfirmEndSession = () => {
    setShowEndDialog(false);
    router.push('/agents/speaking');
  };

  const handleManualClose = async () => {
    try {
      const sessionData = sessionStorage.getItem(`session_${sessionId}`);
      if (sessionData) {
        await fetch('/api/sessions/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sessionId,
            data: JSON.parse(sessionData)
          })
        });
      }
      router.push('/agents/speaking');
    } catch (error) {
      console.error('Error closing session:', error);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (isProcessing) return;

    const userMessage = {
      role: 'user' as const,
      content,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      const response = await ieltsGeminiService.sendMessage(content);
      
      if (!response || !response.message) {
        throw new Error('Invalid response from AI service');
      }

      const aiMessage = {
        role: 'assistant' as const,
        content: response.message,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Update metrics if available
      if (response.metrics) {
        setMetrics(prev => ({
          ...prev,
          performance: {
            ...prev.performance,
            taskResponse: response.metrics.fluency || prev.performance.taskResponse,
            lexicalResource: response.metrics.lexical || prev.performance.lexicalResource,
            grammaticalRange: response.metrics.grammar || prev.performance.grammaticalRange,
            pronunciation: response.metrics.pronunciation || prev.performance.pronunciation
          }
        }));
      }

      // Store updated state in session storage instead of API call
      sessionStorage.setItem(`session_${sessionId}`, JSON.stringify({
        messages: [...messages, userMessage, aiMessage],
        metrics: metrics
      }));

    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, there was an error processing your message. Please try again.',
        timestamp: Date.now()
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendAudio = async (audioBlob: Blob) => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const response = await ieltsGeminiService.sendAudio(audioBlob);
      
      if (!response || !response.message) {
        throw new Error('Invalid response from AI service');
      }

      const aiMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Update metrics if available
      if (response.metrics) {
        setMetrics(prev => ({
          ...prev,
          performance: {
            ...prev.performance,
            taskResponse: response.metrics.fluency || prev.performance.taskResponse,
            lexicalResource: response.metrics.lexical || prev.performance.lexicalResource,
            grammaticalRange: response.metrics.grammar || prev.performance.grammaticalRange,
            pronunciation: response.metrics.pronunciation || prev.performance.pronunciation
          }
        }));
      }

      // Store updated state in session storage instead of API call
      sessionStorage.setItem(`session_${sessionId}`, JSON.stringify({
        messages: [...messages, aiMessage],
        metrics: metrics
      }));

    } catch (error) {
      console.error('Failed to process audio:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, there was an error processing your audio. Please try again.',
        timestamp: Date.now()
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="h-screen p-4">
        <IELTSChatInterface
          sessionId={sessionId}
          messages={messages}
          onSendMessage={handleSendMessage}
          onSendAudio={handleSendAudio}
          isProcessing={isProcessing}
          sessionState={sessionState}
          metrics={metrics}
          duration={formatTime(timeRemaining)}
          onEndSession={handleManualClose}
        />
      </div>

      {/* Session End Dialog */}
      <Dialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Session Complete</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <p>Your session has been saved. You can review your performance and transcript in the history section.</p>
            <div className="space-y-2">
              <h3 className="font-semibold">Session Summary:</h3>
              <div className="bg-secondary p-4 rounded-md">
                {messages[messages.length - 1]?.content || 'No summary available'}
              </div>
            </div>
            <Button 
              className="w-full" 
              onClick={handleNavigateToSpeaking}
            >
              Return to Templates
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
