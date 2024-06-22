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
    byFrequency: 'לפי תדירות',
    byAverage: 'לפי ממוצע סטטיסטי',
    bySmartAverage: 'לפי ממוצע חכם',
  },
};

const XAxisTimeRelationsMenu = {
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
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedXAxisGroups, setSelectedXAxisGroups] = useState([]);
  const [selectedXAxisTimeRelations, setSelectedXAxisTimeRelations] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedYAxis, setSelectedYAxis] = useState([]);
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
        type: selectedSubject[0],
        ...(selectedSubject[0] === 'byProduct' && { products: selectedProducts.map(product => product.name) }),
        ...(selectedSubject[0] === 'byCategory' && { categories: selectedCategories.map(category => category.name) }),
      },
      XAxis: {
        type: selectedXAxisGroups[0],
        timeRelations: selectedXAxisTimeRelations[0],
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
    const {
      target: { value },
    } = event;
    setSelectedSubject(
      typeof value === 'string' ? value.split(',') : value,
    );
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
    const {
      target: { value },
    } = event;
    setSelectedXAxisGroups(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeSelectedXAxisTimeRelations = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedXAxisTimeRelations(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeSelectedYAxis = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedYAxis(
      typeof value === 'string' ? value.split(',') : value,
    );
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
    <Paper sx={{ width: '100%', height: '100%', padding: 4, overflow: 'auto' }}>
      <Typography variant='h6'>
        יצירת גרף
      </Typography>

      {
        !isAddNewChartOpen &&
        <Stack sx={{ mt: '25%', justifyContent: 'center', alignItems: 'center' }}>
          <Stack onClick={() => setIsAddNewChartOpen(true)} sx={{ height: 100, width: 100, bgcolor: grey[200] }}>
            <AddIcon style={{ fontSize: 100 }} />
          </Stack>
        </Stack>
      }

      {
        isAddNewChartOpen &&
        <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <CloseIcon onClick={() => setIsAddNewChartOpen(false)} />

          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>{subjectMenu.label}</InputLabel>
            <Select
              multiple={subjectMenu.isMultiple}
              value={selectedSubject}
              onChange={handleChangeSelectedSubject}
              input={<OutlinedInput label='subject' />}
              renderValue={(selectedSubject) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selectedSubject.map((value) => (
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
            selectedSubject.includes('byProduct') &&
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel>{productMenu.label}</InputLabel>
              <Select
                multiple={productMenu.isMultiple}
                value={selectedProducts}
                onChange={handleChangeSelectedProducts}
                input={<OutlinedInput label='subject' />}
                renderValue={(selectedProducts) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedProducts.map((product) => (
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
            selectedSubject.includes('byCategory') &&
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel>{categoryMenu.label}</InputLabel>
              <Select
                multiple={categoryMenu.isMultiple}
                value={selectedCategories}
                onChange={handleChangeSelectedCategories}
                input={<OutlinedInput label='subject' />}
                renderValue={(selectedCategories) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedCategories.map(category => (
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

          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>{XAxisGroupsMenu.label}</InputLabel>
            <Select
              multiple={XAxisGroupsMenu.isMultiple}
              value={selectedXAxisGroups}
              onChange={handleChangeSelectedXAxisGroups}
              input={<OutlinedInput label='subject' />}
              renderValue={(selectedXAxisGroups) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selectedXAxisGroups.map((value) => (
                    <Chip key={value} label={XAxisGroupsMenu.listOfOptions[value]} />
                  ))}
                </Box>
              )}
            // MenuProps={MenuProps}
            >
              {
                Object.entries(XAxisGroupsMenu.listOfOptions).map(([key, value]) => (
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

          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>{XAxisTimeRelationsMenu.label}</InputLabel>
            <Select
              multiple={XAxisTimeRelationsMenu.isMultiple}
              value={selectedXAxisTimeRelations}
              onChange={handleChangeSelectedXAxisTimeRelations}
              input={<OutlinedInput label='subject' />}
              renderValue={(selectedXAxisTimeRelations) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selectedXAxisTimeRelations.map((value) => (
                    <Chip key={value} label={XAxisTimeRelationsMenu.listOfOptions[value]} />
                  ))}
                </Box>
              )}
            // MenuProps={MenuProps}
            >
              {
                Object.entries(XAxisTimeRelationsMenu.listOfOptions).map(([key, value]) => (
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

          <Stack direction='row' spacing={2}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="תאריך התחלה"
              customInput={<TextField sx={{ width: 150 }} />}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="תאריך סיום"
              customInput={<TextField sx={{ width: 150 }} />}
            />
          </Stack>

          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>{YAxisMenu.label}</InputLabel>
            <Select
              multiple={YAxisMenu.isMultiple}
              value={selectedYAxis}
              onChange={handleChangeSelectedYAxis}
              input={<OutlinedInput label='subject' />}
              renderValue={(selectedYAxis) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selectedYAxis.map((value) => (
                    <Chip key={value} label={YAxisMenu.listOfOptions[value]} />
                  ))}
                </Box>
              )}
            // MenuProps={MenuProps}
            >
              {
                Object.entries(YAxisMenu.listOfOptions).map(([key, value]) => (
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
