import React from 'react';
import { Stack, Box } from '@mui/material';
import Header from './Basic/Header';
import Charts from './body/Charts';
import Side from './Basic/Side';
import Colors from '../helpers/colors';
import BackgroundImage from './backGround.png';

const Body = () => {
  return (
    <Stack
      sx={{
        height: '100%',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'fixed', // Change to fixed to ensure it covers the entire screen and stays in place
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.5, // Adjust the opacity for transparency
          zIndex: 0,
        }}
      />

      <Stack dir="rtl" height="100%" width="100%">
        <Header />

        <Stack flexDirection="row">
          <Side />

          <Stack
            sx={{
              pr: '5%',
              pt: 5,
              width: '100%',
              minHeight: '100vh',
              overflowY: 'auto',
              // bgcolor: Colors[1],
              padding: 3,
              borderRadius: '10px',
              // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              margin: 3,
            }}
          >
            <Charts />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Body;
