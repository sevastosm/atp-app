import React, { SyntheticEvent, useState } from 'react';

import {
  Grid,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  Container,
  Typography
} from '@mui/material';
import { AppContext } from 'src/context/AppContext';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Nutrition from 'src/components/Diet';
import FormFields from 'src/components/general/Form';
import { postUser } from 'src/api/users';
import { metricsFieldsLeft, metricsFieldsRight } from 'src/content/data';

const profileFields = [
  { name: 'firstName', label: 'ΟΝΟΜΑ', required: true },
  { name: 'lastName', label: 'ΕΠΩΝΥΜΟ', required: true },
  { name: 'gender', label: 'ΦΥΛΟ', type: 'select', values: [''] },
  { name: 'phone', label: 'ΤΗΛΕΦΩΝΟ', inputType: 'number' },
  { name: 'mobile', label: 'ΚΙΝΗΤΟ', required: true, inputType: 'number' },
  { name: 'email', label: 'EMAIL', inputType: 'email' },
  { name: 'age', label: 'ΗΛΙΚΙΑ', inputType: 'number' },
  { name: 'nextApoitment', label: 'ΕΠΟΜΕΝΟ ΡΑΝΤΕΒΟΥ', type: 'date' }
];

const notesFilelds = [
  { name: 'activity', label: 'ΠΡΟΠΟΝΗΣΗ (ΕΙΔΟΣ,ΣΥΧΝΟΤΗΤΑ,ΩΡΕΣ Κ.Λ.Π)' },
  { name: 'allergies', label: 'ΔΙΑΦΟΡΕΣ ΠΑΘΗΣΕΙΣ - ΑΛΕΡΓΙΕΣ Κ.Α' },
  { name: 'notes', label: 'ΣΗΜΕΙΩΣΕΣ - ΠΑΡΑΤΗΡΗΣΕΙΣ' }
];

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

const UserAccount = ({ mode = '' }) => {
  const { selectedRow, setSelectedRow, setUsers, setMessage } =
    React.useContext(AppContext);

  const [state, setState] = useState<any>({});
  const [value, setValue] = React.useState<any | null>([]);
  const [selectValue, setSelectValue] = React.useState('');

  const { role } = selectedRow;

  const isAdmin = role === 'admin';

  // if (selectedRow && mode !== 'add') return null;

  // const handleChange = (newValue: any | null) => {
  //   setValue(newValue);
  // };

  // const handleSelectChange = (event: SelectChangeEvent) => {
  //   setSelectValue(event.target.value as string);
  // };
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const addUpdateUser = async (data) => {
    const request = await postUser(data, setMessage, data._id || null);

    setUsers(request.data.users);
    setSelectedRow(request.data.user);
  };

  const handleSaveUser = (data) => {
    addUpdateUser(data);
  };

  const handleSaveUserMetrics = (data) => {
    addUpdateUser({ ...selectedRow, metrics: data });
  };

  const handleSaveNotes = (data) => {
    addUpdateUser({ ...selectedRow, notes: data });
  };

  React.useEffect(() => {
    setValue(selectedRow);
  }, [selectedRow]);

  console.log('USER DETAILS', value);
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

                    {value?._id !== undefined && (
                      <Tab label="ΜΕΤΡΗΣΕΙΣ" {...a11yProps(1)} />
                    )}
                    {value?._id !== undefined && (
                      <Tab label="ΣΗΜΕΙΩΣΕΙΣ" {...a11yProps(2)} />
                    )}
                    {value?._id !== undefined && (
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
                              onSave={handleSaveUser}
                              data={mode !== 'add' ? value : ''}
                              onError={setMessage}
                              readOnly={!isAdmin}
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
                          <>
                            {console.log('MeTRICS', value?.metrics)}
                            <FormFields
                              fields={[
                                ...metricsFieldsLeft,
                                ...metricsFieldsRight
                              ]}
                              onSave={handleSaveUserMetrics}
                              data={
                                mode !== 'add'
                                  ? value?.metrics?.length &&
                                    value?.metrics[value?.metrics?.length - 1]
                                  : ''
                              }
                              readOnly={!isAdmin}
                            />
                          </>
                        </Grid>
                      </Box>
                      {/* </CardContent>
                      </Card> */}
                    </Grid>
                  </TabPanel>

                  <TabPanel value={tabValue} index={2}>
                    <FormFields
                      fields={notesFilelds}
                      onSave={handleSaveNotes}
                      data={
                        mode !== 'add'
                          ? value?.notes?.length &&
                            value?.notes[value?.notes?.length - 1]
                          : ''
                      }
                      onError={setMessage}
                      readOnly={!isAdmin}
                    />
                  </TabPanel>
                  <TabPanel value={tabValue} index={3}>
                    {/* <DietCalculator user={value} /> */}
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

export default UserAccount;
