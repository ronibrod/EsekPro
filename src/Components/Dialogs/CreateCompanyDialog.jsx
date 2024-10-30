import React, { useState } from 'react';
import Axios from 'axios';
import { useAtom } from 'jotai';
import { Box, Button, Dialog, Divider, IconButton, Paper, Slider, Stack, TextField, Typography } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { userAtom, companyAtom } from '../../helpers/jotai';
import Colors from '../../helpers/colors';

// const EsekDBUrl = import.meta.env.VITE_API_URL_ESEK_DB;
const EsekDBUrl = 'https://esekdb-dot-esekpro.lm.r.appspot.com';

const CreateCompanyDialog = () => {
  const [user, setUser] = useAtom(userAtom);
  const [, setCompany] = useAtom(companyAtom);
  const [companyOfficialName, setCompanyOfficialName] = useState('');
  const [companyTypicalName, setCompanyTypicalName] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');
  const [error, setError] = useState('');
  const [isCreateCompanyDialogOpen, setIsCreateCompanyDialogOpen] = useState(false);

  const handleOpenCreateCompany = () => setIsCreateCompanyDialogOpen(true);
  const handleCloseCreateCompany = () => setIsCreateCompanyDialogOpen(false);

  const handleCreateNewCompany = async () => {
    if (!companyOfficialName || !companyPassword) return;

    try {
      const response = await Axios.post(`${EsekDBUrl}/createCompany`, {
        user_name: user.username,
        user_id: user.userId,
        companyOfficialName,
        companyTypicalName,
        companyPassword,
      });

      if (response.status === 200) {
        setCompany({
          officialName: companyOfficialName,
          typicalName: companyTypicalName,
          companyId: response.data._id,
          isLoggedIn: true,
        });

        setUser(user => ({
          ...user,
          userLevel: 'businessOwner',
        }));

        handleCloseCreateCompany();
      } else {
        setError('שגיאה ביצירה. נסה שוב.');
      }
    } catch (error) {
      setError('שגיאה ביצירה. נסה שוב.');
    }
  };

  return (
    <Stack>
      <Stack flexDirection='row' gap={2}>
        <Button variant='text' onClick={handleOpenCreateCompany} sx={{ justifyContent: 'start', color: Colors[5], textTransform: 'none' }}>
          <AddBusinessIcon sx={{ marginLeft: '8px' }} />
          <Typography variant='h6'>{'צור עסק משלך'}</Typography>
        </Button>
        <Divider orientation="vertical" variant="middle" flexItem color={Colors[3]} />
      </Stack>
      <Dialog
        open={isCreateCompanyDialogOpen}
        onClose={handleCloseCreateCompany}
        dir="rtl"
        bgcolor={Colors[10]}
      >
        <Stack p={4} width={600} height={500} bgcolor={Colors[0]} alignItems='center'>
          <Typography variant="h4" color={Colors[13]}>
            {'יצירת עסק חדש'}
          </Typography>

          <Stack width='100%' p={2}>
            <Divider variant="middle" flexItem />
          </Stack>

          <Stack spacing={2} my={2}>
            <TextField
              label="שם רשמי"
              variant="outlined"
              fullWidth
              value={companyOfficialName}
              onChange={(e) => setCompanyOfficialName(e.target.value)}
              sx={{
                bgcolor: Colors[1],
                borderRadius: 1,
                direction: 'rtl',
                '& .MuiInputLabel-root': {
                  right: '30px',
                  left: 'unset',
                  transformOrigin: 'top right',
                },
                '& .MuiInputBase-root': {
                  direction: 'rtl',
                },
                '& .MuiOutlinedInput-input': {
                  textAlign: 'right',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  textAlign: 'right',
                },
              }}
            />
            <TextField
              label="שם יצוגי"
              variant="outlined"
              fullWidth
              value={companyTypicalName}
              onChange={(e) => setCompanyTypicalName(e.target.value)}
              sx={{
                bgcolor: Colors[1],
                borderRadius: 1,
                direction: 'rtl',
                '& .MuiInputLabel-root': {
                  right: '30px',
                  left: 'unset',
                  transformOrigin: 'top right',
                },
                '& .MuiInputBase-root': {
                  direction: 'rtl',
                },
                '& .MuiOutlinedInput-input': {
                  textAlign: 'right',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  textAlign: 'right',
                },
              }}
            />
            <TextField
              label="סיסמא"
              type="password"
              variant="outlined"
              fullWidth
              value={companyPassword}
              onChange={(e) => setCompanyPassword(e.target.value)}
              sx={{
                bgcolor: Colors[1],
                borderRadius: 1,
                direction: 'rtl',
                '& .MuiInputLabel-root': {
                  right: '30px',
                  left: 'unset',
                  transformOrigin: 'top right',
                },
                '& .MuiInputBase-root': {
                  direction: 'rtl',
                },
                '& .MuiOutlinedInput-input': {
                  textAlign: 'right',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  textAlign: 'right',
                },
              }}
            />

            {error && <Typography textAlign='center' color="error">{error}</Typography>}
          </Stack>

          <Stack>
            <Button variant='text' sx={{ ':hover': { bgcolor: Colors[1] }, textTransform: 'none', borderRadius: 4 }}>
              <Typography variant='h6'>{'הצג עוד'}</Typography>
              <ExpandMoreIcon />
            </Button>
          </Stack>

          <Stack mt={2}>
            <Button
              variant='text'
              onClick={handleCreateNewCompany}
              sx={{
                width: 100,
                bgcolor: Colors[6],
                borderRadius: 1,
                ':hover': { bgcolor: Colors[7] },
              }}
            >
              <Typography variant='h6'>{'יצירה'}</Typography>
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </Stack>
  );
};

export default CreateCompanyDialog;
