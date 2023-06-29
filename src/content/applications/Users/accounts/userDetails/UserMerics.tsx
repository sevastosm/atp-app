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
  Paper,
  Button
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import DietCalculator from 'src/components/DietCalculator';
import { users } from 'src/mocks/users';
import { AppContext } from 'src/context/AppContext';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';

import Nutrition from 'src/components/Diet';
import Notes from './Notes';
import FormFields from 'src/components/general/Form';
import axios from 'axios';
import { getUserDiet, postUser } from 'src/api/users';

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
  { name: 'email', label: 'EMAIL', inputType: 'email' },
  { name: 'age', label: 'ΗΛΙΚΙΑ', inputType: 'number' },
  { name: 'nextApoitment', label: 'ΕΠΟΜΕΝΟ ΡΑΝΤΕΒΟΥ', type: 'date' }
];

const metricsFieldsLeft = [
  // ----------------------
  { name: 'date', label: 'ΗΜ/ΝΙΑ', type: 'date' },
  { name: 'weight', label: 'ΒΑΡΟΣ', inputType: 'number' },
  { name: 'height', label: 'ΥΨΟΣ', inputType: 'number' },
  { name: 'bodyFat', label: 'ΠΟΣΟΣΤΟ ΛΙΠΟΥΣ', inputType: 'number' },
  { name: 'nonFatMass', label: 'ΑΛΙΠΗ ΜΥΙΚΗ ΜΑΖΑ', inputType: 'number' },
  { name: 'boneMass', label: 'ΩΣΤΙΚΗ ΜΑΖΑ', inputType: 'number' },
  { name: 'bmi', label: 'BMI', inputType: 'number' },
  { name: 'metabolicAge', label: 'ΜΕΤΑΒΟΛΙΚΗ ΗΛΙΚΙΑ', inputType: 'number' },
  { name: 'bodyWater', label: 'ΠΟΣΟΣΤΟ ΝΕΡΟΥ', inputType: 'number' }
];
const metricsFieldsRight = [
  { name: 'chest', label: 'ΘΩΡΑΚΑΣ' },
  { name: 'pelvis', label: 'ΜΕΣΗ' },
  { name: 'belly', label: 'ΚΟΙΛΙΑ' },
  { name: 'thigh', label: 'ΜΗΡΟΣ' },
  { name: 'calves', label: 'ΓΑΜΠΑ' },
  { name: 'biseps', label: 'ΔΙΚΕΦΑΛΟΣ' }
];

const notesFilelds = [
  { name: 'activity', label: 'ΠΡΟΠΟΝΗΣΗ (ΕΙΔΟΣ,ΣΥΧΝΟΤΗΤΑ,ΩΡΕΣ Κ.Λ.Π)' },
  { name: 'allergies', label: 'ΔΙΑΦΟΡΕΣ ΠΑΘΗΣΕΙΣ - ΑΛΕΡΓΙΕΣ Κ.Α' },
  { name: 'notes', label: 'ΣΗΜΕΙΩΣΕΣ - ΠΑΡΑΤΗΡΗΣΕΙΣ' }
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

const UserMerics = ({ data, updateData, mode }) => {
  const {
    selectedRow,
    // setSelectedRow,
    setUsers,
    customers,
    setActiveUser,
    activeUser,
    setMessage
  } = React.useContext(AppContext);

  const [metrics, setMetrics] = React.useState<any | null>('');
  const [index, setIndex] = React.useState<any | null>('');
  const [value, setValue] = React.useState<any | null>('');

  // if (!selectedRow && mode !== 'add') return null;

  // const handleChange = (newValue: any | null) => {
  //   setValue(newValue);
  // };

  // const handleSelectChange = (event: SelectChangeEvent) => {
  //   setSelectValue(event.target.value as string);
  // };

  const [tabValue, setTabValue] = useState(0);

  const ButtonWraper = styled(Box)(
    ({ theme }) => `

    .MuiButton-root {
      margin-right:15px;
      border-radius: 6px;
    }
    .MuiButton-startIcon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin:auto
    }
    .button-text{
      font-size: 14px;
      margin-left: 4px;
    }

`
  );

  const newMetrics = () => {};

  const handleSaveUserMetrics = (d) => {
    let newData;

    if (data.length > 0) {
      newData = data.map((t, i) => {
        if (i === index) {
          return d;
        } else {
          return t;
        }
      });
    } else {
      newData = d;
    }

    updateData(newData);
  };
  const handleChangeDate = (i) => {
    // handleSetStore(selectedRow.nutrition[i]);
    setIndex(i);
    setValue(data[i].date);
  };

  React.useEffect(() => {
    // setMetrics(data && { ...data[data?.length - 1] });
    setIndex(data?.length > 0 ? data.length - 1 : 0);
  }, [data]);

  return (
    <>
      {value}
      <Box sx={{ display: 'flex', width: '100%' }}>
        <ButtonWraper>
          <Button
            size="small"
            variant="contained"
            onClick={() => updateData([...data, ''])}
            startIcon={<AddBoxIcon />}
          ></Button>
        </ButtonWraper>
        <Select
          id="select-metrics"
          value={value}
          onChange={(e) => handleChangeDate(e.target.value)}
        >
          {data.map((n, i) => (
            <MenuItem key={i} value={i}>
              {n?.date}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <FormFields
        fields={[...metricsFieldsLeft, ...metricsFieldsRight]}
        onSave={handleSaveUserMetrics}
        data={(data && data[index]) || ''}
        // readOnly={true}
      />
    </>
  );
};

export default UserMerics;
