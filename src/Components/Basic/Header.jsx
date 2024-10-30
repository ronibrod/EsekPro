import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Stack, Typography, Button, IconButton, Box, Divider, InputBase, Popover } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LoginIcon from '@mui/icons-material/Login';
import { userAtom, companyAtom } from '../../helpers/jotai';
import CreateCompanyDialog from '../Dialogs/CreateCompanyDialog';
import LoginPopover from '../Dialogs/LogInSignUpPopover';
import LogoutPopover from '../Dialogs/LogoutPopover'
import HelpDialog from '../Dialogs/HelpDialog';
import Colors from '../../helpers/colors';
import LogoImage from './logo.webp';
import CoffeeShopLogoImage from './coffee_shop_logo.png';

const Header = () => {
  const navigateTo = useNavigate();
  const [user,] = useAtom(userAtom);
  const [company,] = useAtom(companyAtom);
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorElUserLogin, setAnchorElUserLogin] = useState(null);

  const handleLoginClick = () => setLoginOpen(true);
  const handleClose = () => setLoginOpen(false);

  const handleHomeClick = () => {
    navigateTo('/');
  };

  const handleHelpClick = () => {
    navigateTo('/help');
  };

  // const handleLoginClick = () => {
  //   navigateTo('/login');
  // };

  const handleUserLoginPopoverOpen = (e) => setAnchorElUserLogin(e.currentTarget);
  const handleUserLoginPopoverClose = () => setAnchorElUserLogin(null);

  const openUserLoginPopover = Boolean(anchorElUserLogin);

  return (
    <Stack
      sx={{
        height: 60,
        width: '100%',
        backgroundColor: `${Colors[1]}EE`,
        flexDirection: 'row',
        textAlign: 'center',
        position: 'fixed',
        zIndex: 999,
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        // justifyContent: 'space-between',
        borderRadius: '0 0 10px 10px',
      }}
    >
      <Stack width='12%'>
        <Box component='img' src={LogoImage} alt='EsekProLogo' sx={{ height: 60, width: '100%', borderBottomRightRadius: '10px', cursor: 'pointer' }} onClick={handleHomeClick} />
      </Stack>

      <Stack mr='3%' width='85%' flexDirection='row' alignItems='center' justifyContent='space-between'>
        {
          user?.isLoggedIn &&
          <Stack width='20%'>
            {
              company.isLoggedIn &&
              <Button variant='text' onClick={handleUserLoginPopoverOpen} sx={{ color: Colors[5], textTransform: 'none' }}>
                <Stack flexDirection='row' justifyContent='start' alignItems='center' gap={3}>
                  <Typography variant='h5' color={Colors[5]}>{'קפה סקריפט'}</Typography>
                  <Box component='img' src={CoffeeShopLogoImage} alt='CompannyLogo' sx={{ height: 50, width: 50, borderRadius: 5 }} />
                </Stack>
              </Button>
            }

            {
              !company.isLoggedIn &&
              <CreateCompanyDialog />
            }
          </Stack>
        }

        {
          (company?.isLoggedIn && user?.isLoggedIn) &&
          <Stack flexDirection='row'>
            <Stack
              sx={{
                px: 2,
                justifyContent: 'center',
                alignItems: 'flex-end',
                borderRadius: 3,
                backgroundColor: Colors[2],
                marginLeft: 0,
                height: 40,
                width: 200,
                '&:hover': {
                  backgroundColor: Colors[3],
                },
              }}
            >
              <Stack
                sx={{
                  // padding: theme.spacing(0, 2),
                  // height: '100%',
                  position: 'absolute',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: Colors[5]
                }}
              >
                <SearchIcon />
              </Stack>

              <InputBase
                placeholder="חיפוש…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{
                  color: 'inherit',
                  width: '100%',
                  '& .MuiInputBase-input': {
                    // padding: theme.spacing(1, 1, 1, 0),
                    // vertical padding + font size from searchIcon
                    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                    // transition: theme.transitions.create('width'),
                    // [theme.breakpoints.up('sm')]: {
                    //   width: '12ch',
                    //   '&:focus': {
                    //     width: '20ch',
                    //   },
                    // },
                  },
                }}
              />
            </Stack>
          </Stack>
        }

        {
          !company?.isLoggedIn &&
          <Box flexItem={1} />
        }

        <Stack flexDirection='row' ml={5} gap={4}>
          {
            user?.isLoggedIn &&
            <IconButton onClick={handleHelpClick} sx={{ color: Colors[5] }}>
              <NotificationsIcon />
            </IconButton>
          }

          <HelpDialog />

          <Divider orientation="vertical" variant="middle" flexItem color={Colors[5]} />

          {
            !user?.isLoggedIn &&
            <Button variant='text' onClick={handleUserLoginPopoverOpen} sx={{ color: Colors[5], textTransform: 'none' }}>
              <LoginIcon sx={{ marginLeft: '8px' }} />
              <Typography variant='h6'>{'התחברות'}</Typography>
            </Button>
          }

          {
            user?.isLoggedIn &&
            <Button variant='text' onClick={handleUserLoginPopoverOpen} sx={{ color: Colors[5], textTransform: 'none' }}>
              <AccountCircleIcon sx={{ marginLeft: '8px' }} />
              <Typography variant='h6'>{user.username}</Typography>
            </Button>
          }

          <Popover
            id="userLogin-popover"
            open={openUserLoginPopover}
            anchorEl={anchorElUserLogin}
            onClose={handleUserLoginPopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {
              !user?.isLoggedIn &&
              <LoginPopover onClose={handleUserLoginPopoverClose} />
            }

            {
              user?.isLoggedIn &&
              <LogoutPopover onClose={handleUserLoginPopoverClose} />
            }
          </Popover>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Header;
