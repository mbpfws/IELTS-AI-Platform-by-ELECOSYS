'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, User, Clock, Send, Mic, MessageSquare, Timer } from 'lucide-react';
import { useTheme } from 'next-themes';
import { databaseService } from '@/services/databaseService';
import { ieltsGeminiService } from '@/services/ieltsGeminiService';

const TABS = [
  { 
    id: 'part1', 
    label: 'Part 1', 
    description: 'Introduction & Interview',
    color: 'from-blue-500/50 to-cyan-500/50'
  },
  { 
    id: 'part2', 
    label: 'Part 2', 
    description: 'Individual Long Turn',
    color: 'from-green-500/50 to-emerald-500/50'
  },
  { 
    id: 'part3', 
    label: 'Part 3', 
    description: 'Two-way Discussion',
    color: 'from-purple-500/50 to-pink-500/50'
  },
  { 
    id: 'tutoring', 
    label: 'Tutoring', 
    description: 'Personalized Learning',
    color: 'from-orange-500/50 to-red-500/50'
  }
];

const SpeakingPage: React.FC = () => {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState(TABS[0].id);
  const [templates, setTemplates] = useState<Record<string, any[]>>({});
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(15);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true);
        const allTemplates = await databaseService.getTemplates();
        
        // Organize templates by part
        const organizedTemplates = allTemplates.reduce((acc: Record<string, any[]>, template) => {
          // Extract part number from type (e.g., "part1" -> "part1")
          const part = template.type || 'part1'; // Default to part1 if type is missing
          if (!acc[part]) acc[part] = [];
          acc[part].push({
            ...template,
            // Ensure all required fields are present
            id: template.id,
            title_en: template.title_en || template.title || 'Untitled',
            title_vi: template.title_vi || template.title || 'Chưa có tiêu đề',
            description_en: template.description_en || template.description || '',
            description_vi: template.description_vi || template.description || '',
            level: template.level || 'beginner',
            target_band: template.target_band || 6.0,
          });
          return acc;
        }, {});
        
        setTemplates(organizedTemplates);
        console.log('Loaded templates:', organizedTemplates); // Debug log
      } catch (error) {
        console.error('Error loading templates:', error);
        setError('Failed to load templates. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };
    loadTemplates();
  }, []);

  const handleTemplateSelect = (template: any) => {
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
      setError(null); // Clear any previous errors

      // Validate required fields
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

      // Create the session
      const sessionResponse = await databaseService.createSession({
        templateId: selectedTemplate.id,
        duration: sessionDuration
      });

      console.log('Session created:', sessionResponse);

      // Validate session response
      if (!sessionResponse?.id) {
        throw new Error('Failed to create session - invalid session ID');
      }
      if (!sessionResponse?.template?.parts?.length) {
        throw new Error('Invalid template data - no parts found');
      }

      // Get the initial prompt
      const prompt = `Part ${sessionResponse.template.parts[0].part}: ${sessionResponse.template.parts[0].prompt}`;
      console.log('Using prompt:', prompt);
      
      // Initialize Gemini service
      const geminiResponse = await ieltsGeminiService.initializeSession({
        userName,
        templatePrompt: prompt,
        sessionId: sessionResponse.id,
        duration: sessionDuration
      });

      console.log('Session initialized with Gemini:', geminiResponse);

      if (!geminiResponse?.message) {
        throw new Error('Failed to get initial response from AI tutor');
      }

      // Update UI state
      setMessages([{ role: 'assistant', content: geminiResponse.message }]);
      setIsSessionActive(true);
      setIsSessionDialogOpen(false);
      
    } catch (error) {
      console.error('Session initialization failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to start session. Please try again.');
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

      const response = await ieltsGeminiService.processMessage(content, isAudio);
      const assistantMessage = { role: 'assistant', content: response.message };
      
      setMessages(prev => [...prev, assistantMessage]);
      
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

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <Sheet>
        <SheetContent side="left" className="w-[300px] p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Session Settings</h2>
            </div>
            {metrics && (
              <div className="p-4">
                <h3 className="text-sm font-medium mb-2">Performance Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Fluency</span>
                      <span>{metrics.fluency.toFixed(1)}</span>
                    </div>
                    <Progress value={metrics.fluency * 10} className="h-2" />
                  </div>
                  {/* Add other metrics similarly */}
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Template Selection */}
          {!isSessionActive && (
            <div className="p-6 space-y-6">
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="grid w-full grid-cols-4 gap-4">
                  {TABS.map(tab => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className={`relative overflow-hidden rounded-lg p-4 transition-all ${
                        selectedTab === tab.id ? 'bg-gradient-to-br ' + tab.color : ''
                      }`}
                    >
                      <div className="relative z-10">
                        <h3 className="font-semibold">{tab.label}</h3>
                        <p className="text-sm opacity-80">{tab.description}</p>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {TABS.map(tab => (
                  <TabsContent key={tab.id} value={tab.id} className="mt-6">
                    <ScrollArea className="h-[calc(100vh-200px)]">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        {templates[tab.id]?.map(template => (
                          <Card
                            key={template.id}
                            className={`relative overflow-hidden cursor-pointer transition-all hover:scale-105 ${
                              selectedTemplate?.id === template.id
                                ? 'ring-2 ring-primary'
                                : ''
                            }`}
                            onClick={() => handleTemplateSelect(template)}
                          >
                            <CardHeader>
                              <CardTitle>
                                <span className="block text-lg">{template.title_en}</span>
                                <span className="block text-sm opacity-80">{template.title_vi}</span>
                              </CardTitle>
                              <div className="flex gap-2 mt-2">
                                <Badge variant="outline">Band {template.target_band}</Badge>
                                <Badge>{template.level}</Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm">{template.description_en}</p>
                              <p className="text-sm opacity-80 mt-1">{template.description_vi}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                ))}
              </Tabs>

              {selectedTemplate && (
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    onClick={() => setIsSessionDialogOpen(true)}
                    className="px-8"
                  >
                    Start Practice
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Active Session */}
          {isSessionActive && (
            <div className="flex-1 flex flex-col">
              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        message.role === 'assistant' ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.role === 'assistant'
                            ? 'bg-muted'
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant={isRecording ? 'destructive' : 'outline'}
                    size="icon"
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  {/* Add text input and send button */}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Session Configuration Dialog */}
      <Dialog open={isSessionDialogOpen} onOpenChange={setIsSessionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configure Session</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Session Duration (minutes)</label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[sessionDuration]}
                  onValueChange={([value]) => setSessionDuration(value)}
                  min={5}
                  max={120}
                  step={5}
                  className="flex-1"
                />
                <span className="w-12 text-right">{sessionDuration}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setIsSessionDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={startSession} disabled={!userName || isLoading}>
              {isLoading ? 'Starting...' : 'Start Session'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Error Message */}
      {error && (
        <div className="fixed top-0 left-0 w-full p-4 bg-red-500 text-white">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default SpeakingPage;
