import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useAtom } from 'jotai';
import { userAtom, companyAtom } from '../../../helpers/jotai';
import { Stack, Typography, Box, Button, Grid, List, ListItem, ListItemText, Divider, TextField, Card, CardContent, CardActions } from '@mui/material';
import { AddCircleOutline, Business } from '@mui/icons-material';
import CreateCompanyDialog from '../../Dialogs/CreateCompanyDialog';
import FooterSection from './FooterSection';
import Colors from '../../../helpers/colors';

const EsekDBUrl = import.meta.env.VITE_API_URL_ESEK_DB;

const InUserHome = () => {
  const [user, satUser] = useAtom(userAtom);
  const [company, setCompany] = useAtom(companyAtom);
  const [allUsersCompanies, setAllUsersCompanies] = useState([]);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [personalReminders] = useState([
    { title: 'עדכון: מסמכי החוזה דורשים חתימה', description: 'החוזה זמין לחתימה באיזור האישי שלך.' },
    { title: 'התראה: הדוח השבועי שלך זמין', description: 'יש לך עדכון על הביצועים שלך לחודש זה.' },
  ]);

  useEffect(() => {
    const handleGetUsersCompanies = async () => {
      const { data } = await Axios.get(`${EsekDBUrl}/getUsersCompanies`, {
        params: {
          query: JSON.stringify({ user_name: user.username }),
        },
      });
      setAllUsersCompanies(data);
    };

    handleGetUsersCompanies();
  }, [user]);

  const handleLoginCompany = async (companyId) => {
    const [selectedCompany] = allUsersCompanies.filter(company => company._id === companyId);
    setCompany({
      officialName: selectedCompany.official_name,
      typicalName: selectedCompany.typical_name,
      companyId: selectedCompany._id,
      isLoggedIn: true,
    });

    const { data } = await Axios.get(`${EsekDBUrl}/getWorkerLevel`, {
      params: {
        query: JSON.stringify({ company_name: selectedCompany.official_name, worker_id: user.userId }),
      },
    });

    console.log(data);

    satUser(user => ({
      ...user,
      userLevel: data.user_level,
    }));
  };

  const handleCreateNewCompany = () => {
    if (newCompanyName) {
      // Logic for creating a new company in the backend.
      console.log(`Creating company: ${newCompanyName}`);
      // Reset the input field after creation
      setNewCompanyName('');
    }
  };

  return (
    <Stack>
      <Stack flexDirection='row' justifyContent='space-around'>
        <Stack spacing={4} mt={2} width='40%'>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h2" color={Colors[13]}>
              {'היי ' + (user.typicalName || user.username)}
            </Typography>
          </Box>

          <Stack alignItems='center' flexDirection='row' justifyContent='center' gap={2}>
            <Box component='img' src='src/Components/Basic/logo.webp' alt='EsekProLogo' sx={{ height: 50, borderRadius: '10px' }} />

            <Typography variant="h5" color={Colors[5]}>
              {'שמחים לראותך איתנו'}
            </Typography>
          </Stack>

          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h4" color={Colors[13]}>
              התראות ועדכונים אישיים
            </Typography>
            <List sx={{ bgcolor: Colors[1], borderRadius: 2, p: 2 }}>
              {personalReminders.map((reminder, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ padding: 2, textAlign: 'right' }}>
                    <ListItemText
                      primary={reminder.title}
                      secondary={reminder.description}
                      sx={{ textAlign: 'right', color: Colors[5] }}
                    />
                  </ListItem>
                  {index < personalReminders.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Stack>

        <Divider orientation="vertical" flexItem variant="middle" />

        <Stack spacing={4} p={4} width='60%'>
          <Typography variant="h4" color={Colors[13]} sx={{ textAlign: 'center' }}>
            {'עסקים שהינך רשום בהם'}
          </Typography>

          {
            allUsersCompanies.length === 0 &&
            <Typography variant="h5" color={Colors[5]} sx={{ textAlign: 'center' }}>
              {'אין לך עסקים'}
            </Typography>
          }

          {
            allUsersCompanies.length > 0 &&
            <Grid container width='100%' spacing={4} justifyContent="center">
              {allUsersCompanies.map(company => (
                <Grid item xs={12} md={6} key={company._id}>
                  <Button
                    sx={{ padding: 0, borderRadius: 3, width: '100%' }}
                    onClick={() => handleLoginCompany(company._id)}
                  >
                    <Card sx={{ p: 2, width: '100%', height: 200, bgcolor: Colors[1], ':hover': { bgcolor: Colors[2] }, boxShadow: 3, borderRadius: 3 }}>
                      <Stack height='100%' justifyContent='space-between'>
                        <CardContent alignItems='center'>
                          <Stack flexDirection='row' alignItems='center' gap={2}>
                            <Business />
                            <Typography variant="h5" color={Colors[5]}>
                              {company.typical_name}
                            </Typography>
                          </Stack>

                          <Typography variant="h5" color={Colors[5]}>
                              {company.officialName}
                            </Typography>
                        </CardContent>
                        <Typography color={Colors[6]}>
                          {'כניסה'}
                        </Typography>
                      </Stack>
                    </Card>
                  </Button>
                </Grid>
              ))}
            </Grid>
          }

          {/* <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Typography variant="h5" color={Colors[5]}>
              צור חברה חדשה
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<AddCircleOutline />}
                onClick={handleCreateNewCompany}
                sx={{ bgcolor: Colors[6], color: Colors[0], fontWeight: 'bold' }}
              >
                יצירת חברה
              </Button>
            </Box>
          </Box> */}
        </Stack>
      </Stack>

      <FooterSection />
    </Stack>
  );
};

export default InUserHome;
