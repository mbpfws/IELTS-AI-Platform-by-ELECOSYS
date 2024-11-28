"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Message, SpeakingSession } from "@/types/speakingSession";
import { Template } from "@/types/template";
import { practiceService } from "@/services/practiceService";
import { speakingTemplates } from '@/data/speakingTemplates';
import SessionSidebar from "@/components/speaking/SessionSidebar";
import DefaultChat from "@/components/speaking/DefaultChat";
import AudioRecorder from "@/components/speaking/AudioRecorder";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SessionTimer } from '@/components/speaking/SessionTimer';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

const isValidTaskType = (taskType: string): taskType is Template['taskType'] => {
  return ['task1', 'task2', 'task3'].includes(taskType);
};

export default function SpeakingAgentPage() {
  const [activeTab, setActiveTab] = useState<string>("templates");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [currentSession, setCurrentSession] = useState<SpeakingSession | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showDurationDialog, setShowDurationDialog] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(15); // Default 15 minutes
  const [sessionActive, setSessionActive] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const { toast } = useToast();
  const userId = "test-user"; // TODO: Replace with actual user ID
  const router = useRouter();

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !currentSession) return;

    try {
      setIsProcessing(true);
      
      // Send message through practice service
      await practiceService.sendMessage(content);

      // Get updated messages from current session
      const updatedSession = practiceService.getCurrentSession();
      if (updatedSession && Array.isArray(updatedSession.messages)) {
        setMessages([...updatedSession.messages]);
        
        // Convert PracticeSession to SpeakingSession
        const speakingSession: SpeakingSession = {
          id: updatedSession.id,
          userId: userId, // Use the predefined userId from earlier in the component
          templateId: selectedTemplate?.id || 'default-template',
          startTime: updatedSession.startTime, // startTime is already a number
          endTime: updatedSession.endTime, // endTime is already a number
          messages: updatedSession.messages,
          duration: updatedSession.duration || 5, // Default to 5 minutes if not specified
          audioUrls: (updatedSession as any).audioUrls || [] // Use type assertion to bypass type checking
        };

        setCurrentSession(speakingSession);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setInput(''); // Clear input after sending
    }
  };

  const handleAudioAnalysis = async (response: string) => {
    try {
      if (!currentSession) return;

      // Get updated messages from current session
      const updatedSession = practiceService.getCurrentSession();
      if (updatedSession && Array.isArray(updatedSession.messages)) {
        setMessages([...updatedSession.messages]);
        
        // Convert PracticeSession to SpeakingSession
        const speakingSession: SpeakingSession = {
          id: updatedSession.id,
          userId: userId, // Use the predefined userId from earlier in the component
          templateId: selectedTemplate?.id || 'default-template',
          startTime: updatedSession.startTime, // startTime is already a number
          endTime: updatedSession.endTime, // endTime is already a number
          messages: updatedSession.messages,
          duration: updatedSession.duration || 5, // Default to 5 minutes if not specified
          audioUrls: (updatedSession as any).audioUrls || [] // Use type assertion to bypass type checking
        };

        setCurrentSession(speakingSession);

        // Check if response contains feedback
        if (response.includes('Pronunciation:') || 
            response.includes('Grammar:') || 
            response.includes('Vocabulary:') || 
            response.includes('Fluency:')) {
          setFeedback(response);
        }
      }

    } catch (error) {
      console.error('Error processing audio response:', error);
      toast({
        title: "Error",
        description: "Failed to process audio response. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSessionSelect = (session: SpeakingSession) => {
    setCurrentSession(session);
    if (session.messages) {
      setMessages(session.messages);
    }
  };

  const handleStartNewSession = () => {
    setSelectedTemplate(null);
    setMessages([]);
    setShowDurationDialog(true);
  };

  const handleTemplateSelect = async (template: Template) => {
    setSelectedTemplate(template);
    setShowDurationDialog(true);

    // Wait for the user to set the duration
    const duration = await getDurationFromDialog(); // Assume this function shows the dialog and returns the duration

    if (duration) {
      setSessionDuration(duration);
      setSessionActive(true);

      // Initialize AI interaction
      const session = await practiceService.startSession('template', duration, template);
      setMessages(session.messages);

      // Transition to the practice interface
      setActiveTab('practice');
    }
  };

  const startPractice = async () => {
    try {
      // Save current session if exists
      if (currentSession) {
        await practiceService.endSession(currentSession);
      }

      // Start new session
      const session = await practiceService.startSession(
        selectedTemplate ? 'template' : 'tutor',
        sessionDuration,
        selectedTemplate || undefined
      );

      // Convert PracticeSession to SpeakingSession
      const speakingSession: SpeakingSession = {
        id: session.id,
        userId: userId, // Use the predefined userId from earlier in the component
        templateId: selectedTemplate?.id || 'default-template',
        startTime: session.startTime,
        endTime: session.endTime,
        messages: session.messages,
        duration: session.duration || 5, // Default to 5 minutes if not specified
        audioUrls: (session as any).audioUrls || [] // Use type assertion to bypass type checking
      };

      setCurrentSession(speakingSession);
      setMessages(session.messages);
      setSessionActive(true);
      setShowDurationDialog(false);
      setActiveTab("practice"); // Switch to practice tab after starting

      toast({
        title: "Session Started",
        description: `Your ${sessionDuration}-minute speaking practice session has begun.`,
      });
    } catch (error) {
      console.error('Error starting practice:', error);
      toast({
        title: "Error",
        description: "Failed to start practice session. Please try again.",
        variant: "destructive",
      });
    }
  };

  const endSession = async () => {
    try {
      if (currentSession) {
        await practiceService.endSession(currentSession);
        setCurrentSession(null);
        setMessages([]);
        setSessionActive(false);
        setSelectedTemplate(null);
        
        toast({
          title: "Session Ended",
          description: "Your speaking practice session has been saved.",
        });
      }
    } catch (error) {
      console.error('Error ending session:', error);
      toast({
        title: "Error",
        description: "Failed to end session properly. Some data might not be saved.",
        variant: "destructive",
      });
    }
  };

  const handleSessionEnd = async () => {
    try {
      if (!currentSession) return null;

      const endedSession: SpeakingSession = {
        ...currentSession,
        endTime: Date.now(),
      };

      // Attempt to save the session and get metrics
      const result = await practiceService.endSession(endedSession);

      if (result) {
        // Update state with session metrics and end the session
        setCurrentSession(null);
        setMessages([]);
        setSessionActive(false);
        setSelectedTemplate(null);
        
        toast({
          title: "Session Complete",
          description: "Your speaking practice session has ended.",
        });

        // Navigate to results page with metrics
        router.push(
          `/agents/speaking/results?metrics=${encodeURIComponent(JSON.stringify(result.metrics))}`
        );
      }

      return result;
    } catch (error) {
      console.error('Error ending session:', error);
      toast({
        title: "Session Error",
        description: "There was an issue ending your speaking practice session.",
        variant: "destructive"
      });
      return null;
    }
  };

  const getDurationFromDialog = async (): Promise<number | null> => {
    return new Promise((resolve) => {
      const handleConfirm = (duration: number) => {
        setShowDurationDialog(false);
        resolve(duration);
      };

      // Render the dialog
      setShowDurationDialog(true);

      // Example of using a timeout to simulate user input
      setTimeout(() => {
        handleConfirm(15); // Simulate user selecting 15 minutes
      }, 1000);
    });
  };

  // Add useEffect to handle session cleanup on unmount
  useEffect(() => {
    return () => {
      if (currentSession) {
        practiceService.endSession(currentSession).catch(console.error);
      }
    };
  }, [currentSession]);

  return (
    <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-[inset_-12px_-8px_40px_#46464620] hover:shadow-[inset_-12px_-8px_40px_#46464620,_12px_8px_20px_#46464620] transition-all duration-300">
            <SessionSidebar 
              userId={userId}
              onSessionSelect={handleSessionSelect}
              currentSessionId={currentSession?.id}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <Tabs defaultValue="templates" className="w-full">
            <TabsList>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="templates">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {speakingTemplates.map((template) => (
                  <Card 
                    key={template.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800 shadow-[5px_5px_10px_#b8b9be,_-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#b8b9be,_inset_-5px_-5px_10px_#ffffff]"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardHeader>
                      <CardTitle>{template.title}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Level: {template.level}</p>
                      <p>Target Band: {template.targetBand}</p>
                      <p>Criteria: {template.criteria.join(', ')}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="practice">
              {selectedTemplate ? (
                <div className="space-y-6">
                  {/* Template Info */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-[inset_-12px_-8px_40px_#46464620]">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-bold">{selectedTemplate.title}</h2>
                        <p className="text-gray-600 dark:text-gray-300">{selectedTemplate.description}</p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={handleStartNewSession}
                        className="rounded-xl bg-white hover:bg-gray-50 shadow-[5px_5px_10px_#b8b9be,_-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#b8b9be,_inset_-5px_-5px_10px_#ffffff] transition-all duration-300"
                      >
                        New Session
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700 shadow-[inset_5px_5px_10px_#b8b9be,_inset_-5px_-5px_10px_#ffffff]">
                        <p className="text-sm font-medium">Level</p>
                        <p className="text-lg">{selectedTemplate.level}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700 shadow-[inset_5px_5px_10px_#b8b9be,_inset_-5px_-5px_10px_#ffffff]">
                        <p className="text-sm font-medium">Target Band</p>
                        <p className="text-lg">{selectedTemplate.targetBand}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700 shadow-[inset_5px_5px_10px_#b8b9be,_inset_-5px_-5px_10px_#ffffff]">
                        <p className="text-sm font-medium">Part</p>
                        <p className="text-lg">{selectedTemplate.taskType.replace('speaking_', '').toUpperCase()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Interface */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-[inset_-12px_-8px_40px_#46464620]">
                    {sessionActive && (
                      <div className="mb-4">
                        <SessionTimer onSessionEnd={handleSessionEnd} />
                      </div>
                    )}
                    <DefaultChat
                      messages={messages}
                      onSendMessage={handleSendMessage}
                      isProcessing={isProcessing}
                    />
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                      <AudioRecorder
                        onAnalysisComplete={handleAudioAnalysis}
                        isHandsFree={false}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center space-y-2 mb-8">
                    <h1 className="text-3xl font-bold">IELTS Speaking Practice</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      Choose a template or start a free chat with AI tutor
                    </p>
                  </div>

                  {/* Free Chat Card */}
                  <div className="mb-8">
                    <Card 
                      className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800 shadow-[5px_5px_10px_#b8b9be,_-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#b8b9be,_inset_-5px_-5px_10px_#ffffff] transition-all duration-300"
                      onClick={() => {
                        const template = speakingTemplates.find(t => t.taskType === 'task1');
                        if (template) handleTemplateSelect(template);
                      }}
                    >
                      <CardHeader>
                        <CardTitle>Trò chuyện tự do</CardTitle>
                        <CardDescription>Trò chuyện tự do với AI tutor để luyện tập tiếng Anh</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between text-sm">
                          <span>Level: All Levels</span>
                          <span>Free Practice</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Tabs defaultValue="part1" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-8 p-1 bg-white dark:bg-gray-800 rounded-xl shadow-[5px_5px_10px_#b8b9be,_-5px_-5px_10px_#ffffff]">
                      <TabsTrigger 
                        value="part1"
                        className="data-[state=active]:shadow-[inset_5px_5px_10px_#b8b9be,_inset_-5px_-5px_10px_#ffffff] rounded-lg"
                      >
                        Part 1
                      </TabsTrigger>
                      <TabsTrigger 
                        value="part2"
                        className="data-[state=active]:shadow-[inset_5px_5px_10px_#b8b9be,_inset_-5px_-5px_10px_#ffffff] rounded-lg"
                      >
                        Part 2
                      </TabsTrigger>
                      <TabsTrigger 
                        value="part3"
                        className="data-[state=active]:shadow-[inset_5px_5px_10px_#b8b9be,_inset_-5px_-5px_10px_#ffffff] rounded-lg"
                      >
                        Part 3
                      </TabsTrigger>
                      <TabsTrigger 
                        value="advanced"
                        className="data-[state=active]:shadow-[inset_5px_5px_10px_#b8b9be,_inset_-5px_-5px_10px_#ffffff] rounded-lg"
                      >
                        Advanced
                      </TabsTrigger>
                    </TabsList>

                    {['part1', 'part2', 'part3', 'advanced'].map((part) => (
                      <TabsContent key={part} value={part}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {speakingTemplates
                            .filter(t => isValidTaskType(t.taskType) && t.taskType === `task${part.replace('part', '')}`)
                            .map((template) => (
                              <Card 
                                key={template.id}
                                className="cursor-pointer transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800 shadow-[5px_5px_10px_#b8b9be,_-5px_-5px_10px_#ffffff] hover:shadow-[8px_8px_15px_#b8b9be,_-8px_-8px_15px_#ffffff]"
                                onClick={() => {
                                  if (template) handleTemplateSelect(template);
                                }}
                              >
                                <CardHeader>
                                  <CardTitle>{template.title}</CardTitle>
                                  <CardDescription>{template.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <div className="flex justify-between text-sm">
                                    <span>Level: {template.level}</span>
                                    <span>Target: Band {template.targetBand}</span>
                                  </div>
                                  <div className="mt-2 flex flex-wrap gap-1">
                                    {template.criteria.map((criterion, index) => (
                                      <span 
                                        key={index}
                                        className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 shadow-[inset_2px_2px_5px_#b8b9be,_inset_-2px_-2px_5px_#ffffff]"
                                      >
                                        {criterion}
                                      </span>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              )}
            </TabsContent>

            <TabsContent value="feedback">
              {/* Feedback UI goes here */}
            </TabsContent>

            <TabsContent value="results">
              {/* Results UI goes here */}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={showDurationDialog} onOpenChange={setShowDurationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chọn thời gian luyện tập</DialogTitle>
            <DialogDescription>
              Bạn muốn dành bao nhiêu phút cho phiên luyện tập này? (5-30 phút)
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Thời gian (phút)
              </Label>
              <Input
                id="duration"
                type="number"
                min={5}
                max={30}
                value={sessionDuration}
                onChange={(e) => setSessionDuration(parseInt(e.target.value))}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={startPractice}>Bắt đầu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
