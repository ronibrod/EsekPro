import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Divider, FormControl, FormLabel, FormGroup, FormControlLabel, Slider, Stack, Tabs, Tab, Typography } from '@mui/material';
import Colors from '../../../helpers/colors';

const authorizationCategories = {
  saleStatistics: 'גישה לנתוני מכירות',
  workersManagement: 'גישה לניהול עובדים',
  dataManagement: 'גישה לעדכון מידע',
  summary: 'גישה לסיכומים',
  // אישורי תחילת וסיום משמרת
  // אישור עובד חדש
  // שינוי פרטי עובד
  // 
};

const userLevel = {
  businessOwner: 'בעל עסק',
  shiftManager: 'אחראי משמרת',
  worker: 'עובד',
};

const workGradeFactors = {
  managerNotes: 'הערות מנהל',
  selfSaleAmount: 'כמות מכירות אישי',
  teamSaleSpeed: 'כמות מכירות קבוצתי',
  mistakes: 'טעויות',
  availability: 'זמינות',
  latecome: 'איחורים',
  // שיפור או הגרעה בציון לאורך זמן
};

// מידע על פרטיות
// חשבון אישי, חיובים ותשלומים

const SettingsManagement = () => {
  const [workGrade, setWorkGrade] = useState({
    managerNotes: 40,
    selfSaleAmount: 10,
    teamSaleSpeed: 20,
    mistakes: 5,
    availability: 20,
    latecome: 5,
  });
  const [authorization, setAuthorization] = useState({
    saleStatistics: {
      businessOwner: true,
      shiftManager: false,
      worker: false,
    },
    workersManagement: {
      businessOwner: true,
      shiftManager: true,
      worker: false,
    },
    dataManagement: {
      businessOwner: true,
      shiftManager: false,
      worker: false,
    },
    summary: {
      businessOwner: true,
      shiftManager: false,
      worker: false,
    },
  });

  const handleChangePermissions = (event, category) => {
    setAuthorization((prevAuthorization) => ({
      ...prevAuthorization,
      [category]: {
        ...prevAuthorization[category],
        [event.target.name]: event.target.checked,
      },
    }));
  };

  const handleChangeWorkGrade = (event, newValue) => {
    setWorkGrade((prevWorkGrade) => ({
      ...prevWorkGrade,
      [event.target.name]: newValue,
    }));
  };

  return (
    <Stack width='100%' height='100%'>
      <Stack alignItems='center'>
        <Typography variant='h2' color={Colors[13]}>{'הגדרות'}</Typography>
      </Stack>

      <Stack mt={1}>
        <Stack>
          <Divider textAlign="left">
            <Typography variant='h5' color={Colors[5]}>
              {'הרשאות משתמשים'}
            </Typography>
          </Divider>
        </Stack>

        <Stack width='60%' mr='4%'>
          <Typography variant='body2' color={Colors[4]}>
            {`בקטע זה, ניתנת האפשרות לנהל גישות של משתמשים למודולים שונים במערכת, כמו נתוני מכירות וניהול עובדים. עבור כל מודול, ניתן להגדיר הרשאות גישה לפי תפקיד המשתמש (בעל עסק, אחראי משמרת, עובד) באמצעות סימון תיבות בחירה (צ'קבוקס). השינויים מתבצעים בזמן אמת ומאפשרים גמישות בניהול הגישות השונות במערכת.`}
          </Typography>
        </Stack>

        <Stack flexDirection="row" p={5}>
          {Object.entries(authorizationCategories).map(([category, hebrewCategory], index) => (
            <Stack key={category} flexDirection="row" alignItems="center">
              <FormControl component="fieldset">
                <FormLabel component='legend'>
                  <Typography variant='h6'>{hebrewCategory}</Typography>
                </FormLabel>
                <FormGroup>
                  {Object.entries(userLevel).map(([key, value]) => (
                    <FormControlLabel
                      key={key}
                      label={value}
                      control={
                        <Checkbox
                          checked={authorization[category][key]}
                          onChange={(e) => handleChangePermissions(e, category)}
                          name={key}
                        />
                      }
                      sx={{ margin: 0 }}
                    />
                  ))}
                </FormGroup>
              </FormControl>

              {index < Object.entries(authorizationCategories).length - 1 && (
                <Divider orientation="vertical" flexItem variant="middle" sx={{ mx: 10 }} />
              )}
            </Stack>
          ))}
        </Stack>

        <Stack width={200} mt={5} ml='20%' flexDirection='row' justifyContent='space-around' alignSelf='end'>
          <Button variant='contained' sx={{ mt: 3, bgcolor: Colors[1], ':hover': { bgcolor: Colors[2] }, transition: 'background-color 0.3s', fontWeight: 'bold' }}>
            <Typography color={Colors[7]}>{'אישור'}</Typography>
          </Button>
          <Button variant='contained' sx={{ mt: 3, bgcolor: Colors[1], ':hover': { bgcolor: Colors[2] }, transition: 'background-color 0.3s', fontWeight: 'bold' }}>
            <Typography color={Colors[7]}>{'ביטול'}</Typography>
          </Button>
        </Stack>
      </Stack>

      <Stack mt={4}>
        <Stack>
          <Divider textAlign="left">
            <Typography variant='h5' color={Colors[5]}>
              {'הגדרת ציון עובד'}
            </Typography>
          </Divider>
        </Stack>

        <Stack width='60%' mr='4%'>
          <Typography variant='body2' color={Colors[4]}>
            {`קטע זה מאפשר להגדיר את הגורמים המשפיעים על ציון העובד, כמו הערות מנהל וזמינות, באמצעות סליידרים. סך כל המשתנים המשפיעים על הציון חייב להגיע בדיוק ל-100, ולא פחות או יותר, כדי להבטיח חלוקה נכונה של המשקל בין הגורמים.`}
          </Typography>
        </Stack>

        <Stack mt={4} alignItems='center'>
          <Typography variant='h4' color={Colors[5]}>
            {`סך כל המשתנים ${Object.values(workGrade).reduce((acc, value) => acc + value, 0)}`}
          </Typography>

          {
            Object.values(workGrade).reduce((acc, value) => acc + value, 0) !== 100 &&
            <Typography variant='body2' color={Colors[8]}>
              {`סך כל המשתנים צריך להיות שווה ל 100 במדויק`}
            </Typography>
          }
        </Stack>

        <Stack flexDirection="row" flexWrap="wrap" alignItems='center' justifyContent='center' p={4}>
          {Object.entries(workGradeFactors).map(([factor, hebrewFactor], index) => (
            <Stack key={factor} flexDirection='row' alignItems="center" p={4}>
              <Stack width={220} alignItems='center'>
                <Stack width={220} m={1} flexDirection='row' justifyContent='space-between'>
                  <Typography variant='h6'>{hebrewFactor}</Typography>

                  <Stack p={1} bgcolor={Colors[1]} borderRadius={2} textAlign='center' border={1} borderColor={Colors[2]}>
                    <Typography variant='body1' color={Colors[7]}>{workGrade[factor]}</Typography>
                  </Stack>
                </Stack>
                <Slider
                  name={factor}
                  size="small"
                  value={workGrade[factor]}
                  onChange={handleChangeWorkGrade}
                  valueLabelDisplay="auto"
                  marks={[{ value: 0, label: '0' }, { value: 100, label: '100' }]}
                />
              </Stack>

              {/* {index < Object.entries(workGradeFactors).length - 1 && (
                <Divider orientation="vertical" flexItem variant="middle" sx={{ mx: 10 }} />
              )} */}
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Stack width={200} my={5} ml='20%' flexDirection='row' justifyContent='space-around' alignSelf='end'>
        <Button variant='contained' sx={{ mt: 3, bgcolor: Colors[1], ':hover': { bgcolor: Colors[2] }, transition: 'background-color 0.3s', fontWeight: 'bold' }}>
          <Typography color={Colors[7]}>{'אישור'}</Typography>
        </Button>
        <Button variant='contained' sx={{ mt: 3, bgcolor: Colors[1], ':hover': { bgcolor: Colors[2] }, transition: 'background-color 0.3s', fontWeight: 'bold' }}>
          <Typography color={Colors[7]}>{'ביטול'}</Typography>
        </Button>
      </Stack>
    </Stack>
  );
};

export default SettingsManagement;
