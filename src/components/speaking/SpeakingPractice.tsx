import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import { TutorService } from '../../services/tutorService';
import SpeakingStats from './SpeakingStats';

const ChatContainer = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 300px)',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

const MessagesArea = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const MessageBubble = styled(Paper)<{ isUser?: boolean }>(({ theme, isUser }) => ({
  padding: theme.spacing(1.5, 2),
  maxWidth: '80%',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  backgroundColor: isUser ? theme.palette.primary.main : theme.palette.grey[100],
  color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
}));

const InputArea = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  gap: theme.spacing(1),
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface SpeakingPracticeProps {
  topic: string;
  level: string;
  targetBand: string;
  part: string;
}

export const SpeakingPractice: React.FC<SpeakingPracticeProps> = ({
  topic,
  level,
  targetBand,
  part,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [handsFreeMode, setHandsFreeMode] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const tutorService = useRef(new TutorService());

  useEffect(() => {
    // Initial tutor message based on the topic
    setMessages([
      {
        content: `Let's start a speaking practice session for IELTS ${part}. ${topic} I'll be your IELTS speaking tutor for this session. We'll focus on: Self-introduction, Description, Daily Life Are you ready to begin?`,
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  }, [topic, part]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      content: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Get AI response
    const response = await tutorService.current.getResponse(input);
    
    const tutorMessage = {
      content: response,
      isUser: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, tutorMessage]);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement voice recording logic
  };

  return (
    <div className="grid grid-cols-[300px_1fr] h-full">
      <div className="border-r overflow-y-auto">
        <SpeakingStats userId={session?.user?.id || ''} />
      </div>
      <div className="flex flex-col h-full">
        <StatsCard>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6">{topic}</Typography>
              <Typography variant="body2" color="text.secondary">
                Level: {level} | Target Band: {targetBand} | Part: {part}
              </Typography>
            </Box>
            <Button variant="contained" color="primary">
              New Session
            </Button>
          </Box>
        </StatsCard>

        <ChatContainer>
          <MessagesArea>
            {messages.map((message, index) => (
              <MessageBubble key={index} isUser={message.isUser}>
                <Typography variant="body1">{message.content}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {message.timestamp.toLocaleTimeString()}
                </Typography>
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
              color={isRecording ? 'error' : 'primary'}
              onClick={toggleRecording}
            >
              <MicIcon />
            </IconButton>

            <TextField
              fullWidth
              placeholder="Nhập câu hỏi của bạn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={handsFreeMode}
            />

            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSend}
              disabled={handsFreeMode}
            >
              Send
            </Button>
          </InputArea>
        </ChatContainer>
      </div>
    </div>
  );
};
