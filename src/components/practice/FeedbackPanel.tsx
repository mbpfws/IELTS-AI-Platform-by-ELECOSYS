import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Divider,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

interface FeedbackMetrics {
  pronunciation: number;
  grammar: number;
  vocabulary: number;
  fluency: number;
  coherence: number;
  overallBand: number;
}

interface FeedbackProps {
  metrics: FeedbackMetrics;
  strengths: string[];
  improvements: string[];
  tips: string[];
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  backgroundColor: theme.palette.background.paper,
}));

const MetricsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const MetricBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 8,
  backgroundColor: theme.palette.background.default,
  textAlign: 'center',
}));

const BandScore = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

export const FeedbackPanel: React.FC<FeedbackProps> = ({
  metrics,
  strengths,
  improvements,
  tips,
}) => {
  return (
    <StyledPaper elevation={3}>
      <Typography variant="h5" gutterBottom>
        Session Feedback
      </Typography>

      <MetricsContainer>
        <MetricBox>
          <Typography variant="subtitle2">Overall Band</Typography>
          <BandScore>{metrics.overallBand.toFixed(1)}</BandScore>
        </MetricBox>
        {Object.entries(metrics).map(([key, value]) => {
          if (key !== 'overallBand') {
            return (
              <MetricBox key={key}>
                <Typography variant="subtitle2">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                <Rating
                  value={value / 2}
                  precision={0.5}
                  readOnly
                  size="large"
                />
                <Typography variant="body2">
                  Band {value.toFixed(1)}
                </Typography>
              </MetricBox>
            );
          }
          return null;
        })}
      </MetricsContainer>

      <Divider sx={{ my: 3 }} />

      <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          <CheckCircleIcon color="success" sx={{ mr: 1, verticalAlign: 'middle' }} />
          Strengths
        </Typography>
        <List>
          {strengths.map((strength, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText primary={strength} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          <TrendingUpIcon color="primary" sx={{ mr: 1, verticalAlign: 'middle' }} />
          Areas for Improvement
        </Typography>
        <List>
          {improvements.map((improvement, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <TrendingUpIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={improvement} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          <LightbulbIcon color="warning" sx={{ mr: 1, verticalAlign: 'middle' }} />
          Practice Tips
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap">
          {tips.map((tip, index) => (
            <Chip
              key={index}
              label={tip}
              color="primary"
              variant="outlined"
              sx={{ margin: 0.5 }}
            />
          ))}
        </Box>
      </Box>
    </StyledPaper>
  );
};
