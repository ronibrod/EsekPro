import React from 'react';
import { Stack, Box } from '@mui/material';
import Background from './BackGround.jsx';
import Header from './Header';
import Side from './Side';

const Basic = ({ children }) => {
  return (
    <Stack
      sx={{
        height: '100%',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Background />

      <Stack dir="rtl" height="100%" width="100%">
        <Header />

        <Stack flexDirection="row">
          <Side />

          <Stack
            sx={{
              mr: '12%',
              px: 5,
              pt: 10,
              width: '100%',
              minHeight: '100vh',
              overflowY: 'auto',
              zIndex: 1,
            }}
          >
            {children}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Basic;
