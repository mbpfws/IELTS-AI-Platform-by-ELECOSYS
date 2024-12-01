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

  // Initialize client-side values and start session
  useEffect(() => {
    const startNewSession = async () => {
      if (!templateId) {
        router.push('/agents/speaking');
        return;
      }

      setIsProcessing(true);
      try {
        // Find the template across all template collections
        let template = part1Templates.find(t => t.id === templateId) ||
                      part1AdditionalTemplates.find(t => t.id === templateId) ||
                      part2Templates.find(t => t.id === templateId) ||
                      part3Templates.find(t => t.id === templateId) ||
                      tutoringLessons.find(t => t.id === templateId);

        if (!template) {
          console.error('Template not found:', templateId);
          router.push('/agents/speaking');
          return;
        }

        const sid = searchParams.get('sessionId') || Date.now().toString();
        setSessionId(sid);
        setMetrics(prev => ({
          ...prev,
          sessionId: sid,
          timestamp: new Date()
        }));

        // Initialize the session with Gemini
        const response = await ieltsGeminiService.startSession(templateId, userName);
        if (response && response.message) {
          setMessages([{ role: 'assistant', content: response.message }]);
          setSessionState('active');
        } else {
          throw new Error('Failed to get initial response from AI');
        }
      } catch (error) {
        console.error('Error starting session:', error);
        router.push('/agents/speaking');
      } finally {
        setIsProcessing(false);
      }
    };

    startNewSession();
  }, [templateId, userName, router, searchParams]);

  // Handle page unload/navigation
  useEffect(() => {
    const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
      if (sessionState === 'active') {
        e.preventDefault();
        e.returnValue = '';
        await handleEndSession(true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [sessionState]);

  const handleNavigateToSpeaking = async () => {
    if (sessionState === 'active') {
      await handleEndSession(true);
    }
    router.push('/agents/speaking');
  };

  const handleEndSession = async (autoSave = false) => {
    if (isEndingSession) return;
    
    setIsEndingSession(true);
    setSessionState('completed');
    
    try {
      // Get session summary from AI
      const summary = await ieltsGeminiService.endSession(sessionId);
      
      const summaryMessage = {
        role: 'assistant' as const,
        content: summary,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, summaryMessage]);

      // Update session in database
      await fetch(`/api/sessions?sessionId=${sessionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: summaryMessage,
          state: 'completed'
        })
      });

      // Generate session report
      await fetch(`/api/sessions?sessionId=${sessionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!autoSave) {
        // Show end dialog with summary
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

  const handleManualClose = () => {
    handleEndSession(false);
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
      // Send message to AI
      const response = await ieltsGeminiService.sendMessage(content);
      
      const aiMessage = {
        role: 'assistant' as const,
        content: response.message,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Update session in database
      await fetch(`/api/sessions?sessionId=${sessionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage
        })
      });

      await fetch(`/api/sessions?sessionId=${sessionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: aiMessage,
          metrics: response.metrics
        })
      });

      if (response.metrics) {
        setMetrics(prev => ({
          ...prev,
          ...response.metrics
        }));
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, there was an error processing your message. Please try again.',
        timestamp: Date.now()
      }]);
    }
    setIsProcessing(false);
  };

  const handleSendAudio = async (audioBlob: Blob) => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const response = await ieltsGeminiService.sendAudio(audioBlob);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.message,
        timestamp: Date.now()
      }]);

      if (response.metrics) {
        setMetrics(prev => ({
          ...prev,
          ...response.metrics
        }));
      }
    } catch (error) {
      console.error('Failed to process audio:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, there was an error processing your audio. Please try again.',
        timestamp: Date.now()
      }]);
    }
    setIsProcessing(false);
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
          duration={duration}
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
