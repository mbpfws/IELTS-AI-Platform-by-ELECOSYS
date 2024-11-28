import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

// Placeholder component until WritingAgent is implemented
const WritingPlaceholder = () => (
  <Box sx={{ textAlign: 'center', mt: 4 }}>
    <Typography variant="h4">Writing Agent</Typography>
    <Typography variant="subtitle1" sx={{ mt: 2 }}>Coming soon...</Typography>
  </Box>
);

export const WritingRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<WritingPlaceholder />} />
    </Routes>
  );
};
