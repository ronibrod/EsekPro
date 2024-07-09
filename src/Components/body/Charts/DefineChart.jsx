import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { XAxis, YAxis } from 'recharts';
import _range from 'lodash/range';
import Colors from '../../../helpers/colors';

const subjectMenu = {
  label: 'נושא',
  isMultiple: false,
  listOfOptions: {
    allProducts: 'כל המוצרים',
    byProduct: 'לפי מוצר',
    byCategory: 'לפי קטגוריה',
  },
};

// const productMenu = {
//   label: 'מוצרים',
//   isMultiple: true,
//   listOfOptions: {
//     cappuccino: 'קפוצינו',
//     espresso: 'אספרו',
//     americano: 'אמריקנו',
//     vanillaIceCream: 'גלידה וניל',
//     chocolateIceCream: 'גלידה שוקולד',
//   },
// };

// const categoryMenu = {
//   label: 'קטגוריות',
//   isMultiple: true,
//   listOfOptions: {
//     coffee: 'קפה',
//     iceCream: 'גלידה',
//     soup: 'מרק',
//   },
// };

const XAxisGroupsMenu = {
  label: 'קבוצות ציר ה - X',
  isMultiple: false,
  listOfOptions: {
    bySequence: 'רצף זמן (כל יום)',
    byCertain: 'זמן מסויים (רק ימי חמישי)',
    byPeriod: 'פרק זמן (ימי השבוע)',
    // byCertainBySmart: 'זמן מסויים ממוצע חכם',
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
    amountOfSalse: 'כמות מחירות',
    comparedTo: 'ביחס ל...',
  },
};

