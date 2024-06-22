import React from 'react';
import { Container } from '@mui/material';
import { grey } from '@mui/material/colors';

import Header from './header';
import TemperatureChart from './body/Graphs/TemperatureChart'
import Graphs from './body/Graphs';

const App = () => {
  return (
    <Container sx={{ height: '100vh', width: '100%', backgroundColor: grey[100] }}>
        <Header />
        
        <Graphs />
    </Container>
  );
};

export default App;
