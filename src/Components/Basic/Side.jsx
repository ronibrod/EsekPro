import React from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import Colors from '../../helpers/colors';

const Side = () => {
  const navigateTo = useNavigate();

  const handleDataManagementClick = () => {
    navigateTo('/dataManagement');
  };

  const handleDisplayChartsClick = () => {
    navigateTo('/charts');
  };

  return (
    <Stack
      sx={{
        height: '100vh',
        width: '11%',
        backgroundColor: Colors[3],
        textAlign: 'center',
        position: 'fixed',
        zIndex: 999,
      }}
    >
      <Stack mt={7}>
        <Stack flexDirection='column' justifyContent='center'>
          <Button variant='text' onClick={handleDataManagementClick}>
            <Typography variant='h6' color='white'>
              ניהול מידע
            </Typography>
          </Button>

          <Button variant='text' onClick={handleDisplayChartsClick}>
            <Typography variant='h6' color='white'>
              הצג נתונים
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Side;
