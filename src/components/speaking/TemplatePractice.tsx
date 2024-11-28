import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  IconButton,
  Dialog,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ChatIcon from '@mui/icons-material/Chat';
import { FreePractice } from './FreePractice';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const TagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  flexWrap: 'wrap',
}));

interface TemplateProps {
  title: string;
  description: string;
  level: string;
  targetBand: string;
  tags: string[];
  questions: string[];
}

export const TemplatePractice: React.FC<TemplateProps> = ({
  title,
  description,
  level,
  targetBand,
  tags,
  questions,
}) => {
  const [showTutor, setShowTutor] = useState(false);

  return (
    <>
      <StyledPaper>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {description}
            </Typography>
          </Box>
          <Box display="flex" gap={1}>
            <Button
              variant="outlined"
              startIcon={<PlayArrowIcon />}
              onClick={() => {/* Handle template practice */}}
            >
              Practice
            </Button>
            <Button
              variant="contained"
              startIcon={<ChatIcon />}
              onClick={() => setShowTutor(true)}
            >
              Practice with AI
            </Button>
          </Box>
        </Box>

        <Box display="flex" gap={2} mb={2}>
          <Typography variant="body2">
            Level: {level}
          </Typography>
          <Typography variant="body2">
            Target Band: {targetBand}
          </Typography>
        </Box>

        <Typography variant="subtitle2" gutterBottom>
          Questions:
        </Typography>
        {questions.map((question, index) => (
          <Typography key={index} variant="body2" paragraph>
            {index + 1}. {question}
          </Typography>
        ))}

        <TagsContainer>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </TagsContainer>
      </StyledPaper>

      <Dialog
        fullScreen
        open={showTutor}
        onClose={() => setShowTutor(false)}
      >
        <Box p={2}>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button onClick={() => setShowTutor(false)}>
              Close
            </Button>
          </Box>
          <FreePractice />
        </Box>
      </Dialog>
    </>
  );
};
