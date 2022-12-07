import {
  Container,
  Grid,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';
import { string } from 'prop-types';
import React, { useState } from 'react';
import { User } from 'src/models/user';

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
  { name: 'email', label: 'EMAIL' }
];

const metricsFields = [
  { name: 'gender', label: 'ΦΥΛΟ', type: 'select', values: [''] },
  // ----------------------
  { name: 'date', label: 'ΗΜ/ΝΙΑ', type: 'date' },
  { name: 'weight', label: 'ΒΑΡΟΣ' },
  { name: 'heigth', label: 'ΥΨΟΣ' },
  { name: 'bmi', label: 'BMI' },
  { name: 'bodyFat', label: 'ΠΟΣΟΣΤΟ ΛΙΠΟΥΣ' },
  { name: 'nonFatMass', label: 'ΑΛΙΠΗ ΜΥΙΚΗ ΜΑΖΑ' },
  { name: 'w', label: 'ΠΟΣΟΣΤΟ ΥΓΡΩΝ' },
  { name: 'chest', label: 'ΘΩΡΑΚΑΣ' },
  { name: 'biseps', label: 'ΔΙΚΕΦΑΛΟΣ' },
  { name: 'belly', label: 'ΚΟΙΛΙΑ' },
  { name: 'pelvis', label: 'ΜΕΣΗ' },
  { name: 'thigh', label: 'ΜΟΙΡΟΣ' },
  { name: 'calves', label: 'ΓΑΜΠΑ' }
];

const TITLE = 'ΣΤΟΙΧΕΙΑ ΧΡΗΣΤΗ';
const MERRICS = 'ΜΕΤΡΗΣΕΙΣ';

export default function Profile() {
  const [state, setState] = useState({});
  const handleInputChange = (e) => console.log(e);
  const [value, setValue] = React.useState<any | null>(
    moment('2014-08-18T21:11:54')
  );

  const handleChange = (newValue: any | null) => {
    setValue(newValue);
  };

  const [selectValue, setSelectValue] = React.useState('');

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value as string);
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
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
                  columns={2}
                  direction="row"
                  //   justifyContent="center"
                  alignItems="center"
                  //   spacing={3}
                >
                  {metricsFields.map((field: IProfileFields) => {
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
                            <DesktopDatePicker
                              label="Date desktop"
                              inputFormat="mm/dd/yyyy"
                              value={value}
                              onChange={handleChange}
                              renderInput={(params) => (
                                <TextField size="small" {...params} />
                              )}
                            />
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
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
