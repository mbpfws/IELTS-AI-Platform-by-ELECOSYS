import React from 'react';
import { Typography, Box, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import TimerIcon from '@mui/icons-material/Timer';

interface SessionTimerProps {
  timeRemaining: number;
  totalDuration?: number;
}

const TimerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const TimerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const SessionTimer: React.FC<SessionTimerProps> = ({ 
  timeRemaining, 
  totalDuration 
}) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  
  const progress = totalDuration 
    ? ((totalDuration - timeRemaining) / totalDuration) * 100 
    : 0;

  return (
    <TimerContainer>
      <TimerHeader>
        <TimerIcon fontSize="small" />
        <Typography variant="body2">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')} remaining
          {totalDuration && ` / ${Math.floor(totalDuration / 60).toString().padStart(2, '0')}:${(totalDuration % 60).toString().padStart(2, '0')}`}
        </Typography>
      </TimerHeader>
      {totalDuration && (
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          color={progress > 80 ? 'error' : 'primary'}
        />
      )}
    </TimerContainer>
  );
};
