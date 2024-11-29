import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Slider, 
  Typography, 
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';

interface TimerSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  onStartSession: (duration: number) => void;
  part?: 1 | 2 | 3;
}

const partDurationRanges = {
  1: { min: 3, max: 7, default: 5, recommended: 5 },   // Part 1: 3-7 minutes
  2: { min: 2, max: 5, default: 3, recommended: 3 },   // Part 2: 2-5 minutes
  3: { min: 3, max: 8, default: 5, recommended: 5 }    // Part 3: 3-8 minutes
};

export const TimerSelectionDialog: React.FC<TimerSelectionDialogProps> = ({ 
  open, 
  onClose, 
  onStartSession,
  part = 1
}) => {
  const [duration, setDuration] = useState(partDurationRanges[part].default);
  const [selectedPart, setSelectedPart] = useState<1 | 2 | 3>(part);

  const handlePartChange = (event: SelectChangeEvent<number>) => {
    const newPart = event.target.value as 1 | 2 | 3;
    setSelectedPart(newPart);
    setDuration(partDurationRanges[newPart].default);
  };

  const handleDurationChange = (event: Event, newValue: number | number[]) => {
    setDuration(newValue as number);
  };

  const handleStartSession = () => {
    onStartSession(duration * 60); // Convert minutes to seconds
    onClose();
  };

  const currentRange = partDurationRanges[selectedPart];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Set Speaking Practice Duration</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%', py: 2 }}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel>IELTS Speaking Part</InputLabel>
            <Select
              value={selectedPart}
              label="IELTS Speaking Part"
              onChange={handlePartChange}
            >
              <MenuItem value={1}>Part 1 - Introduction & Interview</MenuItem>
              <MenuItem value={2}>Part 2 - Individual Long Turn</MenuItem>
              <MenuItem value={3}>Part 3 - Two-way Discussion</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="subtitle1" gutterBottom>
            Duration: {duration} minutes
          </Typography>
          
          <Slider
            value={duration}
            onChange={handleDurationChange}
            aria-labelledby="duration-slider"
            step={0.5}
            marks={[
              { value: currentRange.min, label: `${currentRange.min}m` },
              { value: currentRange.recommended, label: `${currentRange.recommended}m (Recommended)` },
              { value: currentRange.max, label: `${currentRange.max}m` }
            ]}
            min={currentRange.min}
            max={currentRange.max}
            valueLabelDisplay="auto"
            sx={{ mt: 4, mb: 2 }}
          />

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Recommended duration for Part {selectedPart}: {currentRange.recommended} minutes
              {selectedPart === 1 && " (Introduction & Interview)"}
              {selectedPart === 2 && " (Individual Long Turn with 1 minute preparation)"}
              {selectedPart === 3 && " (Two-way Discussion)"}
            </Typography>
          </Alert>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleStartSession} variant="contained">
          Start Practice
        </Button>
      </DialogActions>
    </Dialog>
  );
};
