import React from 'react';
import { Container, Grid } from '@mui/material';
import UserDetails from './userDetails/UserDetails';
import MultyTable from 'src/components/multyTable';
import { AppContext } from 'src/context/AppContext';
import SimpleDialog from 'src/components/general/SimpleDialog';

const cols = [
  { name: 'name', label: 'ΟΝΟΜΑ' },
  { name: 'surname', label: 'ΕΠΙΘΕΤΟ' },
  { name: 'gender', label: 'ΦΙΛΟ' },
  { name: 'age', label: 'ΗΛΙΚΙΑ' },
  { name: 'phone', label: 'ΤΗΛΕΦΩΝΟ' },
  { name: 'mobile', label: 'ΚΙΝΗΤΟ', width: '75' },
  { name: 'email', label: 'EMAIL' },
  { name: 'nextApoitment', label: 'EΠΟΜΕΝΟ ΡΑΝΤΕΒΟΥ' },
  { name: 'role', label: 'Role' }
];
const excloudedFields = ['metrics', 'photos', 'appointments'];

export default function Accounts() {
  const { setSelectedRow, customers } = React.useContext(AppContext);
  const [viewDetails, setViewDetails] = React.useState(false);

  const onRowClick = (row) => {
    setSelectedRow(row);
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
                refersTo={'customers'}
                excloudedFields={excloudedFields}
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
