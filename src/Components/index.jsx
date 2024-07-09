import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import Header from './Basic/Header';
import Charts from './body/Charts';
import Side from './Basic/Side';
import Colors from '../helpers/colors'

const Body = () => {
  return (
    <Stack dir='rtl' height='100%' width='100%'>
      <Header />

      <Stack flexDirection='row'>
        <Side />

        <Stack
          sx={{
            pr: '11%',
            pt: 5,
            width: '100%',
            minHeight: '100vh',
            overflowY: 'auto',
            bgcolor: Colors[1],
          }}
        >
          <Charts />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Body;
