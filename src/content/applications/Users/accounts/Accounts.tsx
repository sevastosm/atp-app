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
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { string } from 'prop-types';
import React, { useState } from 'react';
import { User } from 'src/models/user';
import UserDetails from './UserDetails';
import MultyTable from 'src/components/multyTable';

type Props = {};

interface IProfileFields {
  name: string;
  label: string;
  type?: string;
}

export default function Accounts() {
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
    <Container maxWidth={false}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <MultyTable />
        </Grid>
        <Grid item xs={12}>
          <UserDetails />
        </Grid>
      </Grid>
    </Container>
  );
}
