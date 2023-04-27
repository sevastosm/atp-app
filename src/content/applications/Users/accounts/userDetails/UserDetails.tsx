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
import FormFields from 'src/components/general/Form';
import axios from 'axios';
import { postUser } from 'src/api/users';

type Props = {};
interface IProfileFields {
  name: string;
  label: string;
  type?: string;
  inputType?: string;
}
const profileFields = [
  { name: 'firstName', label: 'ΟΝΟΜΑ', required: true },
  { name: 'lastName', label: 'ΕΠΩΝΥΜΟ', required: true },
  { name: 'gender', label: 'ΦΥΛΟ', type: 'select', values: [''] },
  { name: 'phone', label: 'ΤΗΛΕΦΩΝΟ', inputType: 'number' },
  { name: 'mobile', label: 'ΚΙΝΗΤΟ', required: true, inputType: 'number' },
  { name: 'email', label: 'EMAIL', required: true, inputType: 'email' },
  { name: 'age', label: 'ΗΛΙΚΙΑ', inputType: 'number' }
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
  const {
    selectedRow,
    setSelectedRow,
    setUsers,
    customers,
    setActiveUser,
    activeUser,
    setMessage
  } = React.useContext(AppContext);

  const [state, setState] = useState<any>({});
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

  const addUpdateUser = async (data) => {
    const userId = selectedRow._id;
    const request = await postUser(data, userId, setMessage || null);

    setUsers(request.data.users);
    setSelectedRow(request.data.user);
  };

  const hendleSaveUser = (data) => {
    addUpdateUser(data);
  };

  const hendleSaveUserMetrics = (data) => {
    addUpdateUser({ ...selectedRow, metrics: data });
  };

  if (!selectedRow && mode !== 'add') return null;

  React.useEffect(() => {
    setValue(selectedRow);
  }, [selectedRow, customers]);

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

                    {selectedRow._id && (
                      <Tab label="ΜΕΤΡΗΣΕΙΣ" {...a11yProps(1)} />
                    )}
                    {selectedRow._id && (
                      <Tab label="ΣΗΜΕΙΩΣΕΙΣ" {...a11yProps(2)} />
                    )}
                    {selectedRow._id && (
                      <Tab label="ΔΙΑΤΡΟΦΗ" {...a11yProps(3)} />
                    )}
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
                            <FormFields
                              fields={profileFields}
                              onSave={hendleSaveUser}
                              data={mode !== 'add' ? selectedRow : ''}
                              onError={setMessage}
                            />
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
                          <FormFields
                            fields={[
                              ...metricsFieldsLeft,
                              ...metricsFieldsRight
                            ]}
                            onSave={hendleSaveUserMetrics}
                            data={mode !== 'add' ? selectedRow?.metrics : ''}
                          />
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
                    Nutrition
                    {/* <DietCalculator user={selectedRow} />
                    <Nutrition /> */}
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
