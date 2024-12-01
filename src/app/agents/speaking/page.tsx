'use client';

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Settings, User, Clock, Send, Mic, MessageSquare, Timer, 
  PauseCircle, PlayCircle, StopCircle, Save, X, Search 
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { ieltsGeminiService } from '@/services/ieltsGeminiService';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { debounce } from 'lodash';
import { part1Templates } from '@/data/speakingTemplates/part1';
import { part2Templates } from '@/data/speakingTemplates/part2';
import { part3Templates } from '@/data/speakingTemplates/part3';
import { tutoringLessons } from '@/data/speakingTemplates/tutoring';

interface Note {
  id: string;
  content: string;
  timestamp: number;
}

interface SessionMetrics {
  fluency: number;
  lexical: number;
  grammar: number;
  pronunciation: number;
}

interface AudioRecorderState {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
  audioUrl: string | null;
}

interface SpeakingTemplate {
  id: string;
  title_en: string;
  title_vi: string;
  description_en: string;
  description_vi: string;
  level: string;
  target_band: number;
  type: string;
}

interface TemplateFilters {
  category?: string;
  level?: string;
  targetBand?: number;
  difficulty?: string;
  tags?: string[];
}

interface SortConfig {
  field: SortOption;
  direction: 'asc' | 'desc';
}

type SortOption = 'targetBand' | 'level' | 'difficulty';

