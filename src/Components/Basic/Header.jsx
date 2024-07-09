import React from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import Colors from '../../helpers/colors';

const Header = () => {
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
        height: 50,
        width: '100%',
        backgroundColor: Colors[4],
        flexDirection: 'row',
        textAlign: 'center',
        position: 'fixed',
        zIndex: 1000,
      }}
    >
      <Stack mr={4} justifyContent='center'>
        <Typography variant='h6'>
          CalculShop
        </Typography>
      </Stack>

      <Stack justifyContent='center' width='100%'>
        <Stack flexDirection='row' justifyContent='center' gap={10}>
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

export default Header;
