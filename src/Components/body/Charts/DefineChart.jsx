import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  Grid,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { CalendarToday } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/he';
import dayjs from 'dayjs';
import _range from 'lodash/range';
import Colors from '../../../helpers/colors';
import renderFormControl from './renderFormControl';

const subjectMenu = {
  label: 'נושא',
  isMultiple: false,
  listOfOptions: {
    allProducts: 'כל המוצרים',
    byProduct: 'לפי מוצר',
    byCategory: 'לפי קטגוריה',
  },
};

const XAxisGroupsMenu = {
  label: 'קבוצות ציר ה - X',
  isMultiple: false,
  listOfOptions: {
    bySequence: 'רצף זמן (כל יום)',
    byCertain: 'זמן מסויים (רק ימי חמישי)',
    byPeriod: 'פרק זמן (ימי השבוע)',
  },
};

const XAxisSequenceTimeMenu = {
  label: 'יחסי זמן ציר ה - X',
  isMultiple: false,
  listOfOptions: {
    hourly: 'שעתי',
    daily: 'יומי',
    weekly: 'שבועי',
    monthly: 'חודשי',
    yearly: 'שנתי',
  },
};

const XAxisCertainTimeMenu = {
  label: 'יחסי זמן ציר ה - X',
  isMultiple: false,
  listOfOptions: {
    hours: 'שעות',
    days: 'ימים',
    months: 'חודשים',
  },
};

const XAxisPeriodTimeMenu = {
  label: 'פרק זמן ציר ה - X',
  isMultiple: true,
  listOfOptions: {
    hours: [..._range(1, 24), 0],
    days: _range(1, 8),
    months: _range(1, 13),
  },
};

const YAxisMenu = {
  label: 'ציר ה - Y',
  isMultiple: false,
  listOfOptions: {
    amountOfSales: 'כמות מחירות',
    comparedTo: 'ביחס ל...',
  },
};

