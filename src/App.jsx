import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import Body from './Components';
import DataManagement from './Components/body/DataManagement';

const App = () => {
  return (
    <Stack sx={{ height: '100%', backgroundColor: grey[100] }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/charts" />} />
          <Route path="/charts" element={<Body />} />
          <Route path="/dataManagement" element={<DataManagement />} />
        </Routes>
      </BrowserRouter>
    </Stack>
  );
};

export default App;
