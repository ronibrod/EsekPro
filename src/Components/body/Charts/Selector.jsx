import React, { useState } from 'react';
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
  Typography
} from '@mui/material';

const Selector = ({menu}) => {
  const [selected, setSelected] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelected(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel>{menu.label}</InputLabel>
      <Select
        multiple={menu.isMultiple}
        value={selected}
        onChange={handleChange}
        input={<OutlinedInput label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      // MenuProps={MenuProps}
      >
        {menu.listOfOptions.map((option) => (
          <MenuItem
            key={option}
            value={option}
          // style={getStyles(name, personName, theme)}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
};

export default Selector;
