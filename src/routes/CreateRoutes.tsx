import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

// Placeholder component until CreateAgent is implemented
const CreatePlaceholder = () => (
  <Box sx={{ textAlign: 'center', mt: 4 }}>
    <Typography variant="h4">Create Agent</Typography>
    <Typography variant="subtitle1" sx={{ mt: 2 }}>Coming soon...</Typography>
  </Box>
);

export const CreateRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<CreatePlaceholder />} />
    </Routes>
  );
};
