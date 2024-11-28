import React from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TimerIcon from '@mui/icons-material/Timer';

interface SessionTimerProps {
  timeRemaining: number;
}

const TimerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const SessionTimer: React.FC<SessionTimerProps> = ({ timeRemaining }) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <TimerContainer>
      <TimerIcon fontSize="small" />
      <Typography variant="body2">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')} remaining
      </Typography>
    </TimerContainer>
  );
};
