import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';
import Colors from '../../../helpers/colors';

const renderFormControl = (menu, value, handleChange, multiple = false) => {
  const options = Array.isArray(menu.listOfOptions) ? menu.listOfOptions : Object.entries(menu.listOfOptions).map(([key, value]) => ({ name: key, hebrewNeme: value }));

  return (
    <FormControl
      variant="outlined"
      sx={{
        m: 1,
        minWidth: 200,
        bgcolor: `${Colors[0]}CC`,
        borderRadius: 2,
        boxShadow: 2,
        direction: 'rtl',
        '& .MuiInputLabel-root': {
          right: '30px',
          left: 'unset',
          transformOrigin: 'top right',
        },
        '& .MuiInputBase-root': {
          direction: 'rtl',
        },
        '& .MuiOutlinedInput-input': {
          textAlign: 'right',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          textAlign: 'right',
        },
      }}
    >
      <InputLabel>{menu.label}</InputLabel>

      <Select
        value={value}
        label={menu.label}
        onChange={handleChange}
        multiple={multiple}
        sx={{
          bgcolor: Colors[0],
          textAlign: 'right',
          '& .MuiSvgIcon-root': { color: Colors[5] }, // Adjust icon color
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.name || option}
            value={option.name}
            sx={{
              bgcolor: Colors[0],
              '&:hover': { bgcolor: Colors[2] },
              '&.Mui-selected': { bgcolor: Colors[1], color: Colors[5] },
              // direction: 'rtl', // Ensure menu items are RTL
              // textAlign: 'right' // Ensure text in menu items is aligned to the right
            }}
          >
            {option.hebrewNeme || option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default renderFormControl;
