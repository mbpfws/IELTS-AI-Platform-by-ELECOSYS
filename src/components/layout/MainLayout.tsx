import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/"
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'inherit',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            IELTS AI Platform
            <Typography 
              variant="caption" 
              sx={{ ml: 1, bgcolor: 'rgba(255,255,255,0.1)', px: 1, borderRadius: 1 }}
            >
              by ELECOSYS
            </Typography>
          </Typography>

          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/agents/writing"
          >
            Writing Agent
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/agents/speaking"
          >
            Speaking Agent
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/agents/create"
          >
            Create Agent
          </Button>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};
