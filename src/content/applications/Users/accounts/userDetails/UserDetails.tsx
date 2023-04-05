import React, { SyntheticEvent, useState } from 'react';

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
  SelectChangeEvent,
  Container,
  Typography,
  Stack,
  Paper
} from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import DietCalculator from 'src/components/DietCalculator';
import { users } from 'src/mocks/users';
import { AppContext } from 'src/context/AppContext';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Nutrition from 'src/components/Diet';
import Notes from './Notes';

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
  { name: 'mobile', label: 'ΚΙΝΗΤΟ' },
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const UserDetails = ({ mode = '' }) => {
  const { selectedRow } = React.useContext(AppContext);
  console.log('selectedRow', selectedRow);

  const [state, setState] = useState<any>({});
  const handleInputChange = (e) => console.log(e);
  const [value, setValue] = React.useState<any | null>(moment(new Date()));

  const handleChange = (newValue: any | null) => {
    setValue(newValue);
  };

  const [selectValue, setSelectValue] = React.useState('');

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value as string);
  };
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // React.useEffect(() => {
  //   setState(selectedRow);
  // }, [selectedRow]);
  console.log(mode);
  if (!selectedRow && mode !== 'add') return null;

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
      // width={'100%'}
      sx={{ mt: 2, mb: 4 }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader title="ΚΑΡΤΕΛΑ ΠΕΛΑΤΗ" />
              <Divider />
              <CardContent>
                <Box sx={{ width: '100%' }}>
                  <Tabs
                    variant="scrollable"
                    scrollButtons="auto"
                    textColor="primary"
                    indicatorColor="primary"
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="ΣΤΟΙΧΕΙΑ" {...a11yProps(0)} />
                    <Tab label="ΜΕΤΡΗΣΕΙΣ" {...a11yProps(1)} />
                    <Tab label="ΣΗΜΕΙΩΣΕΙΣ" {...a11yProps(2)} />
                    <Tab label="ΔΙΑΤΡΟΦΗ" {...a11yProps(3)} />
                  </Tabs>
                  <TabPanel value={tabValue} index={0}>
                    <>
                      <Grid>
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
                                defaultValue={
                                  mode === 'edit' ? selectedRow[field.name] : ''
                                }
                                disabled={false}
                                onChange={handleInputChange}
                                size="small"
                              />
                            ))}
                          </Grid>
                        </Box>
                        {/* </CardContent>
                        </Card> */}
                      </Grid>
                    </>
                  </TabPanel>
                  <TabPanel value={tabValue} index={1}>
                    <Grid item>
                      {/* <Card>
                        <CardHeader title={MERRICS} /> */}
                      {/* <Divider />
                        <CardContent> */}
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
                          alignItems="start"
                        >
                          <Grid item>
                            {metricsFieldsLeft.map((field: IProfileFields) => {
                              switch (field.type) {
                                case 'select':
                                  return (
                                    <Grid item>
                                      <FormControl
                                        style={{
                                          margin: '9px',
                                          width: '25ch'
                                        }}
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
                                      <LocalizationProvider
                                        dateAdapter={AdapterMoment}
                                      >
                                        <DesktopDatePicker
                                          label={field.label}
                                          inputFormat="d/m/yy"
                                          value={value}
                                          onChange={handleChange}
                                          renderInput={(params) => (
                                            <TextField
                                              size="small"
                                              {...params}
                                            />
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
                                        value={
                                          mode === 'edit'
                                            ? selectedRow.metrics[field.name]
                                            : ''
                                        }
                                        disabled={false}
                                        onChange={handleInputChange}
                                        size="small"
                                      />
                                    </Grid>
                                  );
                              }
                            })}
                          </Grid>
                          <Grid item>
                            {metricsFieldsRight.map((field: IProfileFields) => {
                              switch (field.type) {
                                case 'select':
                                  return (
                                    <Grid item>
                                      <FormControl
                                        style={{
                                          margin: '9px',
                                          width: '25ch'
                                        }}
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
                                      <LocalizationProvider
                                        dateAdapter={AdapterMoment}
                                      >
                                        <DesktopDatePicker
                                          label={field.label}
                                          inputFormat="mm/dd/yyyy"
                                          value={value}
                                          onChange={handleChange}
                                          renderInput={(params) => (
                                            <TextField
                                              size="small"
                                              {...params}
                                            />
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
                                        value={
                                          mode === 'edit'
                                            ? selectedRow.metrics[field.name]
                                            : ''
                                        }
                                        disabled={false}
                                        onChange={handleInputChange}
                                        size="small"
                                      />
                                    </Grid>
                                  );
                              }
                            })}
                          </Grid>
                        </Grid>
                      </Box>
                      {/* </CardContent>
                      </Card> */}
                    </Grid>
                  </TabPanel>

                  <TabPanel value={tabValue} index={2}>
                    <Notes />
                  </TabPanel>
                  <TabPanel value={tabValue} index={3}>
                    <DietCalculator user={selectedRow} />
                    <Nutrition />
                  </TabPanel>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default UserDetails;
