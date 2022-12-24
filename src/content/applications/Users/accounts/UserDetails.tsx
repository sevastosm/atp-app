import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

type Props = {};
interface IProfileFields {
  name: string;
  label: string;
  type?: string;
}
const profileFields = [
  { name: 'name', label: 'ΟΝΟΜΑ' },
  { name: 'surname', label: 'ΕΠΩΝΥΜΟ' },
  { name: 'gender', label: 'ΦΥΛΟ', type: 'select', values: [''] },
  { name: 'phone', label: 'ΤΗΛΕΦΩΝΟ' },
  { name: 'moblie', label: 'ΚΙΝΗΤΟ' },
  { name: 'email', label: 'EMAIL' },
  { name: 'age', label: 'ΗΛΙΚΙΑ' }
];

const metricsFieldsLeft = [
  // ----------------------
  { name: 'date', label: 'ΗΜ/ΝΙΑ', type: 'date' },
  { name: 'weight', label: 'ΒΑΡΟΣ' },
  { name: 'bodyFat', label: 'ΠΟΣΟΣΤΟ ΛΙΠΟΥΣ' },
  { name: 'nonFatMass', label: 'ΑΛΙΠΗ ΜΥΙΚΗ ΜΑΖΑ' },
  { name: 'boneMass', label: 'ΩΣΤΙΚΗ ΜΑΖΑ' },
  { name: 'bmi', label: 'BMI' },
  { name: 'metabolicAge', label: 'ΜΕΤΑΒΟΛΙΚΗ ΗΛΙΚΙΑ' },
  { name: 'bodyWater', label: 'ΠΟΣΟΣΤΟ ΝΕΡΟΥ' }
];
const metricsFieldsRight = [
  { name: 'chest', label: 'ΘΩΡΑΚΑΣ' },
  { name: 'pelvis', label: 'ΜΕΣΗ' },
  { name: 'belly', label: 'ΚΟΙΛΙΑ' },
  { name: 'thigh', label: 'ΜΟΙΡΟΣ' },
  { name: 'calves', label: 'ΓΑΜΠΑ' },
  { name: 'biseps', label: 'ΔΙΚΕΦΑΛΟΣ' }
];

const TITLE = 'ΣΤΟΙΧΕΙΑ ΧΡΗΣΤΗ';
const MERRICS = 'ΜΕΤΡΗΣΕΙΣ';

const UserDetails = () => {
  const [state, setState] = useState({});
  const handleInputChange = (e) => console.log(e);
  const [value, setValue] = React.useState<any | null>(moment(new Date()));

  const handleChange = (newValue: any | null) => {
    setValue(newValue);
  };

  const [selectValue, setSelectValue] = React.useState('');

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value as string);
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
      width={'100%'}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      ></Grid>
      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader title={TITLE} />
          <Divider />
          <CardContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' }
              }}
              noValidate
              autoComplete="off"
              onSubmit={() => console.log('Form submited!')}
            >
              <Grid
                container
                direction="row"
                //   justifyContent="center"
                alignItems="stretch"
                //   spacing={3}
              >
                {profileFields.map((field: IProfileFields) => (
                  <TextField
                    key={field.name}
                    required
                    id={field.name}
                    label={field.label}
                    defaultValue=""
                    disabled={false}
                    onChange={handleInputChange}
                    size="small"
                    fullWidth
                  />
                ))}
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader title={MERRICS} />
          <Divider />
          <CardContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' }
              }}
              noValidate
              autoComplete="off"
              onSubmit={() => console.log('Form submited!')}
            >
              <Grid
                className="tests"
                container
                direction="row"
                //   justifyContent="center"
                alignItems="center"
                //   spacing={3}
              >
                <Grid item xs={12} lg={6}>
                  {metricsFieldsLeft.map((field: IProfileFields) => {
                    switch (field.type) {
                      case 'select':
                        return (
                          <Grid item>
                            <FormControl
                              fullWidth
                              style={{ margin: '9px', width: '25ch' }}
                            >
                              <InputLabel
                                id="demo-simple-select-label"
                                size="small"
                              >
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
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                              <DesktopDatePicker
                                label={field.label}
                                inputFormat="d/m/yy"
                                value={value}
                                onChange={handleChange}
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
                              key={field.name}
                              required
                              id={field.name}
                              label={field.label}
                              defaultValue=""
                              disabled={false}
                              onChange={handleInputChange}
                              size="small"
                              fullWidth
                            />
                          </Grid>
                        );
                    }
                  })}
                </Grid>
                <Grid item xs={12} lg={6}>
                  {metricsFieldsRight.map((field: IProfileFields) => {
                    switch (field.type) {
                      case 'select':
                        return (
                          <Grid item>
                            <FormControl
                              fullWidth
                              style={{ margin: '9px', width: '25ch' }}
                            >
                              <InputLabel
                                id="demo-simple-select-label"
                                size="small"
                              >
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
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                              <DesktopDatePicker
                                label={field.label}
                                inputFormat="mm/dd/yyyy"
                                value={value}
                                onChange={handleChange}
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
                              key={field.name}
                              required
                              id={field.name}
                              label={field.label}
                              defaultValue=""
                              disabled={false}
                              onChange={handleInputChange}
                              size="small"
                              fullWidth
                            />
                          </Grid>
                        );
                    }
                  })}
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserDetails;