const DefineChart = ({ onSubmit, existProducts }) => {
  const [isAddNewChartOpen, setIsAddNewChartOpen] = useState(false);
  const [categoryMenu, setCategoryMenu] = useState([]);
  const [productMenu, setProductMenu] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('allProducts');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedXAxisGroups, setSelectedXAxisGroups] = useState('bySequence');
  const [selectedXAxisSequenceTime, setSelectedXAxisSequenceTime] = useState('daily');
  const [selectedXAxisCertainTime, setSelectedXAxisCertainTime] = useState('days');
  const [selectedXAxisPeriodTime, setSelectedXAxisPeriodTime] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedYAxis, setSelectedYAxis] = useState('amountOfSalse');
  const [selectedComparedToSubject, setSelectedComparedToSubject] = useState([]);
  const [selectedComparedToProducts, setSelectedComparedToProducts] = useState([]);
  const [selectedComparedToCategories, setSelectedComparedToCategories] = useState([]);
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
      subject: {
        type: selectedSubject,
        ...(selectedSubject === 'byProduct' && { products: selectedProducts.map(product => product.name) }),
        ...(selectedSubject === 'byCategory' && { categories: selectedCategories.map(category => category.name) }),
      },
      XAxis: {
        type: selectedXAxisGroups,
        ...(selectedXAxisGroups === 'bySequence' && { timeRelations: selectedXAxisSequenceTime }),
        ...(['byCertain', 'byPeriod'].includes(selectedXAxisGroups) && { timeDivision: selectedXAxisCertainTime }),
        ...(selectedXAxisGroups === 'byPeriod' && { relevantPeriod: selectedXAxisPeriodTime }),
      },
      YAxis: {
        type: selectedYAxis[0],
        ...(selectedYAxis[0] === 'comparedTo' && {
          subject: {
            type: selectedComparedToSubject[0],
            ...(selectedComparedToSubject[0] === 'byProduct' && { products: selectedComparedToProducts.map(product => product.name) }),
            ...(selectedComparedToSubject[0] === 'byCategories' && { categories: selectedComparedToCategories.map(category => category.name) }),
          }
        }),
      },
      relevantTime: {
        start: startDate,
        end: endDate,
      },
    };

    onSubmit(dataForNewChart);
    setIsAddNewChartOpen(false);
  };

  const handleChangeSelectedSubject = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleChangeSelectedProducts = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedProducts(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeSelectedCategories = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeSelectedXAxisGroups = (event) => {
    setSelectedXAxisGroups(event.target.value);
  };

  const handleChangeSelectedXAxisSequenceTime = (event) => {
    setSelectedXAxisSequenceTime(event.target.value);
  };

  const handleChangeSelectedXAxisCertainTime = (event) => {
    setSelectedXAxisCertainTime(event.target.value);
    setSelectedXAxisPeriodTime([]);
  };

  const handleChangeSelectedXAxisPeriodTime = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedXAxisPeriodTime(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeSelectedYAxis = (event) => {
    setSelectedYAxis(event.target.value);
  };

  const handleChangeSelectedComparedToSubject = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedComparedToSubject(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeSelectedComparedToProducts = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedComparedToProducts(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeSelectedComparedToCategories = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedComparedToCategories(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Paper
      sx={{
        width: '100%',
        height: '100%',
        padding: 4,
        overflowY: 'auto',
        bgcolor: Colors[0],
      }}
    >
      <Typography variant='h6'>
        יצירת גרף
      </Typography>

      {
        !isAddNewChartOpen &&
        <Stack sx={{ mt: '25%', justifyContent: 'center', alignItems: 'center' }}>
          <Stack onClick={() => setIsAddNewChartOpen(true)} sx={{ height: 100, width: 100, bgcolor: Colors[1] }}>
            <AddIcon style={{ fontSize: 100 }} />
          </Stack>
        </Stack>
      }

      {
        isAddNewChartOpen &&
        <Stack sx={{ justifyContent: 'center', alignItems: 'center', gap: 5 }}>
          <CloseIcon onClick={() => setIsAddNewChartOpen(false)} />

          <Stack direction='row'>
            <FormControl sx={{ m: 1, width: 200, minWidth: 100 }}>
              <InputLabel>{subjectMenu.label}</InputLabel>
              <Select
                id='subject'
                value={selectedSubject}
                label='subject'
                onChange={handleChangeSelectedSubject}
                sx={{ bgcolor: Colors[1] }}
              >
                {
                  Object.entries(subjectMenu.listOfOptions).map(([key, value]) => (
                    <MenuItem key={key} value={key}>{value}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>

            {
              selectedSubject.includes('byProduct') &&
              <FormControl sx={{ m: 1, width: 'auto', minWidth: 200, maxWidth: 400 }}>
                <InputLabel>{productMenu.label}</InputLabel>
                <Select
                  sx={{ bgcolor: Colors[1] }}
                  multiple={productMenu.isMultiple}
                  value={selectedProducts}
                  onChange={handleChangeSelectedProducts}
                  input={<OutlinedInput label='product' />}
                  renderValue={(selectedProducts) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, overflow: 'auto', maxHeight: 80 }}>
                      {selectedProducts.map((product) => (
                        <Chip key={product.name} label={product.hebrewNeme} sx={{ bgcolor: Colors[2] }} />
                      ))}
                    </Box>
                  )}
                >
                  {
                    productMenu.listOfOptions.map(option => (
                      <MenuItem key={option.name} value={option}>
                        {option.hebrewNeme}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            }

            {
              selectedSubject.includes('byCategory') &&
              <FormControl sx={{ m: 1, width: 'auto', minWidth: 200, maxWidth: 400 }}>
                <InputLabel>{categoryMenu.label}</InputLabel>
                <Select
                  sx={{ bgcolor: Colors[1] }}
                  multiple={categoryMenu.isMultiple}
                  value={selectedCategories}
                  onChange={handleChangeSelectedCategories}
                  input={<OutlinedInput label='category' />}
                  renderValue={(selectedCategories) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, overflow: 'auto', maxHeight: 80 }}>
                      {selectedCategories.map(category => (
                        <Chip key={category.name} label={category.hebrewNeme} sx={{ bgcolor: Colors[2] }} />
                      ))}
                    </Box>
                  )}
                >
                  {
                    categoryMenu.listOfOptions.map(category => (
                      <MenuItem key={category.name} value={category}>
                        {category.hebrewNeme}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            }
          </Stack>

          <Stack direction='row'>
            <FormControl sx={{ m: 1, width: 200, minWidth: 100 }}>
              <InputLabel>{XAxisGroupsMenu.label}</InputLabel>
              <Select
                id='XAxis'
                value={selectedXAxisGroups}
                label='XAxis'
                onChange={handleChangeSelectedXAxisGroups}
                sx={{ bgcolor: Colors[1] }}
              >
                {
                  Object.entries(XAxisGroupsMenu.listOfOptions).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>

            {
              selectedXAxisGroups === 'bySequence' &&
              <FormControl sx={{ m: 1, width: 'auto', minWidth: 200, maxWidth: 400, bgcolor: Colors[1] }}>
                <InputLabel>{XAxisSequenceTimeMenu.label}</InputLabel>
                <Select
                  id='XAxisSequenceTime'
                  value={selectedXAxisSequenceTime}
                  label='XAxisSequenceTime'
                  onChange={handleChangeSelectedXAxisSequenceTime}
                  sx={{ bgcolor: Colors[1] }}
                >
                  {
                    Object.entries(XAxisSequenceTimeMenu.listOfOptions).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            }

            {
              (selectedXAxisGroups === 'byCertain' || selectedXAxisGroups === 'byPeriod') &&
              <FormControl sx={{ m: 1, width: 200, minWidth: 100 }}>
                <InputLabel>{XAxisCertainTimeMenu.label}</InputLabel>
                <Select
                  id='XAxisCertainTime'
                  value={selectedXAxisCertainTime}
                  label='XAxisCertainTime'
                  onChange={handleChangeSelectedXAxisCertainTime}
                  sx={{ bgcolor: Colors[1] }}
                >
                  {
                    Object.entries(XAxisCertainTimeMenu.listOfOptions).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            }

            {
              (selectedXAxisGroups === 'byCertain' && selectedXAxisCertainTime.length !== 0) &&
              <FormControl sx={{ m: 1, width: 'auto', minWidth: 200, maxWidth: 250 }}>
                <InputLabel>{XAxisPeriodTimeMenu.label}</InputLabel>
                <Select
                  sx={{ bgcolor: Colors[1] }}
                  multiple={XAxisPeriodTimeMenu.isMultiple}
                  value={selectedXAxisPeriodTime}
                  onChange={handleChangeSelectedXAxisPeriodTime}
                  input={<OutlinedInput label='subject' />}
                  renderValue={(selectedXAxisPeriodTime) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, overflow: 'auto', maxHeight: 80 }}>
                      {selectedXAxisPeriodTime.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {
                    XAxisPeriodTimeMenu.listOfOptions[selectedXAxisCertainTime].map(value => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            }
          </Stack>

          <Stack direction='row' gap={2}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="תאריך התחלה"
              customInput={<TextField sx={{ bgcolor: Colors[1] }} />}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="תאריך סיום"
              customInput={<TextField sx={{ bgcolor: Colors[1] }} />}
            />
          </Stack>

          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>{YAxisMenu.label}</InputLabel>
            <Select
              id='YAxis'
              value={selectedYAxis}
              label='YAxis'
              onChange={handleChangeSelectedYAxis}
              sx={{ bgcolor: Colors[1] }}
            >
              {
                Object.entries(YAxisMenu.listOfOptions).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>

          {
            selectedYAxis.includes('comparedTo') &&
            <>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel>{subjectMenu.label}</InputLabel>
                <Select
                  multiple={subjectMenu.isMultiple}
                  value={selectedComparedToSubject}
                  onChange={handleChangeSelectedComparedToSubject}
                  input={<OutlinedInput label='subject' />}
                  renderValue={(selectedComparedToSubject) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selectedComparedToSubject.map((value) => (
                        <Chip key={value} label={subjectMenu.listOfOptions[value]} />
                      ))}
                    </Box>
                  )}
                // MenuProps={MenuProps}
                >
                  {
                    Object.entries(subjectMenu.listOfOptions).map(([key, value]) => (
                      <MenuItem
                        key={key}
                        value={key}
                      // style={getStyles(name, personName, theme)}
                      >
                        {value}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>

              {
                selectedComparedToSubject.includes('byProduct') &&
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel>{productMenu.label}</InputLabel>
                  <Select
                    multiple={productMenu.isMultiple}
                    value={selectedComparedToProducts}
                    onChange={handleChangeSelectedComparedToProducts}
                    input={<OutlinedInput label='subject' />}
                    renderValue={(selectedComparedToProducts) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedComparedToProducts.map((product) => (
                          <Chip key={product.name} label={product.hebrewNeme} />
                        ))}
                      </Box>
                    )}
                  // MenuProps={MenuProps}
                  >
                    {
                      productMenu.listOfOptions.map(option => (
                        <MenuItem
                          key={option.name}
                          value={option}
                        // style={getStyles(name, personName, theme)}
                        >
                          {option.hebrewNeme}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              }

              {
                selectedComparedToSubject.includes('byCategory') &&
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel>{categoryMenu.label}</InputLabel>
                  <Select
                    multiple={categoryMenu.isMultiple}
                    value={selectedComparedToCategories}
                    onChange={handleChangeSelectedComparedToCategories}
                    input={<OutlinedInput label='subject' />}
                    renderValue={(selectedComparedToCategories) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedComparedToCategories.map(category => (
                          <Chip key={category.name} label={category.hebrewNeme} />
                        ))}
                      </Box>
                    )}
                  // MenuProps={MenuProps}
                  >
                    {
                      categoryMenu.listOfOptions.map(category => (
                        <MenuItem
                          key={category.name}
                          value={category}
                        // style={getStyles(name, personName, theme)}
                        >
                          {category.hebrewNeme}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              }
            </>
          }

          <Button variant='outlined' onClick={handleRun}>
            <Typography>התחל</Typography>
          </Button>
        </Stack>
      }
    </Paper>
  );
};

export default DefineChart;
