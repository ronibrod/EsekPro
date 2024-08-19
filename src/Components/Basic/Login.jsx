import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Stack } from '@mui/material';
import Axios from 'axios';
import { useAtom } from 'jotai';
import { userAtom } from '../../helpers/jotai';
import Colors from '../../helpers/colors';

const backEndUrl = import.meta.env.VITE_API_URL_BACK_END_URL

const LoginDialog = ({ open, onClose }) => {
  const [, setUser] = useAtom(userAtom);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await Axios.post(`${backEndUrl}/login`, {
        username,
        password
      });

      if (response.status === 200) {
        // Handle successful login logic here (e.g., store token, redirect)
        setUser({
          username,
          isLoggedIn: true,
        });
        onClose();
      } else {
        setError('שם משתמש או סיסמא לא נכונים');
      }
    } catch (error) {
      setError('שגיאה בהתחברות. נסה שוב.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} dir="rtl">
      <DialogTitle sx={{ textAlign: 'center', bgcolor: Colors[1], color: Colors[5] }}>
        התחברות
      </DialogTitle>
      <DialogContent sx={{ bgcolor: Colors[0], p: 4 }}>
        <Stack spacing={2} my={4}>
          <TextField
            label="שם משתמש"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              bgcolor: Colors[1],
              borderRadius: 1,
              direction: 'rtl',
              '& .MuiInputLabel-root': {
                right: '30px',
                left: 'unset',
                transformOrigin: 'top right',
              },
              '& .MuiInputBase-root': {
                direction: 'rtl',
              },
              '& .MuiOutlinedInput-input': {
                textAlign: 'right',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                textAlign: 'right',
              },
            }}
          />
          <TextField
            label="סיסמא"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              bgcolor: Colors[1],
              borderRadius: 1,
              direction: 'rtl',
              '& .MuiInputLabel-root': {
                right: '30px',
                left: 'unset',
                transformOrigin: 'top right',
              },
              '& .MuiInputBase-root': {
                direction: 'rtl',
              },
              '& .MuiOutlinedInput-input': {
                textAlign: 'right',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                textAlign: 'right',
              },
            }}
          />
          {error && <Typography color="error">{error}</Typography>}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', bgcolor: Colors[1], padding: 2, mt: -4 }}>
        <Button
          onClick={handleLogin}
          variant="contained"
          sx={{ bgcolor: Colors[6], ':hover': { bgcolor: Colors[7] }, fontWeight: 'bold' }}
        >
          התחבר
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
