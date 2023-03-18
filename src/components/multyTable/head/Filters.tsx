import {
  SelectChangeEvent,
  FormControl,
  Select,
  MenuItem,
  Box,
  InputLabel
} from '@mui/material';
import React from 'react';
import TableContext from '../TableContext';

type Props = {};

const Filters = (props: Props) => {
  const { setFilters, filters, selectOpitionLabel } =
    React.useContext(TableContext);
  console.log(filters);

  const [value, setValue] = React.useState('0');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    setFilters({ filter: filters[0].column, value: event.target.value });
  };
  if (!filters) return null;
  return (
    <>
      {filters.map((filter, i) => (
        <Box key={i} sx={{ ml: 2 }}>
          <FormControl sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-label">{filter.name}</InputLabel>
            <Select
              id="demo-simple-select-label"
              value={value}
              label={filter.name}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="0">{selectOpitionLabel}</MenuItem>
              {filter.values.map((item, i) => (
                <MenuItem key={i} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ))}
    </>
  );
};

export default Filters;
