import React from 'react';
import { Stack, Typography, Box, Button, Grid, Divider } from '@mui/material';
import Colors from '../../../helpers/colors';
import LogoImage from '../../Basic/logo.webp';
import ChartsImage from './chartsImage.png';
import HomePageImage from './homePageImage.png';
import ProfitImage from './profitImage.png';
import SettingsImage from './settingsImage.png';
import SummaryImage from './summaryImage.png';
import WorkersImage from './workersImage.png';
import FooterSection from './FooterSection';

const NotLoginHome = () => {
  return (
    <Stack mt={4} alignItems='center' justifyContent='center'>
      <Stack width="80%" gap={1} alignItems='center'>
        <Stack
          flexDirection='row'
          width='80%'
          p={2}
          gap={2}
          border={2}
          bgcolor={Colors[11]}
          borderColor={Colors[5]}
          borderRadius={3}
          justifyContent='center'
        >
          <Stack justifyContent='end'>
            <Typography variant="h3" color={Colors[13]}>
              {'Esek-Pro'}
            </Typography>
          </Stack>

          <Box component='img' src={LogoImage} alt='EsekProLogo' sx={{ height: 120, borderRadius: '10px', cursor: 'pointer' }} />

          <Stack justifyContent='end'>

            <Typography variant="h3" color={Colors[13]}>
              {'עסק-פרו'}
            </Typography>
          </Stack>
        </Stack>

        <Box sx={{ my: 2, textAlign: 'center' }}>
          <Typography variant="h5" color={Colors[5]}>
            {'ניהול חכם ויעיל, לעיבוד וניתוח מידע של בית העסק.'}
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', my: 8 }}>
          <Typography variant="h4" color={Colors[7]} gutterBottom>
            {'למה לבחור בנו?'}
          </Typography>
          <Typography variant="body1" color={Colors[5]} sx={{ maxWidth: '800px', margin: '0 auto' }}>
            אנחנו מציעים יכולות חדשניות לניהול מידע ונתונים, תוך שימוש בטכנולוגיות מתקדמות ובעיצוב גרפי מקצועי.
            מערכת זו מאפשרת לך למקסם את הנתונים שלך ולשפר את הביצועים העסקיים שלך.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Box sx={{ bgcolor: Colors[0], padding: 4, borderRadius: 2, textAlign: 'center', boxShadow: 3 }}>
              <Typography variant="h5" color={Colors[7]} gutterBottom>
                {'ניהול נתונים'}
              </Typography>
              <Typography variant="body1" color={Colors[5]}>
                אנחנו מספקים כלים לניהול יעיל של נתונים, כולל עיבוד וניתוח AI, שמאפשרים לך לקבל החלטות מבוססות נתונים.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ bgcolor: Colors[0], padding: 4, borderRadius: 2, textAlign: 'center', boxShadow: 3 }}>
              <Typography variant="h5" color={Colors[7]} gutterBottom>
                {'דוחות תקופתיים'}
              </Typography>
              <Typography variant="body1" color={Colors[5]}>
                אנחנו מספקים דוחות תקופתיים מותאמים אישית כדי שתוכל לעקוב אחר הנתונים שלך בצורה טובה יותר.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ bgcolor: Colors[0], padding: 4, borderRadius: 2, textAlign: 'center', boxShadow: 3 }}>
              <Typography variant="h5" color={Colors[7]} gutterBottom>
                {'חישוב יעילות מוצרים'}
              </Typography>
              <Typography variant="body1" color={Colors[5]}>
                ניתוח מפורט של הוצאות העסק עבור כל מוצר, על מנת לעזור לך לקבל החלטה על המחיר הרצוי
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ bgcolor: Colors[0], padding: 4, borderRadius: 2, textAlign: 'center', boxShadow: 3 }}>
              <Typography variant="h5" color={Colors[7]} gutterBottom>
                {'ניהול משמרות עובדים'}
              </Typography>
              <Typography variant="body1" color={Colors[5]}>
                פלטפורמה חכמה לניהול משמרות עובדים, שמקלה על ניהול זמנים ותחזוק המידע בארגון, ומאפשרת למי מטעמך לנהל בשבילך מבלי להיחשף לשאר המידע.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider width='100%' sx={{ mt: 4, height: 4 }} />

        <Box sx={{ textAlign: 'center', my: 7, width: '100%' }}>
          <Typography variant="h4" color={Colors[13]} gutterBottom>
            תצוגה חזותית של האתר
          </Typography>
          <Grid container width='100%' spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  component='img'
                  src={HomePageImage}
                  alt='HomePageImage'
                  sx={{
                    // height: '200px',
                    width: '100%',
                    bgcolor: Colors[1],
                    borderRadius: 2,
                    boxShadow: 3,
                    mb: 2,
                  }}
                />
                <Typography variant="body1" color={Colors[5]}>
                  {'ממשק נוח לשימוש'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  component='img'
                  src={WorkersImage}
                  alt='workersImage'
                  sx={{
                    // height: '200px',
                    width: '100%',
                    bgcolor: Colors[1],
                    borderRadius: 2,
                    boxShadow: 3,
                    mb: 2,
                  }}
                />
                <Typography variant="body1" color={Colors[5]}>
                  ממשק ידידותי לניהול עובדים
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  component='img'
                  src={SummaryImage}
                  alt='SummaryImage'
                  sx={{
                    // height: '200px',
                    width: '100%',
                    bgcolor: Colors[1],
                    borderRadius: 2,
                    boxShadow: 3,
                    mb: 2,
                  }}
                />
                <Typography variant="body1" color={Colors[5]}>
                  דוחות מותאמים אישית
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  component='img'
                  src={ChartsImage}
                  alt='ChartsImage'
                  sx={{
                    // height: '100%',
                    width: '100%',
                    bgcolor: Colors[1],
                    borderRadius: 2,
                    boxShadow: 3,
                    mb: 2,
                  }}
                />
                <Typography variant="body1" color={Colors[5]}>
                  כלים מתקדמים לניתוח נתונים
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  component='img'
                  src={ProfitImage}
                  alt='ProfitImage'
                  sx={{
                    // height: '200px',
                    width: '100%',
                    bgcolor: Colors[1],
                    borderRadius: 2,
                    boxShadow: 3,
                    mb: 2,
                  }}
                />
                <Typography variant="body1" color={Colors[5]}>
                  {'חישוב יעילות מוצרים'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  component='img'
                  src={SettingsImage}
                  alt='SettingsImage'
                  sx={{
                    // height: '200px',
                    width: '100%',
                    bgcolor: Colors[1],
                    borderRadius: 2,
                    boxShadow: 3,
                    mb: 2,
                  }}
                />
                <Typography variant="body1" color={Colors[5]}>
                  {'ניהול הרשאות נוח'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Stack>

      <FooterSection />
    </Stack>
  );
};

export default NotLoginHome;
