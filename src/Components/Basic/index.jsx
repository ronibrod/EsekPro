import React from 'react';
import { useAtom } from 'jotai';
import { Stack } from '@mui/material';
import Background from './BackGround.jsx';
import Header from './Header';
import Side from './Side';
import { userAtom, companyAtom } from '../../helpers/jotai';

const Basic = ({ children }) => {
  const [user] = useAtom(userAtom) || {};
  const [company] = useAtom(companyAtom) || {};

  const isUserLoggedIn = user?.isLoggedIn || false;
  const isCompanyLoggedIn = company?.isLoggedIn || false;

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

        {!isUserLoggedIn && (
          <Stack flexDirection="row">
            <Stack
              sx={{
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
        )}

        {isUserLoggedIn && !isCompanyLoggedIn && (
          <Stack flexDirection="row">
            <Stack
              sx={{
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
        )}

        {isCompanyLoggedIn && (
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
        )}
      </Stack>
    </Stack>
  );
};

export default Basic;
