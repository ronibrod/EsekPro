import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/he';
import dayjs from 'dayjs';
import { XAxis, YAxis } from 'recharts';
import _range from 'lodash/range';
import renderFormControl from '../Charts/renderFormControl';
import Colors from '../../../helpers/colors';

const subjectMenu = {
  label: 'נושא',
  isMultiple: false,
  listOfOptions: {
    // allProducts: 'כל המוצרים',
    byProduct: 'לפי מוצר',
    byCategory: 'לפי קטגוריה',
  },
};

const XAxisSequenceTimeMenu = {
  label: 'יחסי זמן ציר ה - X',
  isMultiple: false,
  listOfOptions: {
    hourly: 'שעתי',
    daily: 'יומי',
    // weekly: 'שבועי',
    monthly: 'חודשי',
    yearly: 'שנתי',
  },
};

const DefineChart = ({ onSubmit, existProducts }) => {
  const [isAddNewChartOpen, setIsAddNewChartOpen] = useState(false);
  const [categoryMenu, setCategoryMenu] = useState([]);
  const [productMenu, setProductMenu] = useState([]);
  // const [selectedSubject, setSelectedSubject] = useState('byProduct');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedXAxisSequenceTime, setSelectedXAxisSequenceTime] = useState('daily');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [state, setState] = useState({
    selectedSubject: 'allProducts',
    selectedProducts: [],
    selectedCategories: [],
    selectedXAxisGroups: 'bySequence',
    selectedXAxisSequenceTime: 'daily',
    selectedXAxisCertainTime: 'days',
    selectedXAxisPeriodTime: [],
    startDate: dayjs('2023-01-01').format('YYYY-MM-DDTHH:mm:ss'), // null
    endDate: dayjs('2023-01-31').format('YYYY-MM-DDTHH:mm:ss'), // null
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
        // ...(selectedSubject === 'byProduct' && { product: selectedProduct.name }),
        // ...(selectedSubject === 'byCategory' && { categories: selectedCategory }),
      },
      XAxis: {
        timeDivision: state.selectedXAxisSequenceTime,
      },
      relevantTime: {
        start: state.startDate,
        end: state.endDate,
      },
    };

    onSubmit(dataForNewChart);
    setIsAddNewChartOpen(false);
  };

  const handleChangeSelectedSubject = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleChangeSelectedProduct = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleChangeSelectedCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleChangeSelectedXAxisSequenceTime = (event) => {
    setSelectedXAxisSequenceTime(event.target.value);
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
        <Typography variant='h3' sx={{ mt: 2, color: Colors[7] }}>
          יצירת גרף AI
        </Typography>

        {
          !isAddNewChartOpen &&
          <Stack sx={{ mt: '25%', justifyContent: 'center', alignItems: 'center' }}>
            <Button onClick={() => setIsAddNewChartOpen(true)} variant='contained' sx={{ height: 100, width: 100, borderRadius: '50%', bgcolor: Colors[6], ':hover': { bgcolor: Colors[7] }, transition: 'background-color 0.3s' }}>
              <AddIcon style={{ fontSize: 100 }} />
            </Button>
          </Stack>
        }

        {
          isAddNewChartOpen &&
          <Grid container spacing={2} height='80%' sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={12} mt={-20} display="flex" justifyContent="flex-start">
              <IconButton onClick={() => setIsAddNewChartOpen(false)}>
                <CloseIcon sx={{ color: Colors[5] }} />
              </IconButton>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="center" gap={2} dir="rtl">
              <DatePicker
                label="תאריך התחלה"
                value={dayjs(state.startDate)}
                onChange={(date) => handleDateChange('startDate')(date.startOf('day'))}
                referenceDate={dayjs('2023-01-01')}
                views={['year', 'month', 'day']}
                slotProps={{ textField: { variant: "filled" } }}
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
                referenceDate={dayjs('2023-01-31')}
                views={['year', 'month', 'day']}
                slotProps={{ textField: { variant: "filled" } }}
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

            {/* <Grid item xs={12} md={12} display="flex" justifyContent="center" gap={2}>
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
            </Grid> */}

            {/* <Grid item xs={12} md={6}>
              {renderFormControl(XAxisSequenceTimeMenu, state.selectedXAxisSequenceTime, handleChange('selectedXAxisSequenceTime'))}
            </Grid> */}

            <Grid item xs={12} justifyContent="center">
              <Button variant='contained' onClick={handleRun} sx={{ mt: 2, bgcolor: Colors[6], ':hover': { bgcolor: Colors[7] }, transition: 'background-color 0.3s', fontWeight: 'bold' }}>
                התחל
              </Button>
            </Grid>
          </Grid>
        }
      </Paper>
    </LocalizationProvider>
  );
};

export default DefineChart;
