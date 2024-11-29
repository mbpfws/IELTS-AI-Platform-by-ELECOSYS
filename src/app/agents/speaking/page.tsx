'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SpeakingTemplate } from '@/types/speakingSession';
import { part1Templates, part2Templates, part3Templates, tutoringTemplates } from '@/data/speakingTemplates';
import { AudioRecorder } from './components/AudioRecorder';
import './styles.css';

const tabs = [
  { 
    id: 'part1', 
    label: 'PART 1', 
    subLabel: 'PRACTICE', 
    icon: '📚', 
    description: 'Practice 40 common topics for IELTS Speaking Part 1',
    supportText: '40 chủ đề luyện tập Part 1'
  },
  { 
    id: 'part2', 
    label: 'PART 2', 
    subLabel: 'PRACTICE', 
    icon: '📝', 
    description: '50 cue cards organized by categories',
    supportText: '50 chủ đề theo nhóm'
  },
  { 
    id: 'part3', 
    label: 'PART 3', 
    subLabel: 'PRACTICE', 
    icon: '📖', 
    description: 'In-depth discussion practice for Part 3',
    supportText: 'Luyện tập thảo luận chuyên sâu'
  },
  { 
    id: 'tutoring', 
    label: 'TUTORING', 
    subLabel: 'LESSON', 
    icon: '🎯', 
    description: 'Free practice with AI Tutor',
    supportText: 'Luyện tập tự do với AI Tutor'
  }
];

interface SessionResult {
  overallBand: number;
  fluencyScore: number;
  vocabularyScore: number;
  grammarScore: number;
  pronunciationScore: number;
  strengths: string[];
  areasForImprovement: string[];
  recommendedPractice: string[];
  timestamp: number;
  templateId: string;
  duration: number;
}

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: number;
}

interface SessionProps {
  template: SpeakingTemplate;
  duration?: number;
  onSessionEnd: (result: SessionResult) => void;
}

