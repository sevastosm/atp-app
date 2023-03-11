import { Container, Grid, SelectChangeEvent } from '@mui/material';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import MultyTable from 'src/components/multyTable';
import TableContext from 'src/components/multyTable/TableContext';
import { products2 } from 'src/mocks/products';

const cols = [
  { name: 'name', label: 'Προιον' },
  { name: 'by', label: 'Ανα' },
  { name: 'energy', label: 'Ενέργεια (kcal)' },
  { name: 'fat', label: 'Λιπαρά (kcal)' },
  { name: 'kor_fat', label: 'Κορεσμένα (γρ.)' },
  { name: 'cabs', label: 'Υδατάνθρακες (γρ.)' },
  { name: 'sugar', label: 'Σάκχαρα (γρ.)' },
  { name: 'edodomes', label: 'Εδώδιμες ίνες  (γρ.)' },
  { name: 'protein', label: 'Πρωτεϊνη (γρ.))' },
  { name: 'salt', label: 'Αλάτι (γρ.)' },
  { name: 'code', label: 'Κωδικός -Κατηγοριας' }
];

export default function Products() {
  const { rows } = useContext(TableContext);
  const getData: any = (data) => {
    // const tableDAta = getData();

    console.log('onDataChange', data);
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
          <MultyTable
            data={products2}
            title="Τρόφιμα"
            cols={cols}
            onDataChange={getData}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
