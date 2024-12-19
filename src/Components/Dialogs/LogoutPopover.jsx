import React, { useState } from 'react';
import Axios from 'axios';
import { useAtom } from 'jotai';
import { Button, TextField, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userAtom, companyAtom } from '../../helpers/jotai';
import Colors from '../../helpers/colors';

const EsekDBUrl = import.meta.env.VITE_API_URL_ESEK_DB

const LogoutPopover = ({ onClose }) => {
  const navigateTo = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  const [, setCompany] = useAtom(companyAtom);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogout = async () => {
    setUser({
      username: '',
      userLevel: null,
      userId: '',
      isLoggedIn: false,
    });

    setCompany({
      officialName: '',
      typicalName: '',
      companyId: '',
      isLoggedIn: false,
    });
    onClose();
    navigateTo('/');
  };

  return (
    <Stack width={300} minHeight={300} dir="rtl" textAlign='center' justifyContent='space-between' bgcolor={Colors[0]}>
      <Typography variant='h4' sx={{ p: 1, bgcolor: Colors[1], color: Colors[5] }}>
        {user.username}
      </Typography>

      {
        user.userLevel &&
        <Typography variant='h6' sx={{ p: 1, color: Colors[4] }}>
          {user.userLevel}
        </Typography>
      }

      <Stack sx={{ px: 4, justifyContent: 'center' }}>
        <Button
          // onClick={handleLogout}
          variant='text'
          sx={{ ':hover': { bgcolor: Colors[2] }, fontWeight: 'bold' }}
        >
          <Typography sx={{ textAlign: 'center', color: Colors[5] }}>
            {'עריכת פרטים'}
          </Typography>
        </Button>
      </Stack>

      <Stack sx={{ justifyContent: 'center', bgcolor: Colors[1], padding: 2 }}>
        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{ bgcolor: Colors[6], ':hover': { bgcolor: Colors[7] }, fontWeight: 'bold' }}
        >
          {'התנתק'}
        </Button>
      </Stack>
    </Stack>
  );
};

export default LogoutPopover;
