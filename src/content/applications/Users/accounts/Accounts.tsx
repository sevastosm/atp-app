import React, { useState } from 'react';
import { Container, Grid, SelectChangeEvent } from '@mui/material';
import moment from 'moment';
import UserDetails from './UserDetails';
import MultyTable from 'src/components/multyTable';
import { AppBlockingTwoTone } from '@mui/icons-material';
import { AppContext } from 'src/contexts/AppContext';
import SimpleDialog from 'src/components/general/SimpleDialog';

type Props = {};

interface IProfileFields {
  name: string;
  label: string;
  type?: string;
}

const cols = ['name', 'surname', 'gender', 'age', 'phone', 'mobile', 'email'];

export default function Accounts() {
  const { setSelectedRow, customers } = React.useContext(AppContext);
  const [state, setState] = useState({});
  const handleInputChange = (e) => console.log(e);
  const [value, setValue] = React.useState<any | null>(moment(new Date()));

  const handleChange = (newValue: any | null) => {
    setValue(newValue);
  };

  const [selectValue, setSelectValue] = React.useState('');
  const [viewDetails, setViewDetails] = React.useState(false);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value as string);
  };

  const onRowClick = (row) => {
    setSelectedRow(row);
    setViewDetails(true);
  };

  return (
    <>
      <Container maxWidth={false} sx={{ mt: 2 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            {customers && (
              <MultyTable
                onRowClick={onRowClick}
                data={customers}
                title="ΠΕΛΑΤΕΣ"
                cols={cols}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      <SimpleDialog open={viewDetails} onClose={() => setViewDetails(false)}>
        <UserDetails mode="edit" />
      </SimpleDialog>
    </>
  );
}
