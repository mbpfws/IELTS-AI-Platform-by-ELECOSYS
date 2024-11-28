import React from 'react';
import { IconButton, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

interface RecordButtonProps {
  isRecording: boolean;
  onToggleRecording: () => void;
}

const RecordingIndicator = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
}));

const RecordingDot = styled(Box)(({ theme }) => ({
  width: 8,
  height: 8,
  backgroundColor: theme.palette.error.main,
  borderRadius: '50%',
  position: 'absolute',
  top: 0,
  right: 0,
  animation: 'pulse 1.5s ease-in-out infinite',
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '50%': {
      transform: 'scale(1.5)',
      opacity: 0.5,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
}));

export const RecordButton: React.FC<RecordButtonProps> = ({
  isRecording,
  onToggleRecording,
}) => {
  return (
    <RecordingIndicator>
      <IconButton
        color={isRecording ? 'error' : 'primary'}
        onClick={onToggleRecording}
        size="large"
      >
        {isRecording ? <StopIcon /> : <MicIcon />}
      </IconButton>
      {isRecording && (
        <>
          <RecordingDot />
          <CircularProgress
            size={48}
            thickness={2}
            sx={{
              position: 'absolute',
              top: -4,
              left: -4,
              color: 'error.main',
            }}
          />
        </>
      )}
    </RecordingIndicator>
  );
};
