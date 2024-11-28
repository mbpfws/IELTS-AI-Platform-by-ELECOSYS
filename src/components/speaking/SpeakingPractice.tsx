import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, TextField, Typography, Switch, FormControlLabel, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import { useToast } from '@/components/ui/use-toast';
import { Message } from '@/types/speakingSession';
import AudioRecorder from '@/components/speaking/AudioRecorder';
import { SessionTimer } from './SessionTimer';

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
  duration: number;
  onSessionEnd?: (feedback: any) => void;
}

export const SpeakingPractice = ({
  topic,
  level,
  targetBand,
  part,
  mode = 'practice',
  duration,
  onSessionEnd
}: SpeakingPracticeProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [handsFreeMode, setHandsFreeMode] = useState(false);
  const [sessionActive, setSessionActive] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initSession = async () => {
      try {
        const session = await fetch('/api/speaking/start-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            topic,
            level,
            targetBand,
            part,
            duration,
            mode
          }),
        });
        const data = await session.json();
        setMessages(data.messages || []);
      } catch (error) {
        console.error('Error starting session:', error);
        toast({
          title: 'Error',
          description: 'Failed to start session. Please try again.',
          variant: 'destructive',
        });
      }
    };

    initSession();
  }, [topic, level, targetBand, part, duration, mode]);

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
          duration,
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
    await handleSend();
  };

  const handleSessionEnd = async () => {
    setSessionActive(false);
    try {
      const feedback = await fetch('/api/speaking/end-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          duration,
          mode
        }),
      });
      const data = await feedback.json();
      onSessionEnd?.(data.feedback);
      
      toast({
        title: 'Session Ended',
        description: 'Your speaking practice session has ended. Check your feedback below.',
      });
    } catch (error) {
      console.error('Error ending session:', error);
      toast({
        title: 'Error',
        description: 'Failed to get session feedback. Please try again.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box>
      <SessionTimer 
        onSessionEnd={handleSessionEnd}
      />
      
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
    </Box>
  );
};
