import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Paper, Typography, Button, LinearProgress, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TutorService } from '../../services/tutorService';
import { ChatInterface } from './ChatInterface';
import { SessionTimer } from './SessionTimer';
import { FeedbackPanel } from './FeedbackPanel';
import { RecordButton } from './RecordButton';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  borderRadius: 16,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
}));

const TutorAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  marginRight: theme.spacing(2),
}));

const ChatContainer = styled(Box)(({ theme }) => ({
  height: '60vh',
  overflowY: 'auto',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: 12,
  marginBottom: theme.spacing(2),
}));

const ControlPanel = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: 12,
}));

export const SpeakingPractice: React.FC = () => {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Array<{
    role: 'user' | 'tutor';
    content: string;
    timestamp: Date;
  }>>([]);

  const tutorService = useRef(new TutorService());

  const handleStartSession = async (selectedDuration: number) => {
    setDuration(selectedDuration);
    setTimeRemaining(selectedDuration * 60);
    setSessionStarted(true);
    
    const session = tutorService.current.startSession(selectedDuration, {
      currentLevel: 6.5, // This should come from user settings
      targetBand: 7.0,
      focusAreas: ['fluency', 'vocabulary']
    });

    // Add initial tutor message
    setMessages([{
      role: 'tutor',
      content: 'Hello! I\'m your IELTS Speaking tutor. Let\'s begin our practice session. How are you feeling today?',
      timestamp: new Date()
    }]);
  };

  const handleUserMessage = async (message: string) => {
    // Add user message
    setMessages(prev => [...prev, {
      role: 'user',
      content: message,
      timestamp: new Date()
    }]);

    // Get tutor response
    const feedback = tutorService.current.provideFeedback(message);
    const nextQuestion = tutorService.current.getNextQuestion();

    // Add tutor response
    setMessages(prev => [...prev, {
      role: 'tutor',
      content: nextQuestion,
      timestamp: new Date()
    }]);
  };

  const handleEndSession = () => {
    const finalFeedback = tutorService.current.endSession();
    // Show final feedback modal/panel
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sessionStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleEndSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [sessionStarted, timeRemaining]);

  if (!sessionStarted) {
    return (
      <Container maxWidth="md">
        <StyledPaper>
          <Typography variant="h4" gutterBottom>
            IELTS Speaking Practice
          </Typography>
          <Typography variant="body1" paragraph>
            Choose your practice duration:
          </Typography>
          <Box display="flex" gap={2}>
            {[15, 30, 45].map(mins => (
              <Button
                key={mins}
                variant="contained"
                onClick={() => handleStartSession(mins)}
              >
                {mins} minutes
              </Button>
            ))}
          </Box>
        </StyledPaper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <StyledPaper>
        <Box display="flex" alignItems="center" mb={3}>
          <TutorAvatar src="/tutor-avatar.png" />
          <Box>
            <Typography variant="h5">IELTS Speaking Tutor</Typography>
            <SessionTimer timeRemaining={timeRemaining} />
          </Box>
        </Box>

        <ChatContainer>
          <ChatInterface 
            messages={messages}
            onSendMessage={handleUserMessage}
          />
        </ChatContainer>

        <ControlPanel>
          <RecordButton
            isRecording={isRecording}
            onToggleRecording={() => setIsRecording(!isRecording)}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEndSession}
          >
            End Session
          </Button>
        </ControlPanel>

        <LinearProgress
          variant="determinate"
          value={(1 - timeRemaining / (duration * 60)) * 100}
          sx={{ mt: 2, borderRadius: 1 }}
        />
      </StyledPaper>
    </Container>
  );
};
