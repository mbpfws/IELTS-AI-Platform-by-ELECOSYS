import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const SpeakingAgent = () => {
  const navigate = useNavigate();
  const [agentConfig, setAgentConfig] = useState({
    level: 'All Levels',
    targetBand: 'Any',
    mode: 'Free Chat'
  });

  const startSession = () => {
    // Initialize speaking session with AI tutor
    navigate('/practice', { 
      state: { 
        config: agentConfig,
        mode: 'speaking'
      } 
    });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          IELTS Speaking AI Agent
        </Typography>
        
        <Paper sx={{ p: 3, mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Configure Your Speaking Practice
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">Level</Typography>
              <TextField
                select
                fullWidth
                value={agentConfig.level}
                onChange={(e) => setAgentConfig({...agentConfig, level: e.target.value})}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="All Levels">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">Target Band</Typography>
              <TextField
                select
                fullWidth
                value={agentConfig.targetBand}
                onChange={(e) => setAgentConfig({...agentConfig, targetBand: e.target.value})}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="Any">Any</option>
                <option value="6.0">6.0</option>
                <option value="6.5">6.5</option>
                <option value="7.0">7.0</option>
                <option value="7.5">7.5</option>
                <option value="8.0+">8.0+</option>
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">Mode</Typography>
              <TextField
                select
                fullWidth
                value={agentConfig.mode}
                onChange={(e) => setAgentConfig({...agentConfig, mode: e.target.value})}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="Free Chat">Free Chat</option>
                <option value="Template">Template Based</option>
                <option value="Mock Test">Mock Test</option>
              </TextField>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={startSession}
                fullWidth
              >
                Start Practice Session
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};
