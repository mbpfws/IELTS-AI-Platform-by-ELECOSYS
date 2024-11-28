import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
  Button,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import SendIcon from '@mui/icons-material/Send';
import { TutorService } from '../../services/tutorService';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: 'calc(100vh - 200px)',
  display: 'flex',
  flexDirection: 'column',
}));

const ChatArea = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
}));

const MessageBubble = styled(Box)<{ isUser?: boolean }>(({ theme, isUser }) => ({
  maxWidth: '80%',
  margin: '8px 0',
  padding: theme.spacing(1, 2),
  borderRadius: 16,
  backgroundColor: isUser ? theme.palette.primary.main : theme.palette.grey[100],
  color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  wordBreak: 'break-word',
}));

const InputArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const Timer = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
}));

interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const FreePractice: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const chatEndRef = useRef<null | HTMLDivElement>(null);
  const tutorService = useRef(TutorService.getInstance());

  useEffect(() => {
    // Add initial tutor message
    setMessages([
      {
        content: "Hello! I'm your IELTS Speaking tutor. How long would you like to practice today? (in minutes)",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      content: input,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Get AI response
    const feedback = await tutorService.current.provideFeedback(input);
    const tutorMessage = {
      content: feedback.recordedResponses[0].feedback,
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, tutorMessage]);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement voice recording logic here
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <StyledPaper>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Free Practice with AI Tutor</Typography>
        <Timer variant="body2">
          Session Time: {formatTime(sessionTime)}
        </Timer>
      </Box>

      <LinearProgress 
        variant="determinate" 
        value={(sessionTime / (15 * 60)) * 100} 
        sx={{ mb: 2 }} 
      />

      <ChatArea>
        {messages.map((message, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="column"
            alignItems={message.isUser ? 'flex-end' : 'flex-start'}
          >
            <MessageBubble isUser={message.isUser}>
              <Typography variant="body1">{message.content}</Typography>
            </MessageBubble>
            <Typography variant="caption" color="text.secondary">
              {message.timestamp.toLocaleTimeString()}
            </Typography>
          </Box>
        ))}
        <div ref={chatEndRef} />
      </ChatArea>

      <InputArea>
        <IconButton 
          color={isRecording ? 'error' : 'primary'} 
          onClick={toggleRecording}
        >
          {isRecording ? <StopIcon /> : <MicIcon />}
        </IconButton>
        
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
        />
        
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSend}
        >
          Send
        </Button>
      </InputArea>
    </StyledPaper>
  );
};
