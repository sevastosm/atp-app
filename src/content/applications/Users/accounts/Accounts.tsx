import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Grid } from '@mui/material';
import UserDetails from './userDetails/UserDetails';
import MultyTable from 'src/components/multyTable';
import { AppContext } from 'src/context/AppContext';
import SimpleDialog from 'src/components/general/SimpleDialog';
import { fetchUsers, deleteUser } from 'src/api/users';

const cols = [
  { name: 'firstName', label: 'ΟΝΟΜΑ' },
  { name: 'lastName', label: 'ΕΠΙΘΕΤΟ' },
  { name: 'gender', label: 'ΦΥΛΟ' },
  { name: 'age', label: 'ΗΛΙΚΙΑ' },
  // { name: 'phone', label: 'ΤΗΛΕΦΩΝΟ' },
  { name: 'mobile', label: 'ΚΙΝΗΤΟ', width: '75' },
  { name: 'email', label: 'EMAIL' },
  { name: 'nextApoitment', label: 'EΠΟΜΕΝΟ ΡΑΝΤΕΒΟΥ' }
  // { name: 'role', label: 'Role' }
];
const excloudedFields = ['metrics', 'photos', 'appointments', '_id'];

export default function Accounts() {
  const { setSelectedRow, customers, setUsers, auth } =
    React.useContext(AppContext);
  const [viewDetails, setViewDetails] = React.useState(false);

  const getUsers = async () => {
    await fetchUsers().then((users) => setUsers(users.data));
  };

  useEffect(() => {
    if (!auth) return null;
    getUsers();
  }, []);

  const onRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleDataChange = (data) => {
    console.log('TABLECHANGE-', data);
  };

  return (
    <>
      {/* <Container maxWidth={false} sx={{ mt: 2 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}> */}
      {customers && (
        <MultyTable
          onRowClick={onRowClick}
          data={customers}
          title="ΠΕΛΑΤΕΣ"
          cols={cols}
          refersTo={'customers'}
          excloudedFields={excloudedFields}
          onRecordDelete={(selectedRow) => deleteUser(selectedRow._id)}
          defaultFilter="firstName"
          onDataChange={handleDataChange}
        />
      )}
      {/* </Grid>
        </Grid>
      </Container> */}
      <SimpleDialog open={viewDetails} onClose={() => setViewDetails(false)}>
        <UserDetails mode="edit" />
      </SimpleDialog>
    </>
  );
}
