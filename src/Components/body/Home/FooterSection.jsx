import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import Colors from '../../../helpers/colors';

const FooterSection = () => {
  return (
    <Box sx={{ mt: 5, bgcolor: Colors[0], padding: 4 }}>
      <Grid container spacing={4} justifyContent="space-between">
        <Grid item xs={12} md={4}>
          <Typography variant="h6" color={Colors[13]} gutterBottom>
            אודותינו
          </Typography>
          <Typography variant="body2" color={Colors[5]}>
            אנו מספקים פתרונות טכנולוגיים לעסקים, במטרה לייעל את העבודה ולהשיג יתרון תחרותי באמצעות כלים מתקדמים לניהול נתונים.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" color={Colors[13]} gutterBottom>
            פרטיות
          </Typography>
          <Typography variant="body2" color={Colors[5]}>
            אנו מחויבים לשמירה על פרטיות המידע שלך ולהגנה על הנתונים שהנך משתף איתנו.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" color={Colors[13]} gutterBottom>
            יצירת קשר
          </Typography>
          <Typography variant="body2" color={Colors[5]}>
            אם יש לך שאלות או הצעות, אנא פנה אלינו דרך הטופס שבאתר או התקשר לשירות הלקוחות שלנו.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FooterSection;
