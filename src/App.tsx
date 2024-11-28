import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { SpeakingRoutes } from './routes/SpeakingRoutes';
import { WritingRoutes } from './routes/WritingRoutes';
import { CreateRoutes } from './routes/CreateRoutes';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/agents/speaking" replace />} />
          <Route path="/agents/speaking/*" element={<SpeakingRoutes />} />
          <Route path="/agents/writing/*" element={<WritingRoutes />} />
          <Route path="/agents/create/*" element={<CreateRoutes />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
