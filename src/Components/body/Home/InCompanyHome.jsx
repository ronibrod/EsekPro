import React, { useState } from 'react';
import { Stack, Typography, Box, Grid, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import Colors from '../../../helpers/colors';
import FooterSection from './FooterSection';

const InCompanyHome = () => {
  const [notifications] = useState([
    { title: 'תזכורת: ישיבת צוות ב-15:00', description: 'וודא כי כל המסמכים מוכנים.' },
    { title: 'עדכון חדש: דוח מכירות יולי', description: 'הדוח זמין כעת לצפייה במערכת.' },
    { title: 'התראה: תוקף החשבון יפוג בעוד שבוע', description: 'אנא חידשו את המנוי בהקדם.' },
  ]);

  const [companyReminders] = useState([
    { title: 'בדיקה שנתית', description: 'החוזה של החברה דורש בדיקה חודש הבא.' },
    { title: 'תזכורת שכר', description: 'עדכון על שכר העובדים יש להגיש עד סוף החודש.' },
  ]);

  return (
    <Stack height="100%" width="100%">
      {/* Personal and Company Notifications */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h2" color={Colors[13]} gutterBottom>
          התראות ועדכונים אישיים
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ bgcolor: Colors[0], padding: 4, borderRadius: 2, textAlign: 'center', boxShadow: 3 }}>
              <Typography variant="h5" color={Colors[5]} gutterBottom>
                התראות אישיות
              </Typography>
              <List>
                {notifications.map((notification, index) => (
                  <Stack key={index}>
                    <ListItem>
                      <ListItemText
                        primary={notification.title}
                        secondary={notification.description}
                        sx={{ textAlign: 'right' }}
                      />
                    </ListItem>
                    {index < notifications.length - 1 && <Divider />}
                  </Stack>
                ))}
              </List>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ bgcolor: Colors[0], padding: 4, borderRadius: 2, textAlign: 'center', boxShadow: 3 }}>
              <Typography variant="h5" color={Colors[5]} gutterBottom>
                עדכונים ותזכורות החברה
              </Typography>
              <List>
                {companyReminders.map((reminder, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={reminder.title}
                        secondary={reminder.description}
                        sx={{ textAlign: 'right' }}
                      />
                    </ListItem>
                    {index < companyReminders.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Future Company Dashboard Widgets */}
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h4" color={Colors[13]} gutterBottom>
          ווידג'טים ודוחות חכמים
        </Typography>
        <Typography variant="body1" color={Colors[5]} sx={{ maxWidth: '800px', margin: '0 auto', mb: 4 }}>
          תוכל לגשת לדוחות חכמים וכלים נוספים כדי לשפר את יעילות החברה שלך.
        </Typography>
        <Button variant="contained" sx={{ bgcolor: Colors[6], color: Colors[0], ':hover': { bgcolor: Colors[7] } }}>
          גש לדוחות נוספים
        </Button>
      </Box>

      <FooterSection />
    </Stack>
  );
};

export default InCompanyHome;
