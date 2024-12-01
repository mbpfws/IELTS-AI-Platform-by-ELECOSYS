'use client';

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ieltsGeminiService } from '@/services/ieltsGeminiService';
import { part1Templates } from '@/data/speakingTemplates/part1';
import { part2Templates } from '@/data/speakingTemplates/part2';
import { part3Templates } from '@/data/speakingTemplates/part3';
import { tutoringTemplates } from '@/data/speakingTemplates/tutoring';
import ChatInterface from "@/components/ChatInterface"; 
import { 
  Settings, User, Clock, Send, Mic, MessageSquare, Timer, 
  PauseCircle, PlayCircle, StopCircle, Save, X 
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { debounce } from 'lodash';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

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

interface Template {
  id: string;
  title: string;
  titleVi?: string;
  description: string;
  descriptionVi?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  targetBand: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  prompt: string;
  category: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Metrics {
  fluency: number;
  lexical: number;
  grammar: number;
  pronunciation: number;
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
  const defaultTemplates: Template[] = [];
  const [templates, setTemplates] = useState<Template[]>(defaultTemplates);

  // Add error handling for template imports
  const safeTemplates = {
    part1: Array.isArray(part1Templates) ? part1Templates : defaultTemplates,
    part2: Array.isArray(part2Templates) ? part2Templates : defaultTemplates,
    part3: Array.isArray(part3Templates) ? part3Templates : defaultTemplates,
    tutoring: Array.isArray(tutoringTemplates) ? tutoringTemplates : defaultTemplates,
  };

  console.log('Templates:', safeTemplates);

  const [selectedTab, setSelectedTab] = useState('part1');

  // Filter states
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedBand, setSelectedBand] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Template selection and session states
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false); 
  const [sessionDuration, setSessionDuration] = useState(15);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [userName, setUserName] = useState('');

  // Chat states
  const [messages, setMessages] = useState<Message[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({
    fluency: 0,
    lexical: 0,
    grammar: 0,
    pronunciation: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Audio states
  const [audioState, setAudioState] = useState<'idle' | 'recording' | 'paused'>('idle');
  const [processingAudio, setProcessingAudio] = useState(false);
  const [inputMode, setInputMode] = useState<'audio' | 'text'>('audio');
  const [textMessage, setTextMessage] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Filtered templates
  const filteredTemplates = useMemo(() => {
    return safeTemplates.part1.filter((template) => {
      const levelMatch = selectedLevel === 'all' || template.level === selectedLevel;
      const bandMatch = selectedBand === 'all' || template.targetBand.toString() === selectedBand;
      const difficultyMatch = selectedDifficulty === 'all' || template.difficulty === selectedDifficulty;
      return levelMatch && bandMatch && difficultyMatch;
    });
  }, [selectedLevel, selectedBand, selectedDifficulty]);

  // New state for enhanced features
  const [notes, setNotes] = useState<Note[]>([]);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [newNote, setNewNote] = useState('');

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

  // Template selection
  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setIsSessionDialogOpen(true);
  };

  // Session management
  const startSession = async () => {
    if (!selectedTemplate || !userName.trim()) {
      console.log('Missing required fields:', { selectedTemplate, userName });
      return;
    }

    try {
      setIsLoading(true);
      console.log('Starting session with:', {
        userName: userName.trim(),
        template: selectedTemplate,
        duration: sessionDuration
      });

      const sessionConfig = {
        userName: userName.trim(),
        templatePrompt: selectedTemplate.prompt,
        duration: sessionDuration,
      };

      console.log('Initializing session with config:', sessionConfig);
      const session = await ieltsGeminiService.initializeSession(sessionConfig);
      
      if (session) {
        console.log('Session initialized:', session);
        setTimeRemaining(sessionDuration * 60);
        setIsSessionActive(true);
        setIsSessionDialogOpen(false);
        setMessages([{
          role: 'assistant',
          content: session.message,
        }]);
        if (session.metrics) {
          setMetrics(session.metrics);
        }
      } else {
        console.error('Session initialization failed - no session data returned');
      }
    } catch (error) {
      console.error('Failed to start session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Timer effect
  useEffect(() => {
    if (isSessionActive && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isSessionActive, timeRemaining]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (isSessionActive) {
        handleEndSession();
      }
    };
  }, []);

  // Audio recording handlers
  const startRecording = async () => {
    try {
      setAudioState('recording');
      await ieltsGeminiService.startRecording();
    } catch (error) {
      console.error('Failed to start recording:', error);
      setAudioState('idle');
    }
  };

  const stopRecording = async () => {
    try {
      setAudioState('idle');
      setProcessingAudio(true);
      const audioData = await ieltsGeminiService.stopRecording();
      if (audioData) {
        await handleSendMessage(audioData);
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
    } finally {
      setProcessingAudio(false);
    }
  };

  const pauseRecording = () => {
    setAudioState('paused');
    ieltsGeminiService.pauseRecording();
  };

  const resumeRecording = () => {
    setAudioState('recording');
    ieltsGeminiService.resumeRecording();
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

  // Handle send message
  const handleSendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      const userMessage: Message = {
        role: 'user',
        content,
      };
      setMessages(prev => [...prev, userMessage]);

      const response = await ieltsGeminiService.sendMessage(content);
      if (response) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: response.message,
        };
        setMessages(prev => [...prev, assistantMessage]);
        if (response.metrics) {
          setMetrics(response.metrics);
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle end session
  const handleEndSession = () => {
    ieltsGeminiService.endSession();
    setIsSessionActive(false);
    setSelectedTemplate(null);
    setMessages([]);
    setMetrics({
      fluency: 0,
      lexical: 0,
      grammar: 0,
      pronunciation: 0,
    });
  };

  // Toggle input mode
  const toggleInputMode = () => {
    setInputMode(prev => prev === 'audio' ? 'text' : 'audio');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-1">
        <div className="w-64 p-4 border-r">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Cấp độ</Label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn cấp độ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="Beginner">Cơ bản</SelectItem>
                  <SelectItem value="Intermediate">Trung cấp</SelectItem>
                  <SelectItem value="Advanced">Nâng cao</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Band mục tiêu</Label>
              <Select value={selectedBand} onValueChange={setSelectedBand}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn band mục tiêu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="5.0">Band 5.0</SelectItem>
                  <SelectItem value="5.5">Band 5.5</SelectItem>
                  <SelectItem value="6.0">Band 6.0</SelectItem>
                  <SelectItem value="6.5">Band 6.5</SelectItem>
                  <SelectItem value="7.0">Band 7.0</SelectItem>
                  <SelectItem value="7.5">Band 7.5</SelectItem>
                  <SelectItem value="8.0">Band 8.0</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Độ khó</Label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn độ khó" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="easy">Dễ</SelectItem>
                  <SelectItem value="medium">Trung bình</SelectItem>
                  <SelectItem value="hard">Khó</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="max-w-[1200px] mx-auto p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Luyện nói IELTS</h1>
              <p className="text-muted-foreground">Chọn một mẫu để bắt đầu luyện tập kỹ năng nói của bạn</p>
            </div>

            <Tabs defaultValue="part1" className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="part1">Phần 1</TabsTrigger>
                <TabsTrigger value="part2">Phần 2</TabsTrigger>
                <TabsTrigger value="part3">Phần 3</TabsTrigger>
                <TabsTrigger value="tutoring">Gia sư</TabsTrigger>
              </TabsList>

              <TabsContent value="part1" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTemplates.map((template) => (
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
        </div>
      </div>

      {selectedTemplate && (
        <Dialog open={isSessionDialogOpen} onOpenChange={setIsSessionDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Bắt đầu phiên mới</DialogTitle>
              <DialogDescription>
                Vui lòng nhập tên của bạn và chọn thời lượng cho phiên luyện tập
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Tên của bạn</Label>
                <Input
                  placeholder="Nhập tên của bạn"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Thời lượng phiên (phút)</Label>
                <Slider
                  value={[sessionDuration]}
                  onValueChange={(value) => setSessionDuration(value[0])}
                  min={5}
                  max={30}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 phút</span>
                  <span>30 phút</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={startSession}
                disabled={!userName.trim()}
              >
                Bắt đầu phiên
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {isSessionActive && (
        <div className="flex-1 relative">
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            metrics={metrics}
            sessionDuration={sessionDuration}
            isSessionActive={isSessionActive}
            onEndSession={handleEndSession}
            inputMode={inputMode}
            audioState={audioState}
            textMessage={textMessage}
            onTextMessageChange={setTextMessage}
            onToggleInputMode={toggleInputMode}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
            onPauseRecording={pauseRecording}
            onResumeRecording={resumeRecording}
            processingAudio={processingAudio}
            timeRemaining={timeRemaining}
          />
        </div>
      )}
    </div>
  );
};

export default SpeakingPage;
