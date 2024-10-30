import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import Basic from './Components/Basic';
import Home from './Components/body/Home';
import Charts from './Components/body/Charts'
import DataManagement from './Components/body/DataManagement';
import Summary from './Components/body/Summary';
import AIManagement from './Components/body/AIManagement';
import WorkersManagement from './Components/body/WorkersManagement';
import ProductsProfit from './Components/body/ProductsProfitManagement'
import SettingsManagement from './Components/body/SettingsManagement';
import { userAtom, companyAtom } from './helpers/jotai';
import Colors from './helpers/colors';

const App = () => {
  const [user,] = useAtom(userAtom);
  const [company,] = useAtom(companyAtom);
  const [onlyHomePage, setOnlyHomePage] = useState(true);

  useEffect(() => {
    if (!user.isLoggedIn || !company.isLoggedIn) setOnlyHomePage(true);
    if (user.isLoggedIn && company.isLoggedIn) setOnlyHomePage(false);
  }, [user, company]);

  return (
    <Stack sx={{ height: '100%', backgroundColor: `${Colors[0]}CC` }}>
      <BrowserRouter>
        <Basic>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            {
              onlyHomePage ? (
                <Route path="*" element={<Navigate to="/home" />} />
              ) : (
                <>
                  <Route path="/charts" element={<Charts />} />
                  <Route path="/dataManagement" element={<DataManagement />} />
                  <Route path="/summary" element={<Summary />} />
                  <Route path="/AIManagement" element={<AIManagement />} />
                  <Route path="/productsProfit" element={<ProductsProfit />} />
                  <Route path="/workersManagement" element={<WorkersManagement />} />
                  <Route path="/settings" element={<SettingsManagement />} />
                </>
              )
            }
          </Routes>
        </Basic>
      </BrowserRouter>
    </Stack>
  );
};

export default App;
