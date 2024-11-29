import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ChatIcon from '@mui/icons-material/Chat';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { part1Questions, part2Questions, part3Questions } from '../../data/speakingQuestions';
import { practiceService } from '../../services/practiceService';
import { TimerSelectionDialog } from './TimerSelectionDialog';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2),
}));

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`speaking-tabpanel-${index}`}
      aria-labelledby={`speaking-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const SpeakingTemplates = () => {
  const [tabValue, setTabValue] = useState(0);
  const [timerDialogOpen, setTimerDialogOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedType, setSelectedType] = useState<'tutor' | 'template'>('tutor');
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleStartPractice = (topic: string, type: 'tutor' | 'template') => {
    setSelectedTopic(topic);
    setSelectedType(type);
    setTimerDialogOpen(true);
  };

  const handleSessionStart = async (duration: number) => {
    try {
      const startTime = Date.now();
      const session = await practiceService.startSession({
        userId: 'user', // Replace with actual user ID
        duration: duration * 60, // Convert minutes to seconds
        templateId: selectedTopic,
        startTime
      });

      if (session) {
        navigate('/practice', { 
          state: { 
            topic: selectedTopic,
            level: 'intermediate', // You can make this dynamic
            targetBand: 7, // You can make this dynamic
            part: tabValue + 1,
            mode: 'practice',
            duration: duration,
            sessionId: session.id
          } 
        });
      }
    } catch (error) {
      console.error('Failed to start practice session:', error);
      // TODO: Show error toast to user
    } finally {
      setTimerDialogOpen(false);
    }
  };

  const renderTopicList = (questions: any, part: number) => {
    return Object.entries(questions).map(([key, value]: [string, any]) => (
      <StyledCard key={key}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {typeof value === 'object' && 'topic' in value
              ? value.topic
              : key.replace(/_/g, ' ').replace(/speaking_part\d_/, '')}
          </Typography>
          
          {typeof value === 'object' && 'questions' in value && (
            <List dense>
              {value.questions.map((question: string, index: number) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <BookmarkIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={question} />
                </ListItem>
              ))}
            </List>
          )}

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              startIcon={<PlayCircleOutlineIcon />}
              variant="outlined"
              onClick={() => handleStartPractice(key, 'template')}
            >
              Practice with Template
            </Button>
            <Button
              startIcon={<ChatIcon />}
              variant="contained"
              onClick={() => handleStartPractice(key, 'tutor')}
            >
              Practice with Tutor
            </Button>
          </Box>
        </CardContent>
      </StyledCard>
    ));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Speaking Templates
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Choose a template to practice or start an interactive session with our AI tutor
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="speaking parts tabs">
          <Tab label="Part 1: Introduction & Interview" />
          <Tab label="Part 2: Individual Long Turn" />
          <Tab label="Part 3: Two-way Discussion" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {renderTopicList(part1Questions, 1)}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {renderTopicList(part2Questions, 2)}
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        {renderTopicList(part3Questions, 3)}
      </TabPanel>

      <TimerSelectionDialog 
        open={timerDialogOpen}
        onClose={() => setTimerDialogOpen(false)}
        onStartSession={handleSessionStart}
      />
    </Container>
  );
};