const SpeakingPage: React.FC = () => {
  const { theme } = useTheme();
  
  // Initialize templates with default empty arrays
  const defaultTemplates: SpeakingTemplate[] = [];
  const [templates, setTemplates] = useState<SpeakingTemplate[]>(defaultTemplates);

  // Add error handling for template imports
  const safeTemplates = {
    part1: Array.isArray(part1Templates) ? part1Templates : defaultTemplates,
    part2: Array.isArray(part2Templates) ? part2Templates : defaultTemplates,
    part3: Array.isArray(part3Templates) ? part3Templates : defaultTemplates,
    tutoring: Array.isArray(tutoringLessons) ? tutoringLessons : defaultTemplates,
  };

  console.log('Templates:', safeTemplates);

  const [selectedTab, setSelectedTab] = useState('part1');
  const [selectedTemplate, setSelectedTemplate] = useState<SpeakingTemplate | null>(null);
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(15);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<SessionMetrics>({
    fluency: 0,
    lexical: 0,
    grammar: 0,
    pronunciation: 0
  });
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // New state for enhanced features
  const [notes, setNotes] = useState<Note[]>([]);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [inputMode, setInputMode] = useState<'audio' | 'text'>('audio');
  const [audioState, setAudioState] = useState<AudioRecorderState>({
    isRecording: false,
    isPaused: false,
    duration: 0,
    audioUrl: null
  });
  const [textMessage, setTextMessage] = useState('');
  const [processingAudio, setProcessingAudio] = useState(false);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Add new state for filtering and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<TemplateFilters>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'targetBand',
    direction: 'asc'
  });

  // Filter options
  const filterOptions = {
    categories: ['Housing', 'Lifestyle', 'Modern Life', 'Personal Interests', 'Places', 'Family', 'Travel'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    targetBands: [5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0],
    difficulties: ['easy', 'medium', 'hard']
  };

  // Active filters display
  const ActiveFilters = () => {
    const activeFilters = Object.entries(filters).filter(([_, value]) => 
      value !== undefined && (Array.isArray(value) ? value.length > 0 : true)
    );

    if (activeFilters.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 my-2">
        {activeFilters.map(([key, value]) => (
          <Badge 
            key={key}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {key}: {Array.isArray(value) ? value.join(', ') : value}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => handleFilterChange({ [key]: undefined })}
            />
          </Badge>
        ))}
        {activeFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilters({})}
          >
            Clear all
          </Button>
        )}
      </div>
    );
  };

  // Debounce search input
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/templates');
        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }
        const data = await response.json();
        setTemplates(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load templates');
        console.error('Error fetching templates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // Define tabs configuration
  const tabs = [
    {
      id: 'part1',
      label: 'Part 1',
      templates: safeTemplates.part1,
      description: 'Introduction and Interview'
    },
    {
      id: 'part2',
      label: 'Part 2',
      templates: safeTemplates.part2,
      description: 'Individual Long Turn'
    },
    {
      id: 'part3',
      label: 'Part 3',
      templates: safeTemplates.part3,
      description: 'Two-way Discussion'
    },
    {
      id: 'tutoring',
      label: 'Tutoring',
      templates: safeTemplates.tutoring,
      description: 'Tutoring Lessons'
    }
  ];

  // Update templates when tab changes
  useEffect(() => {
    const currentTemplates = tabs.find(tab => tab.id === selectedTab)?.templates || [];
    setTemplates(currentTemplates);
  }, [selectedTab]);

  // Filter and sort templates
  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = searchQuery 
        ? template.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.description_en.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesCategory = filters.category 
        ? template.category === filters.category 
        : true;

      const matchesLevel = filters.level 
        ? template.level === filters.level 
        : true;

      const matchesTargetBand = filters.targetBand 
        ? template.target_band === filters.targetBand 
        : true;

      const matchesDifficulty = filters.difficulty 
        ? template.difficulty === filters.difficulty 
        : true;

      const matchesTags = filters.tags && filters.tags.length > 0
        ? filters.tags.every(tag => template.tags?.includes(tag))
        : true;

      return matchesSearch && matchesCategory && matchesLevel && 
             matchesTargetBand && matchesDifficulty && matchesTags;
    });
  }, [templates, searchQuery, filters]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (newFilters: Partial<TemplateFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Handle sort change
  const handleSortChange = (field: SortOption) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Timer effect
  useEffect(() => {
    if (isSessionActive && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // End session when time is up
            handleEndSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [isSessionActive, timeRemaining]);

  // Audio recording handlers
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioState(prev => ({
          ...prev,
          audioUrl,
          isRecording: false
        }));
      };

      mediaRecorder.start();
      setAudioState(prev => ({
        ...prev,
        isRecording: true,
        isPaused: false
      }));
    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Failed to start recording. Please check your microphone permissions.');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setAudioState(prev => ({ ...prev, isPaused: true }));
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setAudioState(prev => ({ ...prev, isPaused: false }));
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  // Note management
  const addNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        content: newNote.trim(),
        timestamp: Date.now()
      };
      setNotes(prev => [...prev, note]);
      setNewNote('');
      ieltsGeminiService.addNote(note.content);
    }
  };

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const handleTemplateSelect = (template: SpeakingTemplate) => {
    if (!template?.id) {
      console.error('Invalid template:', template);
      setError('Invalid template selected');
      return;
    }
    console.log('Selected template:', template);
    setSelectedTemplate(template);
    setIsSessionDialogOpen(true);
  };

  const startSession = async () => {
    try {
      setIsLoading(true);
      
      // Stop any ongoing recording
      if (audioState.isRecording) {
        stopRecording();
      }

      if (!selectedTemplate?.id) {
        throw new Error('Please select a valid template to start the session');
      }
      if (!userName.trim()) {
        throw new Error('Please enter your name to start the session');
      }

      console.log('Starting session with template:', {
        id: selectedTemplate.id,
        title: selectedTemplate.title_en || selectedTemplate.title,
        duration: sessionDuration
      });

      const sessionResponse = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          templateId: selectedTemplate.id,
          duration: sessionDuration
        })
      });

      if (!sessionResponse.ok) {
        throw new Error('Failed to create session');
      }

      const sessionData = await sessionResponse.json();

      if (!sessionData?.id || !sessionData?.template?.parts?.length) {
        throw new Error('Failed to create session - invalid session data');
      }

      const prompt = `Part ${sessionData.template.parts[0].part}: ${sessionData.template.parts[0].prompt}`;
      
      const geminiResponse = await ieltsGeminiService.initializeSession({
        userName,
        templatePrompt: prompt,
        sessionId: sessionData.id,
        duration: sessionDuration
      });

      if (!geminiResponse?.message) {
        throw new Error('Failed to get initial response from AI tutor');
      }

      // Initialize session state
      setMessages([{ role: 'assistant', content: geminiResponse.message }]);
      setTimeRemaining(sessionDuration * 60);
      setMetrics(geminiResponse.metrics || {
        fluency: 0,
        lexical: 0,
        grammar: 0,
        pronunciation: 0
      });
      setIsSessionActive(true);
      setIsSessionDialogOpen(false);
      setNotes([]);
      
    } catch (error) {
      console.error('Session initialization failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to start session');
      setIsSessionActive(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (content: string, isAudio: boolean = false) => {
    try {
      setIsLoading(true);
      const userMessage = { role: 'user', content };
      setMessages(prev => [...prev, userMessage]);

      let response;
      if (isAudio && audioState.audioUrl) {
        const audioBlob = await fetch(audioState.audioUrl).then(r => r.blob());
        response = await ieltsGeminiService.processAudioResponse(audioBlob);
        
        // Clear audio state after sending
        setAudioState({
          isRecording: false,
          isPaused: false,
          duration: 0,
          audioUrl: null
        });
      } else {
        response = await ieltsGeminiService.processMessage(content);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response.message }]);
      
      if (response.metrics) {
        setMetrics(response.metrics);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndSession = async () => {
    try {
      setIsLoading(true);
      
      // Stop any ongoing recording
      if (audioState.isRecording) {
        stopRecording();
      }

      // Get final feedback
      const response = await ieltsGeminiService.endSession();
      
      // Add final message
      setMessages(prev => [...prev, { role: 'assistant', content: response.message }]);
      
      // Update final metrics
      if (response.metrics) {
        setMetrics(response.metrics);
      }

      // Clear session state
      setIsSessionActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setTimeRemaining(0);
      
    } catch (error) {
      console.error('Error ending session:', error);
      setError('Failed to end session properly. Your progress has been saved.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleInputMode = () => {
    if (audioState.isRecording) {
      stopRecording();
    }
    setInputMode(prev => prev === 'audio' ? 'text' : 'audio');
  };

  return (
    <div className="flex min-h-screen bg-background">
      {!isSessionActive ? (
        // Template Selection Screen
        <>
          <aside className="w-80 p-6 bg-slate-50 dark:bg-slate-900 border-r border-border/40 shadow-[inset_-1px_0_0_rgba(0,0,0,0.1)] dark:shadow-[inset_-1px_0_0_rgba(255,255,255,0.1)] sticky top-0 h-screen overflow-y-auto">
            {/* Search Section */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Search</h3>
              <div className="relative">
                <Input
                  placeholder="Search templates..."
                  onChange={handleSearchChange}
                  className="w-full pl-10 bg-background/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Filters Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Filters</h3>
              <div className="space-y-3">
                <Select 
                  onValueChange={(value) => handleFilterChange({ category: value === "all" ? undefined : value })}
                >
                  <SelectTrigger className="w-full bg-background/50 backdrop-blur-sm border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {filterOptions.categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select 
                  onValueChange={(value) => handleFilterChange({ level: value === "all" ? undefined : value })}
                >
                  <SelectTrigger className="w-full bg-background/50 backdrop-blur-sm border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {filterOptions.levels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select 
                  onValueChange={(value) => handleFilterChange({ targetBand: value === "all" ? undefined : parseFloat(value) })}
                >
                  <SelectTrigger className="w-full bg-background/50 backdrop-blur-sm border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="All Bands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Bands</SelectItem>
                    {filterOptions.targetBands.map((band) => (
                      <SelectItem key={band} value={band.toString()}>Band {band}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select 
                  onValueChange={(value) => handleFilterChange({ difficulty: value === "all" ? undefined : value })}
                >
                  <SelectTrigger className="w-full bg-background/50 backdrop-blur-sm border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="All Difficulties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    {filterOptions.difficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Sort Section */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Sort by</h3>
              <div className="flex flex-col gap-2">
                <Button
                  variant={sortConfig.field === 'targetBand' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => handleSortChange('targetBand')}
                  className="justify-start hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <span className="flex-1 text-left">Target Band</span>
                  {sortConfig.field === 'targetBand' && (
                    <span className="text-xs">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </Button>
                <Button
                  variant={sortConfig.field === 'level' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => handleSortChange('level')}
                  className="justify-start hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <span className="flex-1 text-left">Level</span>
                  {sortConfig.field === 'level' && (
                    <span className="text-xs">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </Button>
                <Button
                  variant={sortConfig.field === 'difficulty' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => handleSortChange('difficulty')}
                  className="justify-start hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <span className="flex-1 text-left">Difficulty</span>
                  {sortConfig.field === 'difficulty' && (
                    <span className="text-xs">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            <div className="space-y-2">
              <ActiveFilters />
            </div>
          </aside>

          <main className="flex-1 p-6">
            <div className="max-w-[1200px] mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Luyện nói IELTS</h1>
                <p className="text-muted-foreground">Chọn một mẫu để bắt đầu luyện tập kỹ năng nói của bạn</p>
              </div>

              {/* Tabs and Content */}
              <Tabs defaultValue="part1" className="w-full">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="part1">Phần 1</TabsTrigger>
                  <TabsTrigger value="part2">Phần 2</TabsTrigger>
                  <TabsTrigger value="part3">Phần 3</TabsTrigger>
                  <TabsTrigger value="tutoring">Gia sư</TabsTrigger>
                </TabsList>

                <TabsContent value="part1" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {safeTemplates.part1.map((template) => (
                      <Card 
                        key={template.id}
                        className="flex flex-col transition-all hover:shadow-lg hover:border-primary group"
                      >
                        <CardHeader className="flex flex-col gap-2">
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {template.titleVi || template.title}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">
                              {template.level === 'Beginner' ? 'Cơ bản' :
                               template.level === 'Intermediate' ? 'Trung cấp' :
                               template.level === 'Advanced' ? 'Nâng cao' : template.level}
                            </Badge>
                            <Badge variant="secondary">Band {template.targetBand}</Badge>
                            {template.difficulty && (
                              <Badge variant="outline" className="capitalize">
                                {template.difficulty === 'easy' ? 'Dễ' :
                                 template.difficulty === 'medium' ? 'Trung bình' :
                                 template.difficulty === 'hard' ? 'Khó' : template.difficulty}
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {template.descriptionVi || template.description}
                          </p>
                        </CardContent>
                        <CardFooter className="mt-auto pt-4">
                          <Button 
                            onClick={() => handleTemplateSelect(template)} 
                            className="w-full bg-gradient-to-br from-teal-600 to-teal-800 hover:from-teal-500 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                          >
                            Bắt đầu luyện tập
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="part2" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {safeTemplates.part2.map((template) => (
                      <Card 
                        key={template.id}
                        className="flex flex-col transition-all hover:shadow-lg hover:border-primary group"
                      >
                        <CardHeader className="flex flex-col gap-2">
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {template.titleVi || template.title}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">
                              {template.level === 'Beginner' ? 'Cơ bản' :
                               template.level === 'Intermediate' ? 'Trung cấp' :
                               template.level === 'Advanced' ? 'Nâng cao' : template.level}
                            </Badge>
                            <Badge variant="secondary">Band {template.targetBand}</Badge>
                            {template.difficulty && (
                              <Badge variant="outline" className="capitalize">
                                {template.difficulty === 'easy' ? 'Dễ' :
                                 template.difficulty === 'medium' ? 'Trung bình' :
                                 template.difficulty === 'hard' ? 'Khó' : template.difficulty}
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {template.descriptionVi || template.description}
                          </p>
                        </CardContent>
                        <CardFooter className="mt-auto pt-4">
                          <Button 
                            onClick={() => handleTemplateSelect(template)} 
                            className="w-full bg-gradient-to-br from-teal-600 to-teal-800 hover:from-teal-500 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                          >
                            Bắt đầu luyện tập
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="part3" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {safeTemplates.part3.map((template) => (
                      <Card 
                        key={template.id}
                        className="flex flex-col transition-all hover:shadow-lg hover:border-primary group"
                      >
                        <CardHeader className="flex flex-col gap-2">
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {template.titleVi || template.title}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">
                              {template.level === 'Beginner' ? 'Cơ bản' :
                               template.level === 'Intermediate' ? 'Trung cấp' :
                               template.level === 'Advanced' ? 'Nâng cao' : template.level}
                            </Badge>
                            <Badge variant="secondary">Band {template.targetBand}</Badge>
                            {template.difficulty && (
                              <Badge variant="outline" className="capitalize">
                                {template.difficulty === 'easy' ? 'Dễ' :
                                 template.difficulty === 'medium' ? 'Trung bình' :
                                 template.difficulty === 'hard' ? 'Khó' : template.difficulty}
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {template.descriptionVi || template.description}
                          </p>
                        </CardContent>
                        <CardFooter className="mt-auto pt-4">
                          <Button 
                            onClick={() => handleTemplateSelect(template)} 
                            className="w-full bg-gradient-to-br from-teal-600 to-teal-800 hover:from-teal-500 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                          >
                            Bắt đầu luyện tập
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="tutoring" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {safeTemplates.tutoring.map((template) => (
                      <Card 
                        key={template.id}
                        className="flex flex-col transition-all hover:shadow-lg hover:border-primary group"
                      >
                        <CardHeader className="flex flex-col gap-2">
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {template.titleVi || template.title}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">
                              {template.level === 'Beginner' ? 'Cơ bản' :
                               template.level === 'Intermediate' ? 'Trung cấp' :
                               template.level === 'Advanced' ? 'Nâng cao' : template.level}
                            </Badge>
                            <Badge variant="secondary">Band {template.targetBand}</Badge>
                            {template.difficulty && (
                              <Badge variant="outline" className="capitalize">
                                {template.difficulty === 'easy' ? 'Dễ' :
                                 template.difficulty === 'medium' ? 'Trung bình' :
                                 template.difficulty === 'hard' ? 'Khó' : template.difficulty}
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {template.descriptionVi || template.description}
                          </p>
                        </CardContent>
                        <CardFooter className="mt-auto pt-4">
                          <Button 
                            onClick={() => handleTemplateSelect(template)} 
                            className="w-full bg-gradient-to-br from-teal-600 to-teal-800 hover:from-teal-500 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                          >
                            Bắt đầu luyện tập
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </>
      ) : (
        // Chat Screen
        <ChatInterface 
          messages={messages}
          metrics={metrics}
          timeRemaining={timeRemaining}
          inputMode={inputMode}
          audioState={audioState}
          textMessage={textMessage}
          isLoading={isLoading}
          onEndSession={handleEndSession}
          onToggleInputMode={toggleInputMode}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          onPauseRecording={pauseRecording}
          onResumeRecording={resumeRecording}
          onSendMessage={handleSendMessage}
          onTextMessageChange={setTextMessage}
        />
      )}

      {/* Session Setup Dialog */}
      <Dialog open={isSessionDialogOpen} onOpenChange={setIsSessionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bắt đầu phiên mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tên của bạn</label>
              <Input
                placeholder="Nhập tên của bạn"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Thời lượng phiên (phút)</label>
              <Slider
                value={[sessionDuration]}
                onValueChange={(value) => setSessionDuration(value[0])}
                min={5}
                max={30}
                step={5}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5 phút</span>
                <span>30 phút</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsSessionDialogOpen(false)}
            >
              Hủy bỏ
            </Button>
            <Button
              onClick={startSession}
              disabled={isLoading || !userName.trim()}
            >
              Bắt đầu phiên
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Session Practice Screen */}
      {isSessionActive && (
        <div className="flex-1 flex flex-col">
          {/* Session Header */}
          <div className="border-b border-border p-4 flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center space-x-4">
              <Badge 
                variant={timeRemaining < 60 ? "destructive" : "outline"} 
                className="text-sm animate-pulse"
              >
                <Timer className="h-4 w-4 mr-1" />
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </Badge>
              <Badge variant="outline" className="text-sm">
                <User className="h-4 w-4 mr-1" />
                {userName}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              {metrics && (
                <div className="grid grid-cols-2 gap-2">
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <span className="font-semibold">Fluency</span>
                    <Progress value={metrics.fluency * 10} className="w-16 h-2" />
                    <span>{metrics.fluency.toFixed(1)}</span>
                  </Badge>
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <span className="font-semibold">Lexical</span>
                    <Progress value={metrics.lexical * 10} className="w-16 h-2" />
                    <span>{metrics.lexical.toFixed(1)}</span>
                  </Badge>
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <span className="font-semibold">Grammar</span>
                    <Progress value={metrics.grammar * 10} className="w-16 h-2" />
                    <span>{metrics.grammar.toFixed(1)}</span>
                  </Badge>
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <span className="font-semibold">Pronunciation</span>
                    <Progress value={metrics.pronunciation * 10} className="w-16 h-2" />
                    <span>{metrics.pronunciation.toFixed(1)}</span>
                  </Badge>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleInputMode}
                  className="relative"
                >
                  {inputMode === 'audio' ? (
                    <>
                      <MessageSquare className="h-4 w-4" />
                      <span className="sr-only">Switch to text input</span>
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4" />
                      <span className="sr-only">Switch to audio input</span>
                    </>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsNotesOpen(true)}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="sr-only">Open notes</span>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleEndSession}
                >
                  Kết thúc phiên
                </Button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1">
            <div className="max-w-3xl mx-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`${message.role === 'assistant' ? 'bg-accent/50' : ''}`}>
                    <CardContent className="p-4">
                      <div 
                        className="prose prose-sm dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: message.role === 'assistant' 
                            ? DOMPurify.sanitize(marked.parse(message.content))
                            : message.content 
                        }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              {(isLoading || processingAudio) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center items-center space-x-2"
                >
                  <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-border p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-3xl mx-auto">
              {inputMode === 'audio' ? (
                <div className="flex items-center space-x-2">
                  {!audioState.isRecording ? (
                    <Button
                      onClick={startRecording}
                      disabled={isLoading || processingAudio}
                      className="w-full flex items-center justify-center"
                    >
                      <Mic className="h-4 w-4 mr-2" />
                      Bắt đầu ghi âm
                    </Button>
                  ) : (
                    <div className="w-full flex items-center space-x-2">
                      {audioState.isPaused ? (
                        <Button 
                          onClick={resumeRecording}
                          className="flex-1"
                          variant="outline"
                        >
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Tiếp tục
                        </Button>
                      ) : (
                        <Button 
                          onClick={pauseRecording}
                          className="flex-1"
                          variant="outline"
                        >
                          <PauseCircle className="h-4 w-4 mr-2" />
                          Tạm dừng
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={stopRecording}
                        className="flex-1"
                      >
                        <StopCircle className="h-4 w-4 mr-2" />
                        Dừng lại
                      </Button>
                      {audioState.duration > 0 && (
                        <span className="text-sm font-mono">
                          {Math.floor(audioState.duration / 60)}:{(audioState.duration % 60).toString().padStart(2, '0')}
                        </span>
                      )}
                    </div>
                  )}
                  {audioState.audioUrl && (
                    <div className="w-full flex items-center space-x-2">
                      <audio src={audioState.audioUrl} controls className="flex-1" />
                      <Button
                        onClick={() => {
                          setProcessingAudio(true);
                          handleSendMessage('', true).finally(() => {
                            setProcessingAudio(false);
                          });
                        }}
                        disabled={isLoading || processingAudio}
                        variant="default"
                      >
                        {processingAudio ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Input
                    placeholder="Nhập tin nhắn..."
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (textMessage.trim()) {
                          handleSendMessage(textMessage).then(() => {
                            setTextMessage('');
                          });
                        }
                      }
                    }}
                    disabled={isLoading}
                  />
                  <Button
                    onClick={() => {
                      if (textMessage.trim()) {
                        handleSendMessage(textMessage).then(() => {
                          setTextMessage('');
                        });
                      }
                    }}
                    disabled={isLoading || !textMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notes Sheet */}
      <Sheet open={isNotesOpen} onOpenChange={setIsNotesOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Ghi chú phiên</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <div className="flex space-x-2">
              <Textarea
                placeholder="Thêm ghi chú..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <Button onClick={addNote}>
                <Save className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-2">
                {notes.map((note) => (
                  <Card key={note.id}>
                    <CardContent className="p-4 flex justify-between items-start">
                      <div>
                        <p className="text-sm">{note.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(note.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNote(note.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>

      {/* Error Toast */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-destructive text-destructive-foreground p-4 rounded-lg shadow-lg"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default SpeakingPage;
