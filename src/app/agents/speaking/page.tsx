'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Message, SpeakingSession, SpeakingTemplate, SpeakingHistory } from '@/types/speakingSession';
import { part1Templates, part2Templates, part3Templates } from '@/data/speakingTemplates';
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
  },
  { 
    id: 'metrics', 
    label: 'MY', 
    subLabel: 'PROGRESS', 
    icon: '📊', 
    description: 'Track your learning progress',
    supportText: 'Thống kê và tiến độ học tập'
  }
];

const part2Categories = {
  'people': 'People & Relationships',
  'places': 'Places & Locations',
  'objects': 'Objects & Possessions',
  'events': 'Events & Experiences',
  'activities': 'Activities & Hobbies'
};

interface Template {
  id: string;
  title: string;
  description: string;
  supportText?: string;
  targetBand: number;
  tags: string[];
  category?: string;
  systemPrompt: string;
}

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
  template: Template;
  duration: number;
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [notes, setNotes] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize session by making an API call
    const initializeSession = async () => {
      try {
        const response = await fetch('/api/process-audio', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sessionData: {
              part: 'speaking',
              duration: duration,
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

        const data = await response.json();
        if (data.success) {
          setMessages([{
            id: Math.random().toString(36).substring(7),
            role: 'assistant',
            content: data.response,
            timestamp: Date.now()
          }]);
        }
      } catch (error) {
        console.error('Error initializing session:', error);
      }
    };

    initializeSession();

    // Start the timer
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [template, duration]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      // Session ended - get final evaluation
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
            duration
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
  }, [timeRemaining, messages, template, duration, onSessionEnd]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleTextSubmit = async (text: string) => {
    try {
      // Add user message to chat immediately
      const userMessage = {
        id: Math.random().toString(36).substring(7),
        role: 'user' as const,
        content: text,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, userMessage]);

      // Send message to API
      const response = await fetch('/api/process-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          sessionData: {
            part: 'speaking',
            duration: duration,
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
        setMessages(prev => [...prev, {
          id: Math.random().toString(36).substring(7),
          role: 'assistant',
          content: data.response,
          timestamp: Date.now()
        }]);
      }
      return data;
    } catch (error) {
      console.error('Error sending text message:', error);
      throw error;
    }
  };

  const handleAudioSubmit = async (content: string, audioBlob: Blob) => {
    try {
      // Add user message to chat immediately
      const userMessage = {
        id: Math.random().toString(36).substring(7),
        role: 'user' as const,
        content,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, userMessage]);

      // Send audio to API
      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('transcription', content);
      formData.append('sessionData', JSON.stringify({
        part: 'speaking',
        duration: duration,
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
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setMessages(prev => [...prev, {
          id: Math.random().toString(36).substring(7),
          role: 'assistant',
          content: data.response,
          timestamp: Date.now()
        }]);
      }
      return data;
    } catch (error) {
      console.error('Error sending audio message:', error);
      throw error;
    }
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
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Take notes during your practice..."
          />
        </div>
      </div>
    </div>
  );
};

