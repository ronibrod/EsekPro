import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useAtom } from 'jotai';
import { Button, CircularProgress, Divider, TextField, Typography, Stack } from '@mui/material';
import { userAtom } from '../../helpers/jotai';
import Colors from '../../helpers/colors';

const EsekDBUrl = import.meta.env.VITE_API_URL_ESEK_DB;
// const EsekDBUrl = 'https://esekdb-dot-esekpro.lm.r.appspot.com';

console.log(EsekDBUrl);
console.log(import.meta.env);

const LogInUpPopover = ({ onClose }) => {
  const [, setUser] = useAtom(userAtom);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [logType, setLogType] = useState('login');
  const [isLoading, setIsLoading] = useState(true);
  const [isBackEndConnected, setIsBackEndConnected] = useState(false);

  const handleSwitchLogType = () => {
    setLogType(logType => (
      logType === 'login' ? 'signup' : 'login'
    ));
  };

  const handleSignup = async () => {
    if (!username || !password) return;

    try {
      const response = await Axios.post(`${EsekDBUrl}/signup`, {
        user_name: username,
        password,
      });

      if (response.status === 200) {
        setUser({
          username,
          userId: response.data.user_data._id,
          isLoggedIn: true,
        });
        onClose();
      } else {
        setError('שגיאה בהרשמה. נסה שוב.');
      }
    } catch (error) {
      setError('שגיאה בהרשמה. נסה שוב.');
    }
  };

  const handleLogin = async () => {
    if (!username || !password) return;

    try {
      const response = await Axios.post(`${EsekDBUrl}/login`, {
        user_name: username,
        password,
      });

      if (response.status === 200) {
        setUser({
          username,
          typicalName: response.data.user_data.typicalName || '',
          userId: response.data.user_data._id,
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

  const handleLoginFakeUser = () => {
    setUsername('Fake User');
    setPassword('1324');
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleLogin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const healthCheckBackEnd = async () => {
      try {
        const response = await Axios.get(`${EsekDBUrl}/health`);

        if (response.status === 200) {
          setIsBackEndConnected(true);
        } else {
          setIsBackEndConnected(false);
        }
      } catch (error) {
        setIsBackEndConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    healthCheckBackEnd();
  }, []);

  return (
    <Stack width={300} height={400} dir="rtl" textAlign='center'>
      {
        isLoading &&
        <Stack height='100%' alignItems='center' justifyContent='space-between'>
          <Typography variant='h4' sx={{ width: '100%', p: 1, bgcolor: Colors[1], color: Colors[5] }}>{'התחברות'}</Typography>
          <CircularProgress sx={{ mt: -5 }} />
          <Typography variant='body1' sx={{ width: '100%', p: 1, color: Colors[8] }}>{'נא המתן לבדיקת חיבור'}</Typography>
        </Stack>
      }
      {
        (!isLoading && !isBackEndConnected) &&
        <Stack height='100%' alignItems='center' justifyContent='space-between'>
          <Typography variant='h4' sx={{ width: '100%', p: 1, bgcolor: Colors[1], color: Colors[5] }}>{'התחברות'}</Typography>
          <Typography variant='h4' sx={{ width: '100%', p: 1, color: Colors[8] }}>{'לא ניתן כרגע להתחבר'}</Typography>
          <Typography variant='body1' sx={{ width: '100%', p: 1, color: Colors[8] }}>{'יתכן והמערכת במהלך תיקון, אנא נסו שוב מאוחר יותר.'}</Typography>
        </Stack>
      }
      {
        (!isLoading && isBackEndConnected) &&
        <Stack height='100%' justifyContent='space-between'>
          {
            logType === 'login' &&
            <Typography variant='h4' sx={{ p: 1, bgcolor: Colors[1], color: Colors[5] }}>
              {'התחברות'}
            </Typography>
          }

          {
            logType === 'signup' &&
            <Typography variant='h4' sx={{ p: 1, bgcolor: Colors[1], color: Colors[7] }}>
              {'הרשמה'}
            </Typography>
          }
          <Stack sx={{ height: '100%', bgcolor: Colors[0], px: 4 }} justifyContent='space-between'>
            <Stack spacing={2} mt={4}>
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

            {
              logType === 'login' &&
              <Stack>
                <Stack sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography sx={{ textAlign: 'center', color: Colors[5] }}>
                    {'התחבר באמצעות'}
                  </Typography>
                  <Button
                    onClick={handleLoginFakeUser}
                    variant='text'
                  >
                    <Typography sx={{ textAlign: 'center', color: Colors[4] }}>
                      {'משתמש מדומה'}
                    </Typography>
                  </Button>
                </Stack>

                <Divider />
              </Stack>
            }

            <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
              {
                logType === 'login' &&
                <Typography sx={{ textAlign: 'center', color: Colors[5] }}>
                  {'אין לך חשבון?'}
                </Typography>
              }

              {
                logType === 'signup' &&
                <Typography sx={{ textAlign: 'center', color: Colors[7] }}>
                  {'יש לך חשבון?'}
                </Typography>
              }

              {
                logType === 'login' &&
                <Button
                  onClick={handleSwitchLogType}
                  variant='text'
                  sx={{ width: 50, ':hover': { border: 1, borderColor: Colors[6] }, color: Colors[6], fontWeight: 'bold' }}
                >
                  {'הירשם'}
                </Button>
              }

              {
                logType === 'signup' &&
                <Button
                  onClick={handleSwitchLogType}
                  variant='text'
                  sx={{ width: 50, ':hover': { border: 1, borderColor: Colors[5] }, fontWeight: 'bold' }}
                >
                  {'התחבר'}
                </Button>
              }
            </Stack>
          </Stack>

          <Stack sx={{ justifyContent: 'center', bgcolor: Colors[1], padding: 2 }}>
            {
              logType === 'login' &&
              <Button
                onClick={handleLogin}
                variant="contained"
                sx={{ bgcolor: Colors[4], ':hover': { bgcolor: Colors[5] }, fontWeight: 'bold' }}
              >
                {'התחבר'}
              </Button>
            }

            {
              logType === 'signup' &&
              <Button
                onClick={handleSignup}
                variant="contained"
                sx={{ bgcolor: Colors[6], ':hover': { bgcolor: Colors[7] }, fontWeight: 'bold' }}
              >
                {'הירשם'}
              </Button>
            }
          </Stack>
        </Stack>
      }
    </Stack>
  );
};

export default LogInUpPopover;
