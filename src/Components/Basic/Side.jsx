import React from 'react';
import { useAtom } from 'jotai';
import { Stack, Typography, Button, Box } from '@mui/material';
import { Home, AttachMoney, BarChart, Storage, AutoAwesome, Engineering, PendingActions, Settings, Help } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { userAtom, companyAtom, authorizationAtom } from '../../helpers/jotai';
import Colors from '../../helpers/colors';

const Side = () => {
  const navigateTo = useNavigate();
  const [user,] = useAtom(userAtom);
  const [company,] = useAtom(companyAtom);
  const [authorization,] = useAtom(authorizationAtom);

  const handleNavigationClick = (path) => {
    navigateTo(path);
  };

  return (
    <Stack
      sx={{
        height: '100vh',
        width: '12%',
        backgroundColor: `${Colors[11]}FF`,
        textAlign: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        zIndex: 998,
        padding: '20px 0',
        boxShadow: '2px 0 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px 0 0 10px',
      }}
    >
      <Stack mt={7} spacing={0}>
        <Button
          onClick={() => handleNavigationClick('/')}
          sx={{
            color: Colors[13],
            justifyContent: 'flex-start',
            padding: '10px 20px',
            textTransform: 'none',
            '&:hover': { backgroundColor: Colors[12] },
            borderRadius: '20px 0 0 20px',
          }}
        >
          <Home sx={{ marginLeft: '8px' }} />
          <Typography variant='h6'>
            עמוד הבית
          </Typography>
        </Button>

        {
          authorization.saleStatistics.includes(user.userLevel) &&
          <Button
            onClick={() => handleNavigationClick('/AIManagement')}
            sx={{
              color: Colors[13],
              justifyContent: 'flex-start',
              padding: '10px 20px',
              textTransform: 'none',
              '&:hover': { backgroundColor: Colors[12] },
              borderRadius: '20px 0 0 20px',
            }}
          >
            <AutoAwesome sx={{ marginLeft: '8px' }} />
            <Typography variant='h6'>
              נתוני מכירות
            </Typography>
          </Button>
        }

        <Button
          onClick={() => handleNavigationClick('/workersManagement')}
          sx={{
            color: Colors[13],
            justifyContent: 'flex-start',
            padding: '10px 20px',
            textTransform: 'none',
            '&:hover': { backgroundColor: Colors[12] },
            borderRadius: '20px 0 0 20px',
          }}
        >
          <Engineering sx={{ marginLeft: '8px' }} />
          <Typography variant='h6'>
            ניהול עובדים
          </Typography>
        </Button>

        <Button
          onClick={() => handleNavigationClick('/summary')}
          sx={{
            color: Colors[13],
            justifyContent: 'flex-start',
            padding: '10px 20px',
            textTransform: 'none',
            '&:hover': { backgroundColor: Colors[12] },
            borderRadius: '20px 0 0 20px',
          }}
        >
          <PendingActions sx={{ marginLeft: '8px' }} />
          <Typography variant='h6'>
            {'דוחות'}
          </Typography>
        </Button>

        <Button
          onClick={() => handleNavigationClick('/productsProfit')}
          sx={{
            color: Colors[13],
            justifyContent: 'flex-start',
            padding: '10px 20px',
            textTransform: 'none',
            '&:hover': { backgroundColor: Colors[12] },
            borderRadius: '20px 0 0 20px',
          }}
        >
          <AttachMoney sx={{ marginLeft: '8px' }} />
          <Typography variant='h6'>
            {'רווח מוצרים'}
          </Typography>
        </Button>

        <Button
          onClick={() => handleNavigationClick('/dataManagement')}
          sx={{
            color: Colors[13],
            justifyContent: 'flex-start',
            padding: '10px 20px',
            textTransform: 'none',
            '&:hover': { backgroundColor: Colors[12] },
            borderRadius: '20px 0 0 20px',
          }}
        >
          <Storage sx={{ marginLeft: '8px' }} />
          <Typography variant='h6'>
            עדכון מידע
          </Typography>
        </Button>

        <Button
          onClick={() => handleNavigationClick('/settings')}
          sx={{
            color: Colors[13],
            justifyContent: 'flex-start',
            padding: '10px 20px',
            textTransform: 'none',
            '&:hover': { backgroundColor: Colors[12] },
            borderRadius: '20px 0 0 20px',
          }}
        >
          <Settings sx={{ marginLeft: '8px' }} />
          <Typography variant='h6'>
            {'הגדרות'}
          </Typography>
        </Button>
      </Stack>

      <Stack spacing={2}>
        <Button
          onClick={() => handleNavigationClick('/help')}
          sx={{
            color: Colors[13],
            justifyContent: 'flex-start',
            padding: '10px 20px',
            textTransform: 'none',
            '&:hover': { backgroundColor: Colors[12] },
            borderRadius: '20px 0 0 20px',
          }}
        >
          <Help sx={{ marginLeft: '8px' }} />
          <Typography variant='h6'>
            {'עזרה'}
          </Typography>
        </Button>
      </Stack>
    </Stack>
  );
};

export default Side;