function MessageDisplay({ message }: { message: Message }) {
  return (
    <div className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-wrap ${
        message.role === 'assistant' 
          ? 'bg-blue-100 text-blue-900' 
          : 'bg-green-100 text-green-900'
      }`}>
        {message.content}
      </div>
    </div>
  );
}

const PracticeSession: React.FC<SessionProps> = ({ template, duration, onSessionEnd }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState('');
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize duration only once
  useEffect(() => {
    const sessionDuration = duration || template.duration || 15;
    const durationInSeconds = sessionDuration * 60;
    setTimeRemaining(durationInSeconds);
  }, [duration, template.duration]);

  // Initialize session
  useEffect(() => {
    const initializeSession = async () => {
      if (!isInitializing) return;

      try {
        setIsInitializing(true);
        const response = await fetch('/api/process-audio', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sessionData: {
              part: 'speaking',
              duration: timeRemaining,
              timestamp: new Date().toISOString(),
              topic: {
                title: template.title,
                description: template.description,
                targetBand: template.targetBand,
                systemPrompt: template.systemPrompt
              }
            },
            isSessionStart: true
          })
        });

        if (!response.ok) {
          throw new Error('Failed to initialize session');
        }

        const data = await response.json();
        if (data.success && data.response) {
          setMessages([{
            id: crypto.randomUUID(),
            role: 'assistant',
            content: data.response,
            timestamp: Date.now()
          }]);
          setSessionStartTime(Date.now());
          setIsSessionActive(true);
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error) {
        console.error('Error initializing session:', error);
        // Add user-friendly error message to messages
        setMessages([{
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Sorry, I had trouble starting our session. Please try refreshing the page.',
          timestamp: Date.now()
        }]);
      } finally {
        setIsInitializing(false);
      }
    };

    if (timeRemaining > 0) {
      initializeSession();
    }

    return () => {
      setIsSessionActive(false);
    };
  }, [timeRemaining, template]);

  // Handle timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isSessionActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSessionEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isSessionActive, timeRemaining]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      const getFinalEvaluation = async () => {
        const response = await fetch('/api/process-audio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionContext: JSON.stringify(messages),
            template: template.systemPrompt,
            isEndOfSession: true
          })
        });
        
        const data = await response.json();
        if (data.success) {
          const evaluation = JSON.parse(data.response);
          onSessionEnd({
            ...evaluation,
            timestamp: Date.now(),
            templateId: template.id,
            duration: timeRemaining
          });
        }
      };
      
      getFinalEvaluation();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, messages, template, onSessionEnd]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleTextSubmit = async (text: string) => {
    try {
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: text,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, userMessage]);

      const response = await fetch('/api/process-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          sessionData: {
            part: 'speaking',
            duration: timeRemaining,
            timestamp: new Date().toISOString(),
            topic: {
              title: template.title,
              description: template.description,
              targetBand: template.targetBand,
              systemPrompt: template.systemPrompt
            }
          }
        })
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.response,
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
      return data;
    } catch (error) {
      console.error('Error sending text message:', error);
      throw error;
    }
  };

  const handleAudioSubmit = async (content: string, audioBlob: Blob) => {
    try {
      // Create a FormData object to handle the file upload
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      formData.append('sessionData', JSON.stringify({
        part: 'speaking',
        duration: timeRemaining,
        timestamp: new Date().toISOString(),
        topic: {
          title: template.title,
          description: template.description,
          targetBand: template.targetBand,
          systemPrompt: template.systemPrompt
        }
      }));

      const response = await fetch('/api/process-audio', {
        method: 'POST',
        body: formData // Don't set Content-Type header, browser will set it with boundary
      });

      if (!response.ok) {
        throw new Error('Failed to process audio');
      }

      const data = await response.json();
      if (data.success) {
        const userMessage: Message = {
          id: crypto.randomUUID(),
          role: 'user',
          content: data.transcription || content,
          timestamp: Date.now()
        };

        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.response,
          timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMessage, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to process audio');
      }
    } catch (error) {
      console.error('Error processing audio:', error);
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, I had trouble processing your audio. Please try again.',
        timestamp: Date.now()
      }]);
    }
  };

  const handleSessionEnd = () => {
    setIsSessionActive(false);
    onSessionEnd({
      overallBand: 0,
      fluencyScore: 0,
      vocabularyScore: 0,
      grammarScore: 0,
      pronunciationScore: 0,
      strengths: [],
      areasForImprovement: [],
      recommendedPractice: [],
      timestamp: Date.now(),
      templateId: template.id,
      duration: timeRemaining
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] gap-4 p-4">
      <div className="flex-1 flex gap-4">
        <div className="flex-1 bg-white rounded-lg shadow overflow-hidden flex flex-col">
          <div 
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto"
          >
            {messages.map((message, index) => (
              <MessageDisplay key={message.id} message={message} />
            ))}
          </div>
          <div className="p-4 border-t">
            <AudioRecorder
              onTextSubmit={handleTextSubmit}
              onAudioSubmit={handleAudioSubmit}
              isSessionActive={true}
            />
          </div>
        </div>
        <div className="w-80 bg-white rounded-lg shadow p-4">
          <div className="mb-4">
            <div className="text-lg font-bold">Time Remaining</div>
            <div className="text-2xl">
              {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
            </div>
          </div>
          <div className="h-px bg-gray-200 my-4" />
          <h3 className="font-bold mb-2">Notes</h3>
          <textarea
            className="w-full h-[calc(100%-8rem)] p-2 border rounded resize-none"
            value={''}
            onChange={(e) => {}}
            placeholder="Take notes during your practice..."
          />
        </div>
      </div>
    </div>
  );
};

const SessionSetup = ({ template, onStart }: { template: SpeakingTemplate; onStart: (duration: number) => void }) => {
  const [duration, setDuration] = useState(15);
  
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4">{template.title}</h2>
      <p className="text-gray-600 mb-2">{template.description}</p>
      {template.supportText && (
        <p className="text-sm text-gray-500 mb-6">{template.supportText}</p>
      )}
      
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Practice Duration (minutes)
        </label>
        <select 
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value={15}>15 minutes</option>
          <option value={30}>30 minutes</option>
          <option value={45}>45 minutes</option>
          {template.id === 'tutoring' && <option value={90}>90 minutes (Recommended)</option>}
        </select>
      </div>

      <button
        onClick={() => onStart(duration)}
        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Start Practice
      </button>
    </div>
  );
};

const getTemplatesForTab = (tab: string): SpeakingTemplate[] => {
  switch (tab) {
    case 'part1': return part1Templates;
    case 'part2': return part2Templates;
    case 'part3': return part3Templates;
    case 'tutoring': return tutoringTemplates;
    default: return [];
  }
};

const SpeakingPage = () => {
  const [selectedTab, setSelectedTab] = useState('part1');
  const [selectedTemplate, setSelectedTemplate] = useState<SpeakingTemplate | null>(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionDuration, setSessionDuration] = useState<number | undefined>(undefined);

  const handleTemplateSelect = (template: SpeakingTemplate) => {
    setSelectedTemplate(template);
  };

  const handleSessionStart = (duration: number) => {
    setSessionDuration(duration);
    setSessionStarted(true);
  };

  const handleSessionEnd = (result: SessionResult) => {
    setSessionStarted(false);
    setSelectedTemplate(null);
    setSessionDuration(undefined);
  };

  if (selectedTemplate && sessionStarted) {
    return (
      <PracticeSession 
        template={selectedTemplate} 
        duration={sessionDuration} 
        onSessionEnd={handleSessionEnd} 
      />
    );
  }

  if (selectedTemplate) {
    return (
      <SessionSetup 
        template={selectedTemplate} 
        onStart={handleSessionStart} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-4 px-4 sm:px-6 lg:px-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`px-3 py-2 text-sm font-medium ${
                selectedTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSelectedTab(tab.id)}
            >
              <div className="flex items-center space-x-2">
                <span>{tab.icon}</span>
                <div>
                  <div className="text-xs text-gray-400">{tab.subLabel}</div>
                  <div>{tab.label}</div>
                </div>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Active Session */}
        {sessionStarted && selectedTemplate ? (
          <PracticeSession
            template={selectedTemplate}
            duration={sessionDuration}
            onSessionEnd={handleSessionEnd}
          />
        ) : (
          <>
            {/* Section Header */}
            <div className="px-4 sm:px-0">
              <h2 className="text-lg font-semibold text-gray-900">
                {tabs.find(t => t.id === selectedTab)?.description}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                {tabs.find(t => t.id === selectedTab)?.supportText}
              </p>
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {getTemplatesForTab(selectedTab).map((template: SpeakingTemplate) => (
                <div
                  key={template.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      {template.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {template.description}
                    </p>
                    <div className="mt-4 flex items-center">
                      <span className="text-xs font-medium text-gray-500">
                        Target Band: {template.targetBand}
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-xs font-medium text-gray-500">
                        {template.duration / 60} mins
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default SpeakingPage;
