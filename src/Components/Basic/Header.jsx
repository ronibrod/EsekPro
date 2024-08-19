import React, { useState } from 'react';
import { Stack, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import LoginIcon from '@mui/icons-material/Login';
import { useAtom } from 'jotai';
import { userAtom } from '../../helpers/jotai';
import LoginDialog from './Login';
import Colors from '../../helpers/colors';

const Header = () => {
  const navigateTo = useNavigate();
  const [user,] = useAtom(userAtom);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLoginClick = () => setLoginOpen(true);
  const handleClose = () => setLoginOpen(false);

  const handleHomeClick = () => {
    navigateTo('/');
  };

  const handleHelpClick = () => {
    navigateTo('/help');
  };

  // const handleLoginClick = () => {
  //   navigateTo('/login');
  // };

  return (
    <Stack
      sx={{
        height: 60,
        width: '100%',
        backgroundColor: `${Colors[5]}EE`,
        flexDirection: 'row',
        textAlign: 'center',
        position: 'fixed',
        zIndex: 999,
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        justifyContent: 'space-between',
        borderRadius: '0 0 10px 10px',
      }}
    >
      <Box component='img' src='src/Components/Basic/logo.webp' alt='Logo' sx={{ height: 60, width: '12%', borderBottomRightRadius: '10px', cursor: 'pointer' }} onClick={handleHomeClick} />

      <Stack flexDirection='row'  ml={5} gap={4} alignItems='center'>
        <Button variant='text' onClick={handleHelpClick} sx={{ color: Colors[6], textTransform: 'none' }}>
          <HelpIcon sx={{ marginLeft: '8px' }} />
          <Typography variant='h6'>עזרה</Typography>
        </Button>

        <Button variant='text' onClick={handleLoginClick} sx={{ color: Colors[6], textTransform: 'none' }}>
          <LoginIcon sx={{ marginLeft: '8px' }} />
          <Typography variant='h6'>התחברות</Typography>
        </Button>

        <Stack flexDirection='row' alignItems='center' sx={{ color: Colors[6] }}>
          <AccountCircleIcon sx={{ marginLeft: '8px' }} />
          <Typography variant='h6'>{user.isLoggedIn ? user.username : 'אח שלי'}</Typography>
        </Stack>

        <LoginDialog open={loginOpen} onClose={handleClose} />
      </Stack>
    </Stack>
  );
};

export default Header;
