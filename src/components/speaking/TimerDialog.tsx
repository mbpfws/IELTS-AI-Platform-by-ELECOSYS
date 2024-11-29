"use client";

import React, { useState } from 'react';
import { Button } from '@mui/material';
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
    { label: '2 phút', value: 2 },
    { label: '3 phút', value: 3 },
    { label: '5 phút', value: 5 }
  ];

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogTitle>Chọn thời gian</DialogTitle>
        <div className="flex flex-col gap-4 mt-4">
          {durations.map(({ label, value }) => (
            <Button
              key={value}
              variant="contained"
              onClick={() => {
                onStartSession(value);
                onClose();
              }}
              className="w-full"
            >
              {label}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimerDialog;
