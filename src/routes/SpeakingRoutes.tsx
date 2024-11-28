import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SpeakingAgent } from '../agents/speaking/SpeakingAgent';

export const SpeakingRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<SpeakingAgent />} />
    </Routes>
  );
};
