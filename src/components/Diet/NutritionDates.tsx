import React from 'react';
import { Box, TextField } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { NutritionContext } from 'src/context/nutrition/NutritionContext';

type Props = {};

const NutritionDates = (props: Props) => {
  const { handleAddDuration } = React.useContext(NutritionContext);
  const [value, setValue] = React.useState<any | null>(null);
  const [valueΤο, setValueΤο] = React.useState<any | null>(null);

  const handleChange = (newValue: any | null) => {
    console.log('newValue', newValue);
    setValue(newValue);
    handleAddDuration({ from: newValue, to: valueΤο });
  };
  const handleChangeΤο = (newValue: any | null) => {
    setValueΤο(newValue);
    handleAddDuration({ from: value, to: newValue });
  };

  return (
    <Box display={'flex'} flexWrap="wrap">
      <Box sx={{ marginBottom: '10px', marginRight: '4px', maxWidth: '150px' }}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label="ΑΠΟ"
            inputFormat="DD/MM/YY"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ maxWidth: '150px' }}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            label="ΕΩΣ"
            inputFormat="DD/MM/YY"
            value={valueΤο}
            onChange={handleChangeΤο}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

export default NutritionDates;
