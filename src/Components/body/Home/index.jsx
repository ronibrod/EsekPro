import React from 'react';
import { Stack, Typography, Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Colors from '../../../helpers/colors';

const Home = () => {
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    navigate('/learn-more');
  };

  return (
    <Stack height="100%" width="100%">
        <Stack
          // sx={{
          //   pr: '15%',
          //   pt: 5,
          //   width: '100%',
          //   minHeight: '100vh',
          //   overflowY: 'auto',
          //   bgcolor: Colors[1],
          //   padding: 3,
          //   boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)'
          // }}
        >
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h2" color={Colors[6]} gutterBottom>
              ניהול מידע ונתונים בעסק שלך
            </Typography>
            <Typography variant="h5" color={Colors[5]}>
              פתרונות חכמים לניהול, עיבוד וניתוח מידע עסקי.
            </Typography>
            <Button 
              variant="contained" 
              onClick={handleLearnMoreClick}
              sx={{ 
                mt: 4, 
                bgcolor: Colors[6], 
                color: Colors[0], 
                ':hover': { bgcolor: Colors[7] },
                fontSize: '1.2rem',
                padding: '10px 20px',
                borderRadius: '20px'
              }}
            >
              למידע נוסף
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h4" color={Colors[5]} gutterBottom>
              למה לבחור בנו?
            </Typography>
            <Typography variant="body1" color={Colors[5]} sx={{ maxWidth: '800px', margin: '0 auto' }}>
              אנחנו מציעים פתרונות חדשניים לניהול מידע ונתונים, תוך שימוש בטכנולוגיות מתקדמות ובשיטות עבודה מקצועיות.
              צוות המומחים שלנו מוכן לעזור לך למקסם את הנתונים שלך ולשפר את הביצועים העסקיים שלך.
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ bgcolor: Colors[0], padding: 4, borderRadius: 2, textAlign: 'center', boxShadow: 3 }}>
                <Typography variant="h5" color={Colors[5]} gutterBottom>
                  פתרונות ניהול נתונים
                </Typography>
                <Typography variant="body1" color={Colors[5]}>
                  אנחנו מספקים כלים לניהול יעיל של נתונים, כולל עיבוד וניתוח מתקדם, שמאפשרים לך לקבל החלטות מבוססות נתונים.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ bgcolor: Colors[0], padding: 4, borderRadius: 2, textAlign: 'center', boxShadow: 3 }}>
                <Typography variant="h5" color={Colors[5]} gutterBottom>
                  דוחות וניתוחים
                </Typography>
                <Typography variant="body1" color={Colors[5]}>
                  אנחנו מספקים דוחות מותאמים אישית וניתוחים מעמיקים כדי שתוכל להבין את הנתונים שלך בצורה טובה יותר.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Stack>
    </Stack>
  );
};

export default Home;
