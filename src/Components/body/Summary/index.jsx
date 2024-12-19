import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, ButtonGroup, ToggleButtonGroup, ToggleButton, Stack, List, ListItem, Paper, TextField, Typography, Stepper, Step, StepButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import 'dayjs/locale/he';
import dayjs from 'dayjs';
import Colors from '../../../helpers/colors';
import SummaryFakeData from './SummaryFakeData';
import SystemUnderConstructionDialog from '../../Dialogs/SystemUnderConstruction';
// import WorkerCard from './WorkerCard';

// const backEndUrl = import.meta.env.VITE_API_URL_BACK_END_URL

const userName = 'wwwwwwwwwwwwwwwwwwwwwww';

const timeOptions = {
  daily: 'יומי',
  weekly: 'שבועי',
  monthly: 'חודשי',
  timeSpan: 'טווח זמן',
};

const dateOptions = {
  current: 'נוכחי',
  previous: 'הקודם',
  beforeLast: 'לפני הקודם',
  other: 'אחר',
};

const steps = [
  'פרק זמן',
  'בחירה',
];

const SummariesManagement = () => {
  const [relevantDates, setRelevantDates] = useState({});
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [cards, setCards] = useState([]);
  const [addCardFailed, setAddCardFailed] = useState(false);

  // useEffect(() => {
  //   const getRelevantDates = async (userName) => {
  //     // const { data } = await Axios.get(`${backEndUrl}/getAllWorkers`, {
  //     //   params: {
  //     //     query: JSON.stringify({ userName }),
  //     //   },
  //     // });

  //     setRelevantDates(data);
  //   };

  //   getRelevantDates(userName);
  // }, []);

  const handleAddCard = async () => {
    if (!selectedDate) return;

    try {
      const { data } = await Axios.get(`${backEndUrl}/getSummary`, {
        params: {
          query: JSON.stringify(userName, selectedDate),
        },
      });

      const newCard = SummaryFakeData;
      setCards(cards => [...cards, newCard]);
    } catch (error) {
      setAddCardFailed(true)
    }
  };

  const handleDeleteCard = (cardId) => {
    setCards(cards => cards.filter(card => card.info.cardId !== cardId));
  };

  const toggleSelectedTime = (event, newSelectedTime) => {
    setSelectedTime(newSelectedTime);
    setActiveStep(1);
  };

  const toggleSelectedDate = (event, newSelectedDate) => {
    if (newSelectedDate === 'other') {
      setIsDatePickerOpen(false);
    } else {
      const now = dayjs();

      const dateMappings = {
        current: {
          daily: { start: now.startOf('day'), end: now },
          weekly: { start: now.startOf('week'), end: now },
          monthly: { start: now.startOf('month'), end: now },
        },
        previous: {
          daily: { start: now.subtract(1, 'day').startOf('day'), end: now.subtract(1, 'day').endOf('day') },
          weekly: { start: now.subtract(1, 'week').startOf('week'), end: now.subtract(1, 'week').endOf('week') },
          monthly: { start: now.subtract(1, 'month').startOf('month'), end: now.subtract(1, 'month').endOf('month') },
        },
        beforeLast: {
          daily: { start: now.subtract(2, 'day').startOf('day'), end: now.subtract(2, 'day').endOf('day') },
          weekly: { start: now.subtract(2, 'week').startOf('week'), end: now.subtract(2, 'week').endOf('week') },
          monthly: { start: now.subtract(2, 'month').startOf('month'), end: now.subtract(2, 'month').endOf('month') },
        },
      };

      if (dateMappings[newSelectedDate] && dateMappings[newSelectedDate][selectedTime]) {
        setSelectedDate(dateMappings[newSelectedDate][selectedTime]);
      }
    }

    handleAddCard();
  };

  const handleDateChange = (date) => {
    const other = {
      daily: { start: date.startOf('day'), end: date.endOf('day') },
      weekly: { start: date.startOf('week'), end: date.endOf('week') },
      monthly: { start: date.startOf('month'), end: date.endOf('month') },
    };
    setSelectedDate(other[selectedTime]);
  };

  const handleStep = (step) => () => {
    setIsDatePickerOpen(false)
    setSelectedDate({})
    setActiveStep(step);
  };

  return (
    <Stack height="100%" width="100%" >
      <List sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        {cards.map((card, index) => (
          <ListItem key={index} sx={{ width: '50%', height: 500, textAlign: 'center' }}>
            <SummaryCard dataForCard={card} handleDeleteCard={handleDeleteCard} />
          </ListItem>
        ))}

        <ListItem key={'lastItem'} sx={{ width: '50%', height: 500, textAlign: 'center' }}>
          <Paper
            sx={{
              width: '100%',
              height: '100%',
              padding: 4,
              overflowY: 'auto',
              bgcolor: `${Colors[10]}AA`,
              borderRadius: 2,
              boxShadow: 5,
              '&::-webkit-scrollbar': {
                width: '5px',
              },
              '&::-webkit-scrollbar-track': {
                boxShadow: `inset 0 0 5px ${Colors[1]}`,
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: Colors[4],
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: Colors[5],
              },
            }}
          >
            <Stack sx={{ height: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
              <Stack>
                <Typography variant='h3' sx={{ color: Colors[13] }}>
                  {'סיכום'}
                </Typography>
              </Stack>

              {
                activeStep === 0 &&
                <Stack>
                  <Stack direction="row" justifyContent="center">
                    <ToggleButtonGroup
                      orientation="vertical"
                      value={selectedTime}
                      exclusive
                      onChange={toggleSelectedTime}
                      sx={{ width: 250 }}
                    >
                      {Object.entries(timeOptions).map(([key, value]) => (
                        <ToggleButton key={key} value={key}>
                          <Typography>{value}</Typography>
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Stack>
                </Stack>
              }

              {
                (activeStep === 1 && !isDatePickerOpen) &&
                <Stack>
                  <Stack direction="row" justifyContent="center">
                    <ToggleButtonGroup
                      orientation="vertical"
                      exclusive
                      onChange={toggleSelectedDate}
                      sx={{ width: 250 }}
                    >
                      {Object.entries(dateOptions).map(([key, value]) => (
                        <ToggleButton key={key} value={key}>
                          <Typography>{value}</Typography>
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Stack>
                </Stack>
              }

              {
                (activeStep === 1 && isDatePickerOpen) &&
                <Stack>
                  <Stack direction="row" justifyContent="center">
                    <Stack>
                      <LocalizationProvider dateAdapter={AdapterDayjs} locale="he">
                        <DateRangeCalendar
                          label="תאריך"
                          calendars={1}
                          value={dayjs(selectedDate.start)}
                          onChange={(newDate) => handleDateChange(newDate)}
                        // referenceDate={dayjs('2023-01-01')}
                        // views={['year', 'month', 'day']}
                        // slotProps={{ textField: { variant: "filled" } }}
                        // sx={{
                        //   mx: 5,
                        //   width: 200,
                        //   '& .MuiInputLabel-root': { right: '30px', left: 'unset', transformOrigin: 'top right' },
                        //   '& .MuiFilledInput-root': { bgcolor: Colors[0] },
                        //   // '& .MuiInputLabel-root': { right: 'unset', left: 'auto', transformOrigin: 'top right' },
                        //   // '& .MuiInputBase-root': { direction: 'rtl' },
                        //   // '& .MuiOutlinedInput-input': { right: 0, left: 0 },
                        //   // '& .MuiOutlinedInput-notchedOutline': { textAlign: 'right' },
                        //   // width: '100%',
                        //   borderRadius: 1,
                        //   boxShadow: 2,
                        // }}
                        />
                      </LocalizationProvider>
                    </Stack>

                    <Stack>
                      <ButtonGroup sx={{ width: 250 }}>
                        <Button onClick={() => isDatePickerOpen(fales)}>
                          <Typography>{'חזור'}</Typography>
                        </Button>

                        <Button >
                          <Typography>{'הרץ'}</Typography>
                        </Button>
                      </ButtonGroup>
                    </Stack>
                  </Stack>
                </Stack>
              }

              {
                addCardFailed &&
                <SystemUnderConstructionDialog onClose={() => setAddCardFailed(false)} />
              }

              {/* <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <Button
                  // onClick={() => handleAddCard(selectedWorker)}
                  variant='contained'
                  sx={{
                    height: 100,
                    width: 100,
                    borderRadius: '50%',
                    bgcolor: Colors[6],
                    ':hover': { bgcolor: Colors[7] },
                    transition: 'background-color 0.3s',
                  }}
                >
                  <AddIcon style={{ fontSize: 100 }} />
                </Button>
              </Stack> */}
              <Stack width='100%' dir='ltr'>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <StepButton onClick={handleStep(index)}>
                        {label}
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
              </Stack>
            </Stack>
          </Paper>
        </ListItem>
      </List>
    </Stack>
  );
};

export default SummariesManagement;
