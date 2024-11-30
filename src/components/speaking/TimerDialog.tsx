"use client";

import React, { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';

interface TimerDialogProps {
  open: boolean;
  onClose: () => void;
  onStartSession: (duration: number) => void;
  part: number;
}

const TimerDialog: React.FC<TimerDialogProps> = ({
  open,
  onClose,
  onStartSession,
  part
}) => {
  const durations = [
    { value: 5, label: '5 minutes' },
    { value: 10, label: '10 minutes' },
    { value: 15, label: '15 minutes' },
    { value: 20, label: '20 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' },
  ];

  const handleDurationSelect = (duration: number) => {
    onStartSession(duration * 60); // Convert to seconds
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Select Session Duration
        <Typography variant="subtitle2" color="text.secondary">
          Choose how long you want to practice
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {durations.map((duration) => (
            <Grid item xs={12} sm={6} md={4} key={duration.value}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleDurationSelect(duration.value)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  p: 2
                }}
              >
                <Typography variant="h6">{duration.value}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {duration.label}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default TimerDialog;