const SessionSetup = ({ template, onStart }: { template: SpeakingTemplate, onStart: (duration: number) => void }) => {
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

const AudioRecorder = ({ onTextSubmit, onAudioSubmit, isSessionActive }: { 
  onTextSubmit: (text: string) => Promise<void>;
  onAudioSubmit: (content: string, blob: Blob) => Promise<void>;
  isSessionActive: boolean;
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [volume, setVolume] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [isManualInput, setIsManualInput] = useState(false);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    if (!isSessionActive) {
      handleStop();
    }
  }, [isSessionActive]);

  const initializeAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      });
      
      // Set up audio analysis
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      // Configure recorder
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        chunksRef.current = [];
        await onAudioSubmit(textInput, audioBlob);
      };

      // Start volume analysis
      const analyzeVolume = () => {
        if (!analyserRef.current || !isRecording) return;
        
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setVolume(average);
        
        if (isRecording) {
          requestAnimationFrame(analyzeVolume);
        }
      };

      analyzeVolume();
    } catch (err) {
      setError('Please allow microphone access to record audio');
      console.error('Error initializing audio:', err);
    }
  };

  const handleStart = async () => {
    setError(null);
    await initializeAudio();
    if (mediaRecorderRef.current) {
      setIsRecording(true);
      mediaRecorderRef.current.start();
    }
  };

  const handlePause = () => {
    if (mediaRecorderRef.current && isRecording) {
      setIsPaused(true);
      mediaRecorderRef.current.pause();
    }
  };

  const handleResume = () => {
    if (mediaRecorderRef.current && isRecording) {
      setIsPaused(false);
      mediaRecorderRef.current.resume();
    }
  };

  const handleStop = () => {
    if (mediaRecorderRef.current && isRecording) {
      setIsRecording(false);
      setIsPaused(false);
      mediaRecorderRef.current.stop();
      
      // Clean up audio context
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    }
  };

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return;
    await onTextSubmit(textInput);
    setTextInput('');
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div className="flex items-center gap-4">
        <div className="flex-1">
          {isManualInput ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your response..."
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleTextSubmit}
                disabled={!textInput.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
              >
                Send
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {!isRecording ? (
                <button
                  onClick={handleStart}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Start Recording
                </button>
              ) : (
                <>
                  {isPaused ? (
                    <button
                      onClick={handleResume}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Resume
                    </button>
                  ) : (
                    <button
                      onClick={handlePause}
                      className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                      Pause
                    </button>
                  )}
                  <button
                    onClick={handleStop}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Stop
                  </button>
                </>
              )}
              {isRecording && (
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-100"
                    style={{ width: `${(volume / 255) * 100}%` }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <button
          onClick={() => setIsManualInput(!isManualInput)}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isManualInput ? 'Switch to Voice' : 'Switch to Text'}
        </button>
      </div>
    </div>
  );
};

const MetricsDisplay = ({ results }: { results: SessionResult[] }) => {
  const recentResults = results.slice(-5).reverse();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">Average Band Score</h3>
          <p className="text-3xl font-bold text-blue-600">
            {(recentResults.reduce((acc, r) => acc + r.overallBand, 0) / recentResults.length).toFixed(1)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">Practice Sessions</h3>
          <p className="text-3xl font-bold text-blue-600">{results.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">Total Practice Time</h3>
          <p className="text-3xl font-bold text-blue-600">
            {Math.round(results.reduce((acc, r) => acc + r.duration, 0) / 60)} hours
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">Highest Band Score</h3>
          <p className="text-3xl font-bold text-blue-600">
            {Math.max(...results.map(r => r.overallBand))}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-bold">Recent Practice Sessions</h3>
        </div>
        <div className="divide-y">
          {recentResults.map((result, index) => (
            <div key={index} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold">{result.templateId}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(result.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">Band {result.overallBand}</p>
                  <p className="text-sm text-gray-500">{result.duration} minutes</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Fluency</p>
                  <p className="font-semibold">{result.fluencyScore}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vocabulary</p>
                  <p className="font-semibold">{result.vocabularyScore}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Grammar</p>
                  <p className="font-semibold">{result.grammarScore}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pronunciation</p>
                  <p className="font-semibold">{result.pronunciationScore}</p>
                </div>
              </div>
              <div className="mt-4">
                <h5 className="font-bold mb-2">Areas for Improvement</h5>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {result.areasForImprovement.map((area, i) => (
                    <li key={i}>{area}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SpeakingPage = () => {
  const [activeTab, setActiveTab] = useState('part1');
  const [selectedTemplate, setSelectedTemplate] = useState<SpeakingTemplate | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(15);
  const [sessionResults, setSessionResults] = useState<SessionResult[]>([]);
  const [showSetup, setShowSetup] = useState(false);

  const handleTemplateSelect = async (template: SpeakingTemplate) => {
    if (isSessionActive) return;

    try {
      setIsSessionActive(true);
      setSelectedTemplate(template);
      setShowSetup(true);
    } catch (error) {
      console.error('Error initializing session:', error);
    }
  };

  const handleSessionStart = (duration: number) => {
    setSelectedDuration(duration);
    setIsSessionActive(true);
    setShowSetup(false);
  };

  const handleSessionEnd = (result: SessionResult) => {
    setSessionResults(prev => [...prev, result]);
    setIsSessionActive(false);
    setSelectedTemplate(null);
    // Save results to database here
  };

  const [templates, setTemplates] = useState<SpeakingTemplate[]>([
    {
      id: 'template1',
      title: 'IELTS Speaking Part 1',
      titleVi: 'IELTS Nói Phần 1',
      titleEn: 'IELTS Speaking Part 1',
      description: 'Practice for IELTS Speaking Part 1 - Introduction and Interview',
      descriptionVi: 'Luyện tập IELTS Speaking Phần 1 - Giới thiệu và Phỏng vấn',
      descriptionEn: 'Practice for IELTS Speaking Part 1 - Introduction and Interview',
      part: 'PART1',
      systemPrompt: 'You are an IELTS examiner conducting Part 1 of the speaking test. Ask questions about familiar topics.',
      taskType: 'task1',
      level: 'B2',
      targetBand: 7.0,
      criteria: ['task_response', 'coherence_cohesion', 'lexical_resource', 'grammatical_range']
    },
    {
      id: 'template2',
      title: 'IELTS Speaking Part 2',
      titleVi: 'IELTS Nói Phần 2',
      titleEn: 'IELTS Speaking Part 2',
      description: 'Practice for IELTS Speaking Part 2 - Individual Long Turn',
      descriptionVi: 'Luyện tập IELTS Speaking Phần 2 - Nói độc thoại',
      descriptionEn: 'Practice for IELTS Speaking Part 2 - Individual Long Turn',
      part: 'PART2',
      systemPrompt: 'You are an IELTS examiner conducting Part 2 of the speaking test. Give a cue card topic and evaluate the response.',
      taskType: 'task2',
      level: 'B2',
      targetBand: 7.0,
      criteria: ['task_response', 'coherence_cohesion', 'lexical_resource', 'grammatical_range']
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto bg-white shadow-lg sticky top-0 z-10">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`flex-1 min-w-[160px] p-6 flex flex-col items-center justify-center gap-2 transition-all hover:bg-gray-50 ${
              activeTab === tab.id 
                ? 'border-b-2 border-blue-500 bg-blue-50'
                : 'border-b-2 border-transparent'
            }`}
            onClick={() => {
              setActiveTab(tab.id);
              setSelectedTemplate(null);
              setShowSetup(false);
            }}
          >
            <span className="text-2xl">{tab.icon}</span>
            <div className="text-center">
              <div className="font-bold tracking-wide">{tab.label}</div>
              <div className="text-sm text-gray-600 tracking-wider">{tab.subLabel}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isSessionActive ? (
          <PracticeSession 
            template={selectedTemplate!}
            duration={selectedDuration}
            onSessionEnd={handleSessionEnd}
          />
        ) : showSetup ? (
          <SessionSetup 
            template={selectedTemplate!}
            onStart={handleSessionStart}
          />
        ) : (
          <div>
            {/* Template Grid Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {tabs.find(t => t.id === activeTab)?.label} {tabs.find(t => t.id === activeTab)?.subLabel}
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                {tabs.find(t => t.id === activeTab)?.description}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {tabs.find(t => t.id === activeTab)?.supportText}
              </p>
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {templates
                .filter(template => template.part.toLowerCase() === activeTab.toLowerCase())
                .map((template: SpeakingTemplate) => (
                  <div
                    key={template.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{template.title}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                          Band {template.targetBand}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{template.description}</p>
                      {template.supportText && (
                        <p className="text-sm text-gray-500 mb-4">{template.supportText}</p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {template.tags?.map(tag => (
                          <span 
                            key={tag} 
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        {activeTab === 'metrics' && (
          <MetricsDisplay results={sessionResults} />
        )}
      </div>
    </div>
  );
};

const part1Templates = [
  {
    id: 'home',
    title: 'Home & Accommodation',
    description: 'Discuss your home, living arrangements, and preferences',
    targetBand: 6,
    tags: ['home', 'living', 'daily life'],
    supportText: 'Nơi ở và điều kiện sinh sống',
    systemPrompt: 'Let\'s begin Part 1 of your IELTS Speaking practice. I\'ll ask you some questions about familiar topics. Remember to give natural, detailed responses.'
  },
  {
    id: 'work',
    title: 'Work & Studies',
    description: 'Talk about your job, studies, and future plans',
    targetBand: 6,
    tags: ['work', 'education', 'career'],
    supportText: 'Công việc và học tập',
    systemPrompt: 'Let\'s begin Part 1 of your IELTS Speaking practice. I\'ll ask you some questions about familiar topics. Remember to give natural, detailed responses.'
  },
  {
    id: 'hobbies',
    title: 'Hobbies & Free Time',
    description: 'Share your interests, hobbies, and leisure activities',
    targetBand: 6,
    tags: ['hobbies', 'interests', 'free time'],
    supportText: 'Sở thích và thói gian rảnh',
    systemPrompt: 'Let\'s begin Part 1 of your IELTS Speaking practice. I\'ll ask you some questions about familiar topics. Remember to give natural, detailed responses.'
  }
];

const part2Templates = [
  {
    id: 'person',
    category: 'people',
    title: 'Describe a Person',
    description: 'Talk about someone important in your life',
    targetBand: 7,
    tags: ['people', 'relationships', 'character'],
    supportText: 'Mô tả về một người',
    systemPrompt: 'This is Part 2 of your IELTS Speaking practice. I\'ll give you a topic card, and you\'ll have one minute to prepare before speaking for 1-2 minutes.'
  },
  {
    id: 'place',
    category: 'places',
    title: 'Describe a Place',
    description: 'Discuss a memorable location you have visited',
    targetBand: 7,
    tags: ['places', 'travel', 'experiences'],
    supportText: 'Mô tả về một địa điểm',
    systemPrompt: 'This is Part 2 of your IELTS Speaking practice. I\'ll give you a topic card, and you\'ll have one minute to prepare before speaking for 1-2 minutes.'
  },
  {
    id: 'object',
    category: 'objects',
    title: 'Describe an Object',
    description: 'Talk about an important possession',
    targetBand: 7,
    tags: ['objects', 'possessions', 'items'],
    supportText: 'Mô tả về một vật dụng',
    systemPrompt: 'This is Part 2 of your IELTS Speaking practice. I\'ll give you a topic card, and you\'ll have one minute to prepare before speaking for 1-2 minutes.'
  }
];

const part3Templates = [
  {
    id: 'education',
    title: 'Education Systems',
    description: 'Discuss modern education and its challenges',
    targetBand: 8,
    tags: ['education', 'society', 'development'],
    supportText: 'Hệ thống giáo dục',
    systemPrompt: 'We\'re moving on to Part 3. I\'ll ask you more abstract questions about general topics. Try to develop your answers with examples and explanations.'
  },
  {
    id: 'technology',
    title: 'Technology & Society',
    description: 'Analyze the impact of technology on modern life',
    targetBand: 8,
    tags: ['technology', 'society', 'change'],
    supportText: 'Công nghệ và xã hội',
    systemPrompt: 'We\'re moving on to Part 3. I\'ll ask you more abstract questions about general topics. Try to develop your answers with examples and explanations.'
  }
];

export default SpeakingPage;
