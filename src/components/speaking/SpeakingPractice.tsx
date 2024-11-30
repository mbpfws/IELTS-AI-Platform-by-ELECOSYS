import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, TextField, Typography, Switch, FormControlLabel, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import { useToast } from '@/components/ui/use-toast';
import { Message } from '@/types/speakingSession';
import AudioRecorder from '@/components/speaking/AudioRecorder';
import NeumorphicTimer from '../ui/neumorphic/timer';
import TimerDialog from './TimerDialog';
import { practiceService } from '@/services/practiceService'; 
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4

const ChatContainer = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 300px)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const MessagesArea = styled(Box)({
  flexGrow: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  paddingRight: '8px',
});

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})<{ isUser: boolean }>(({ theme, isUser }) => ({
  maxWidth: '70%',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(2),
  backgroundColor: isUser ? theme.palette.primary.main : theme.palette.grey[200],
  color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
}));

const InputArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
}));

const StatsCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  marginBottom: theme.spacing(2),
}));

interface SpeakingPracticeProps {
  topic: string;
  level: string;
  targetBand: number;
  part: number;
  mode?: 'practice' | 'mocktest';
  onSessionEnd?: (feedback: any) => void;
}

export const SpeakingPractice = ({
  topic,
  level,
  targetBand,
  part,
  mode = 'practice',
  onSessionEnd
}: SpeakingPracticeProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [handsFreeMode, setHandsFreeMode] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionDuration, setSessionDuration] = useState<number | null>(null);
  const [showTimerDialog, setShowTimerDialog] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSessionComplete = async () => {
    setSessionActive(false);
    setIsProcessing(true);

    try {
      // Get final feedback
      const feedback = await practiceService.endSession(
        practiceService.getCurrentSession()?.id || ''
      );

      // Add final feedback message
      setMessages(prev => [
        ...prev,
        {
          id: uuidv4(),
          role: 'assistant',
          content: `🎯 Session Complete!\n\n📊 Overall Band Score: ${feedback.overallBand}\n\n💪 Strengths:\n${feedback.strengths.map(s => `• ${s}`).join('\n')}\n\n🎯 Areas for Improvement:\n${feedback.areasForImprovement.map(s => `• ${s}`).join('\n')}\n\n📝 Recommended Practice:\n${feedback.recommendedPractice.map(s => `• ${s}`).join('\n')}`,
          timestamp: Date.now()
        }
      ]);

      if (onSessionEnd) {
        onSessionEnd(feedback);
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể kết thúc phiên. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTimerSelect = (duration: number) => {
    setSessionDuration(duration);
    setShowTimerDialog(false);
    initSession(duration);
  };

  const initSession = async (duration: number) => {
    try {
      // Start practice session
      const startTime = Date.now();
      const session = practiceService.startSession('user');

      if (!session) {
        throw new Error('Failed to start session');
      }

      // Initialize with system message
      const systemPrompt = `Let's practice IELTS Speaking Part ${part} about "${topic}". You have ${Math.round(duration / 60)} minutes. I'll listen and provide feedback at the end.`;
      const initialMessage = {
        id: uuidv4(),
        role: 'assistant' as 'assistant',
        content: systemPrompt,
        timestamp: Date.now()
      } as Message;
      
      setMessages([initialMessage]);
      setSessionActive(true);
    } catch (error) {
      console.error('Error initializing session:', error);
      toast({
        title: 'Error',
        description: 'Failed to start practice session',
        variant: 'destructive',
      });
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const session = practiceService.getCurrentSession();
      if (session) {
        practiceService.endSession(session.id);
      }
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim() && !audioBlob) return;
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      // Send message through practice service
      await fetch('/api/speaking/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            role: 'user',
            content: input || 'Audio message sent',
            audioUrl: audioUrl
          },
          duration: sessionDuration,
          mode
        }),
      });

      // Clear input states
      setInput('');
      setAudioBlob(null);
      setAudioUrl(null);

    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể gửi tin nhắn. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAudioRecording = async (blob: Blob) => {
    setAudioBlob(blob);
    setAudioUrl(URL.createObjectURL(blob));
  };

  const handleAudioSubmit = async () => {
    if (!audioBlob || !sessionActive) return;
    setIsProcessing(true);

    try {
      // Process audio through practice service
      const response = await practiceService.processAudioMessage(
        practiceService.getCurrentSession()?.id || '',
        audioBlob
      );

      // Add messages to chat
      setMessages(prev => [
        ...prev,
        {
          id: uuidv4(),
          role: 'user',
          content: '🎤 Audio message sent',
          timestamp: Date.now()
        },
        {
          id: uuidv4(),
          role: 'assistant',
          content: response.content,
          timestamp: Date.now()
        }
      ]);

      // Clear audio states
      setAudioBlob(null);
      setAudioUrl(null);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xử lý audio. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1, bgcolor: 'background.paper', py: 2 }}>
        {sessionActive && sessionDuration && (
          <NeumorphicTimer
            duration={Math.round(sessionDuration / 60)} // Convert seconds to minutes for display
            onComplete={handleSessionComplete}
            className="w-full max-w-md mx-auto"
          />
        )}
      </Box>
      <StatsCard>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6">{topic}</Typography>
            <Typography variant="body2" color="text.secondary">
              Level: {level} | Target Band: {targetBand} | Part: {part}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Mode: {mode === 'practice' ? 'Practice' : 'Mock Test'}
          </Typography>
        </Box>
      </StatsCard>

      <ChatContainer>
        <MessagesArea>
          {messages.map((message, index) => (
            <MessageBubble key={index} isUser={message.role === 'user'}>
              <Typography variant="body1">{message.content}</Typography>
            </MessageBubble>
          ))}
          <div ref={messagesEndRef} />
        </MessagesArea>

        <InputArea>
          <FormControlLabel
            control={
              <Switch
                checked={handsFreeMode}
                onChange={(e) => setHandsFreeMode(e.target.checked)}
              />
            }
            label="Chế độ rảnh tay"
          />
          
          <IconButton 
            color={!!audioBlob ? 'error' : 'primary'}
            onClick={handleAudioSubmit}
          >
            <MicIcon />
          </IconButton>

          <TextField
            fullWidth
            placeholder="Nhập câu trả lời của bạn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={handsFreeMode || isProcessing}
          />

          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSend}
            disabled={handsFreeMode || isProcessing}
          >
            Send
          </Button>
        </InputArea>
      </ChatContainer>

      {!!audioBlob && (
        <AudioRecorder
          onRecordingComplete={handleAudioRecording}
          onRecordingStop={() => setAudioBlob(null)}
          disabled={!sessionActive || isProcessing}
          audioBlob={audioBlob}
        />
      )}

      {/* Timer Selection Dialog */}
      <TimerDialog
        open={showTimerDialog}
        onClose={() => setShowTimerDialog(false)}
        onStartSession={handleTimerSelect}
        part={part}
      />
    </Box>
  );
};
