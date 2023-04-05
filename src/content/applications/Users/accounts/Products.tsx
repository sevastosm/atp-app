import { Container, Grid, SelectChangeEvent } from '@mui/material';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import MultyTable from 'src/components/multyTable';
import TableContext from 'src/components/multyTable/TableContext';
import {
  productFilters,
  products2,
  productCategories
} from 'src/mocks/products';

const cols = [
  { name: 'name', label: 'Προιον', width: '300', required: true },
  { name: 'by', label: 'Ανα' },
  { name: 'energy', label: 'Ενέργεια (kcal)' },
  { name: 'fat', label: 'Λιπαρά (kcal)' },
  { name: 'kor_fat', label: 'Κορεσμένα (γρ.)' },
  { name: 'cabs', label: 'Υδατάνθρακες (γρ.)' },
  { name: 'sugar', label: 'Σάκχαρα (γρ.)' },
  { name: 'edodomes', label: 'Εδώδιμες ίνες  (γρ.)' },
  { name: 'protein', label: 'Πρωτεϊνη (γρ.))' },
  { name: 'salt', label: 'Αλάτι (γρ.)' },
  { name: 'code', label: 'Κωδικός -Κατηγοριας', required: true }
];

const getCategoryName = (data) =>
  productCategories.find((p) => p.value === data);

const data = products2.map((p) => {
  return { ...p, code: getCategoryName(p.code)?.label };
});

const filters = [
  {
    name: 'ΚΑΤΗΓΟΡΙΕΣ',
    column: 'code',
    values: productCategories.map((p) => {
      return { ...p, value: p.label };
    })
  }
];

console.log('DATA', data);

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
            withSelect={false}
            data={data}
            title="ΤΡΟΦΙΜΑ"
            cols={cols}
            onDataChange={getData}
            filters={filters}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
