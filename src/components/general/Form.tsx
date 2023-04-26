import React, { useContext, useEffect } from 'react';
import {
  Grid,
  Box,
  TextField,
  Button,
  Alert,
  DialogTitle,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { REQUEST_FILELD_MESSAGE, NEW_RECORD_TITLE } from 'src/constants';
import {
  LocalizationProvider,
  DesktopDatePicker,
  DatePicker
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
type Props = any;

let requiredFiledList = [];
const fieldList = [];
export default function FormFields({
  onSave,
  fields,
  requredFiledsMessage = REQUEST_FILELD_MESSAGE,
  newRecordTitle = NEW_RECORD_TITLE,
  data
}: Props) {
  const [value, setValue] = React.useState<any>('');
  const [selectValue, setSelectValue] = React.useState('');
  const [viewSave, setViewSave] = React.useState<any>(false);
  const [requireMessage, setRequireMessage] = React.useState<any>(false);

  console.log('FORM--DATA', value);

  /*Get required fields*/
  const requiredFileds = fields
    .map((obj) => obj.required && obj.name)
    .filter((value) => {
      return value !== undefined;
    });

  const handleInputChange = (data, name) => {
    setRequireMessage(false);
    const newValue = data;

    const upDatedValue = { ...value, [name]: newValue };

    const isValid = requiredFileds.every(
      (f) => upDatedValue[f] && upDatedValue[f] !== ''
    );

    setViewSave(isValid);
    setValue(upDatedValue);
  };
  const handleDateChange = (data) => console.log('handleDateChange', data);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value as string);
  };

  const handleSave = () => {
    if (viewSave) {
      return onSave(value);
    }
  };

  useEffect(() => {
    setValue(data);
  }, [data]);

  return (
    <>
      <Grid>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <Box sx={{ ml: 1, mb: 1 }}>
            <Typography variant="h4" gutterBottom>
              {newRecordTitle}
            </Typography>
          </Box>
          <Grid
            container
            direction="row"
            //   justifyContent="center"
            alignItems="stretch"
            //   spacing={3}
          >
            {fields.map((field, i) => {
              switch (field.type) {
                case 'select':
                  return (
                    <Grid item key={i}>
                      <FormControl
                        style={{
                          margin: '9px',
                          width: '25ch'
                        }}
                      >
                        <InputLabel id="demo-simple-select-label" size="small">
                          {field.label}
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={selectValue}
                          label="fsdfsf"
                          onChange={handleSelectChange}
                          size="small"
                        >
                          <MenuItem value={1}>ΑΝΔΡΑΣ</MenuItem>
                          <MenuItem value={0}>ΓΥΝΑΙΚΑ</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  );
                case 'date':
                  return (
                    <Grid item>
                      {/* <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          label={field.label}
                          inputFormat="mm/dd/yyyy"
                          value={value}
                          onChange={handleInputChange}
                          renderInput={(params) => (
                            <TextField size="small" {...params} />
                          )}
                        />
                      </LocalizationProvider> */}
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label="ΗΜ/ΝΙΑ"
                          inputFormat="DD/MM/YY"
                          value={value[field?.name] || ''}
                          onChange={(e) => handleInputChange(e, field.name)}
                          renderInput={(params) => (
                            <TextField size="small" {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  );
                default:
                  return (
                    <Grid item>
                      <TextField
                        error
                        type={field?.inputType}
                        name={field.name}
                        key={field.name}
                        required={field?.required}
                        id={field.name}
                        label={field.label}
                        value={value[field?.name] || ''}
                        disabled={false}
                        onChange={(e) =>
                          handleInputChange(e.target.value, field.name)
                        }
                        size="small"
                      />
                    </Grid>
                  );
              }
            })}
          </Grid>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {viewSave && (
              <Button onClick={handleSave}>
                <SaveIcon fontSize="large" />
              </Button>
            )}
            {requireMessage && (
              <Box sx={{ ml: 1 }}>
                <Alert severity="warning">{requredFiledsMessage}</Alert>
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
    </>
  );
}
