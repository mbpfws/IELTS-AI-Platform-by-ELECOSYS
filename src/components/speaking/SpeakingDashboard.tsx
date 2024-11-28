import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ChatIcon from '@mui/icons-material/Chat';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HistoryIcon from '@mui/icons-material/History';
import AssessmentIcon from '@mui/icons-material/Assessment';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const Feature = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  '& > svg': {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

export const SpeakingDashboard = () => {
  const navigate = useNavigate();

  const practiceOptions = [
    {
      title: 'AI Tutor Practice',
      description: 'Practice with our AI tutor that adapts to your level and provides real-time feedback',
      features: [
        'Interactive conversations',
        'Real-time feedback',
        'Personalized lessons',
        'Progress tracking',
      ],
      icon: <ChatIcon fontSize="large" />,
      path: '/practice',
      color: 'primary',
    },
    {
      title: 'Template Practice',
      description: 'Practice using our comprehensive collection of IELTS speaking templates',
      features: [
        'Part 1, 2, and 3 templates',
        'Common topics',
        'Sample answers',
        'Vocabulary lists',
      ],
      icon: <MenuBookIcon fontSize="large" />,
      path: '/templates',
      color: 'secondary',
    },
    {
      title: 'Practice History',
      description: 'Review your past practice sessions and track your progress',
      features: [
        'Session recordings',
        'Performance analytics',
        'Improvement trends',
        'Detailed feedback history',
      ],
      icon: <HistoryIcon fontSize="large" />,
      path: '/history',
      color: 'info',
    },
    {
      title: 'Mock Test',
      description: 'Take a full IELTS speaking mock test with our AI examiner',
      features: [
        'Realistic test environment',
        'All three parts',
        'Detailed scoring',
        'Performance analysis',
      ],
      icon: <AssessmentIcon fontSize="large" />,
      path: '/mock-test',
      color: 'success',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        IELTS Speaking Practice
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Choose your preferred practice mode to improve your speaking skills
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {practiceOptions.map((option) => (
          <Grid item xs={12} sm={6} md={6} key={option.title}>
            <StyledCard>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  {option.icon}
                  <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                    {option.title}
                  </Typography>
                </Box>
                <Typography color="text.secondary" paragraph>
                  {option.description}
                </Typography>
                <Box>
                  {option.features.map((feature) => (
                    <Feature key={feature}>
                      <Typography variant="body2">{feature}</Typography>
                    </Feature>
                  ))}
                </Box>
              </CardContent>
              <CardActions sx={{ mt: 'auto', p: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color={option.color}
                  onClick={() => navigate(option.path)}
                >
                  Start Practice
                </Button>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