const DefineChart = ({ onSubmit, existProducts }) => {
  const [isAddNewChartOpen, setIsAddNewChartOpen] = useState(false);
  const [categoryMenu, setCategoryMenu] = useState([]);
  const [productMenu, setProductMenu] = useState([]);
  const [state, setState] = useState({
    selectedSubject: 'allProducts',
    selectedProducts: [],
    selectedCategories: [],
    selectedXAxisGroups: 'bySequence',
    selectedXAxisSequenceTime: 'daily',
    selectedXAxisCertainTime: 'days',
    selectedXAxisPeriodTime: [],
    startDate: null,
    endDate: null,
    selectedYAxis: 'amountOfSales',
    selectedComparedToSubject: [],
    selectedComparedToProducts: [],
    selectedComparedToCategories: [],
  });

  useEffect(() => {
    const categories = [], products = [];

    existProducts.forEach(product => {
      products.push({
        name: product.name,
        hebrewNeme: product.hebrewNeme,
      });

      if (!categories.map(category => category.name).includes(product.category)) {
        categories.push({
          name: product.category,
          hebrewNeme: product.categoryHebrewNeme,
        });
      }
    });

    setProductMenu({
      label: 'מוצרים',
      isMultiple: true,
      listOfOptions: products,
    });

    setCategoryMenu({
      label: 'קטגוריות',
      isMultiple: true,
      listOfOptions: categories,
    });
  }, [existProducts]);

  const handleRun = () => {
    const dataForNewChart = {
      userName: 'coffee_nyc',
      subject: {
        type: state.selectedSubject,
        ...(state.selectedSubject === 'byProduct' && { products: state.selectedProducts.map(product => product.name) }),
        ...(state.selectedSubject === 'byCategory' && { categories: state.selectedCategories.map(category => category.name) }),
      },
      XAxis: {
        type: state.selectedXAxisGroups,
        ...(state.selectedXAxisGroups === 'bySequence' && { timeDivision: state.selectedXAxisSequenceTime }),
        ...(['byCertain', 'byPeriod'].includes(state.selectedXAxisGroups) && { timeDivision: state.selectedXAxisCertainTime }),
        ...(state.selectedXAxisGroups === 'byPeriod' && { relevantPeriod: state.selectedXAxisPeriodTime }),
      },
      YAxis: {
        type: state.selectedYAxis,
        ...(state.selectedYAxis === 'comparedTo' && {
          subject: {
            type: state.selectedComparedToSubject,
            ...(state.selectedComparedToSubject === 'byProduct' && { products: state.selectedComparedToProducts.map(product => product.name) }),
            ...(state.selectedComparedToSubject === 'byCategory' && { categories: state.selectedComparedToCategories.map(category => category.name) }),
          }
        }),
      },
      relevantTime: {
        start: state.startDate,
        end: state.endDate,
      },
    };

    onSubmit(dataForNewChart);
    setIsAddNewChartOpen(false);
  };

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (field) => (date) => {
    setState((prev) => ({
      ...prev,
      [field]: dayjs(date).format('YYYY-MM-DDTHH:mm:ss'),
    }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale="he">
      <Paper
        sx={{
          width: '100%',
          height: '100%',
          padding: 4,
          overflowY: 'scroll',
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
        <Typography variant='h3' sx={{ mb: 2, color: Colors[7] }}>יצירת גרף</Typography>
        {!isAddNewChartOpen ? (
          <Stack sx={{ mt: '25%', justifyContent: 'center', alignItems: 'center' }}>
            <Button onClick={() => setIsAddNewChartOpen(true)} variant='contained' sx={{ height: 100, width: 100, borderRadius: '50%', bgcolor: Colors[6], ':hover': { bgcolor: Colors[7] }, transition: 'background-color 0.3s' }}>
              <AddIcon style={{ fontSize: 100 }} />
            </Button>
          </Stack>
        ) : (
          <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={12} mt={-8} display="flex" justifyContent="flex-start">
              <IconButton onClick={() => setIsAddNewChartOpen(false)}>
                <CloseIcon sx={{ color: Colors[5] }} />
              </IconButton>
            </Grid>
            <Grid item xs={12} mt={5} display="flex" justifyContent="center" gap={2} dir="rtl">
              <DatePicker
                label="תאריך התחלה"
                value={dayjs(state.startDate)}
                onChange={(date) => handleDateChange('startDate')(date.startOf('day'))}
                referenceDate={dayjs('2023-01-01')}
                views={['year', 'month', 'day']}
                slotProps={{ textField: { variant: "filled" }}}
                sx={{
                  mx: 5,
                  width: 200,
                  '& .MuiInputLabel-root': { right: '30px', left: 'unset', transformOrigin: 'top right' },
                  '& .MuiFilledInput-root': { bgcolor: Colors[0] },
                  // '& .MuiInputLabel-root': { right: 'unset', left: 'auto', transformOrigin: 'top right' },
                  // '& .MuiInputBase-root': { direction: 'rtl' },
                  // '& .MuiOutlinedInput-input': { right: 0, left: 0 },
                  // '& .MuiOutlinedInput-notchedOutline': { textAlign: 'right' },
                  // width: '100%',
                  borderRadius: 1,
                  boxShadow: 2,
                }}
              />
              <DatePicker
                label="תאריך סיום"
                value={dayjs(state.endDate)}
                onChange={(date) => handleDateChange('endDate')(date.endOf('day'))}
                referenceDate={dayjs('2023-06-30')}
                views={['year', 'month', 'day']}
                slotProps={{ textField: { variant: "filled" }}}
                sx={{
                  mx: 5,
                  width: 200,
                  '& .MuiInputLabel-root': { right: '30px', left: 'unset', transformOrigin: 'top right' },
                  '& .MuiFilledInput-root': { bgcolor: Colors[0] },
                  // '& .MuiInputLabel-root': { right: 'unset', left: 'auto', transformOrigin: 'top right' },
                  // '& .MuiInputBase-root': { direction: 'rtl' },
                  // '& .MuiOutlinedInput-input': { right: 0, left: 0 },
                  // '& .MuiOutlinedInput-notchedOutline': { textAlign: 'right' },
                  // width: '100%',
                  // bgcolor: Colors[0],
                  borderRadius: 1,
                  boxShadow: 2,
                }}
              />
            </Grid>
            <Grid item xs={12} md={12} display="flex" justifyContent="center" gap={2}>
              <Grid item xs={12} md={6}>
                {renderFormControl(subjectMenu, state.selectedSubject, handleChange('selectedSubject'))}
              </Grid>
              {state.selectedSubject === 'byProduct' && (
                <Grid item xs={12} md={6}>
                  {renderFormControl(productMenu, state.selectedProducts, handleChange('selectedProducts'), true)}
                </Grid>
              )}
              {state.selectedSubject === 'byCategory' && (
                <Grid item xs={12} md={6}>
                  {renderFormControl(categoryMenu, state.selectedCategories, handleChange('selectedCategories'), true)}
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {renderFormControl(XAxisGroupsMenu, state.selectedXAxisGroups, handleChange('selectedXAxisGroups'))}
            </Grid>
            {state.selectedXAxisGroups === 'bySequence' && (
              <Grid item xs={12} md={6}>
                {renderFormControl(XAxisSequenceTimeMenu, state.selectedXAxisSequenceTime, handleChange('selectedXAxisSequenceTime'))}
              </Grid>
            )}
            {['byCertain', 'byPeriod'].includes(state.selectedXAxisGroups) && (
              <Grid item xs={12} md={6}>
                {renderFormControl(XAxisCertainTimeMenu, state.selectedXAxisCertainTime, handleChange('selectedXAxisCertainTime'))}
              </Grid>
            )}
            {state.selectedXAxisGroups === 'byCertain' && state.selectedXAxisCertainTime.length !== 0 && (
              <Grid item xs={12} md={6}>
                {renderFormControl(XAxisPeriodTimeMenu, state.selectedXAxisPeriodTime, handleChange('selectedXAxisPeriodTime'), true)}
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              {renderFormControl(YAxisMenu, state.selectedYAxis, handleChange('selectedYAxis'))}
            </Grid>
            {state.selectedYAxis === 'comparedTo' && (
              <>
                <Grid item xs={12} md={6}>
                  {renderFormControl(subjectMenu, state.selectedComparedToSubject, handleChange('selectedComparedToSubject'), true)}
                </Grid>
                {state.selectedComparedToSubject === 'byProduct' && (
                  <Grid item xs={12} md={6}>
                    {renderFormControl(productMenu, state.selectedComparedToProducts, handleChange('selectedComparedToProducts'), true)}
                  </Grid>
                )}
                {state.selectedComparedToSubject === 'byCategory' && (
                  <Grid item xs={12} md={6}>
                    {renderFormControl(categoryMenu, state.selectedComparedToCategories, handleChange('selectedComparedToCategories'), true)}
                  </Grid>
                )}
              </>
            )}
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button variant='contained' onClick={handleRun} sx={{ mt: 3, bgcolor: Colors[6], ':hover': { bgcolor: Colors[7] }, transition: 'background-color 0.3s', fontWeight: 'bold' }}>
                התחל
              </Button>
            </Grid>
          </Grid>
        )}
      </Paper>
    </LocalizationProvider>
  );
};

export default DefineChart;
