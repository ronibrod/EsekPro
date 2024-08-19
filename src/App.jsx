import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import Basic from './Components/Basic';
import Home from './Components/body/Home';
import Charts from './Components/body/Charts'
import DataManagement from './Components/body/DataManagement';
import AIManagement from './Components/body/AIManagement';
import WorkersManagement from './Components/body/WorkersManagement';
import Colors from './helpers/colors';

const App = () => {
  return (
    <Stack sx={{ height: '100%', backgroundColor: `${Colors[0]}CC` }}>
      <BrowserRouter>
        <Basic>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/dataManagement" element={<DataManagement />} />
            <Route path="/AIManagement" element={<AIManagement />} />
            <Route path="/workersManagement" element={<WorkersManagement />} />
          </Routes>
        </Basic>
      </BrowserRouter>
    </Stack>
  );
};

export default App;
