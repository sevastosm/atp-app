import React from 'react';
import { Box, TextField } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { NutritionContext } from 'src/context/nutrition/NutritionContext';
import { formatDate } from 'src/utils/heplers';

type Props = { readOnly?: boolean };

const NutritionDates = ({ readOnly = false }: Props) => {
  const { handleAddDuration, store } = React.useContext(NutritionContext);
  const [value, setValue] = React.useState<any | null>(null);
  const [valueΤο, setValueΤο] = React.useState<any | null>(null);

  const handleChange = (newValue: any | null) => {
    setValue(newValue);
    handleAddDuration({ from: formatDate(newValue), to: formatDate(valueΤο) });
  };
  const handleChangeΤο = (newValue: any | null) => {
    setValueΤο(newValue);
    handleAddDuration({ from: formatDate(value), to: formatDate(newValue) });
  };

  React.useEffect(() => {
    //Add lassr nutriton
    setValue(moment(store.duration.from, 'DD/MM/YYYY'));
    setValueΤο(moment(store.duration.to, 'DD/MM/YYYY'));
  }, [store.duration]);

  return (
    <Box display={'flex'} flexWrap="wrap">
      <Box sx={{ marginBottom: '10px', marginRight: '4px', maxWidth: '150px' }}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            disabled={readOnly}
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
            disabled={readOnly}
            label="ΕΩΣ"
            inputFormat="DD/MM/YY"
            value={valueΤο}
            onChange={handleChangeΤο}
            renderInput={(params) => (
              <TextField size="small" {...params} focused />
            )}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

export default NutritionDates;
