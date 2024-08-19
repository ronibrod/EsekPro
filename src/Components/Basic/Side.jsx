import React from 'react';
import { Stack, Typography, Button, Box } from '@mui/material';
import { Home, BarChart, Storage, AutoAwesome, Engineering } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Colors from '../../helpers/colors';

const Side = () => {
  const navigateTo = useNavigate();

  const handleNavigationClick = (path) => {
    navigateTo(path);
  };

  return (
    <Stack
      sx={{
        height: '100vh',
        width: '12%',
        backgroundColor: `${Colors[6]}FF`,
        textAlign: 'center',
        position: 'fixed',
        zIndex: 998,
        padding: '20px 0',
        boxShadow: '2px 0 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px 0 0 10px',
      }}
    >
      <Stack mt={7} spacing={3}>
        <Button 
          onClick={() => handleNavigationClick('/')}
          sx={{
            color: Colors[5], 
            justifyContent: 'flex-start', 
            padding: '10px 20px', 
            textTransform: 'none', 
            '&:hover': { backgroundColor: Colors[7], color: Colors[0] },
            borderRadius: '20px 0 0 20px',
          }}
        >
          <Home sx={{ marginLeft: '8px' }} />
          <Typography variant='h6'>
            עמוד הבית
          </Typography>
        </Button>

        <Button 
          onClick={() => handleNavigationClick('/charts')}
          sx={{ 
            color: Colors[5], 
            justifyContent: 'flex-start', 
            padding: '10px 20px', 
            textTransform: 'none', 
            '&:hover': { backgroundColor: Colors[7], color: Colors[0] },
            borderRadius: '20px 0 0 20px',
          }}
        >
          <BarChart sx={{ marginLeft: '8px' }} />
          <Typography variant='h6'>
            הצג נתונים
          </Typography>
        </Button>

        <Button 
          onClick={() => handleNavigationClick('/dataManagement')}
          sx={{ 
            color: Colors[5], 
            justifyContent: 'flex-start', 
            padding: '10px 20px', 
            textTransform: 'none', 
            '&:hover': { backgroundColor: Colors[7], color: Colors[0] },
            borderRadius: '20px 0 0 20px',
          }}
        >
          <Storage sx={{ marginLeft: '8px' }} />
          <Typography variant='h6'>
            ניהול מידע
          </Typography>
        </Button>

        <Button
          onClick={() => handleNavigationClick('/AIManagement')}
          sx={{
            color: Colors[5],
            justifyContent: 'flex-start',
            padding: '10px 20px',
            textTransform: 'none',
            '&:hover': { backgroundColor: Colors[7], color: Colors[0] },
            borderRadius: '20px 0 0 20px',
          }}
        >
          <AutoAwesome sx={{ marginLeft: '8px' }} />
          <Typography variant='h6'>
            ניהול AI
          </Typography>
        </Button>

        <Button
          onClick={() => handleNavigationClick('/workersManagement')}
          sx={{
            color: Colors[5],
            justifyContent: 'flex-start',
            padding: '10px 20px',
            textTransform: 'none',
            '&:hover': { backgroundColor: Colors[7], color: Colors[0] },
            borderRadius: '20px 0 0 20px',
          }}
        >
          <Engineering sx={{ marginLeft: '8px' }} />
          <Typography variant='h6'>
            ניהול עובדים
          </Typography>
        </Button>
      </Stack>
    </Stack>
  );
};

export default Side;
