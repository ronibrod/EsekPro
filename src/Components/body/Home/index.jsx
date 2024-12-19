import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Stack } from '@mui/material';
import InCompanyHome from './InCompanyHome';
import InUserHome from './InUserHome';
import NotLoginHome from './NotLoginHome';
import { userAtom, companyAtom } from '../../../helpers/jotai';

const Home = () => {
  const [user,] = useAtom(userAtom);
  const [company,] = useAtom(companyAtom);
  const [homePage, setHomePage] = useState(null)

  useEffect(() => {
    if (!user.isLoggedIn) setHomePage('notLoginHome');
    if (user.isLoggedIn && !company.isLoggedIn) setHomePage('inUserHome');
    if (company.isLoggedIn) setHomePage('inCompanyHome');
  }, [user, company]);

  return (
    <Stack height="100%" width="100%">
      {
        homePage === 'notLoginHome' &&
        <NotLoginHome />
      }

      {
        homePage === 'inUserHome' &&
        <InUserHome />
      }

      {
        homePage === 'inCompanyHome' &&
        <InCompanyHome />
      }
    </Stack>
  );
};

export default Home;
