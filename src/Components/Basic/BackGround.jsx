import React from 'react';
import { Stack, Box } from '@mui/material';
import BackgroundImage from './backGroundImage.png';
import { ChildCareTwoTone } from '@mui/icons-material';

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
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.1,
          zIndex: 0,
        }}
      />
    </Stack>
  );
};

export default Body;
