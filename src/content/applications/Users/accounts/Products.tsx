import { Container, Grid, SelectChangeEvent } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import MultyTable from 'src/components/multyTable';
import { products } from 'src/mocks/products';

const cols = [
  'ΟΝΟΜΑ',
  'Ανα:',
  'Ενέργεια (kcal)',
  'Λιπαρά (γρ.)',
  'Κορεσμένα (γρ.)',
  'Υδατάνθρακες (γρ.)',
  'Σάκχαρα (γρ.)',
  'Εδώδιμες ίνες  (γρ.)',
  'Πρωτεϊνη (γρ.)',
  'Αλάτι (γρ.)',
  'Κωδικός -Κατηγοριας'
];

export default function Products() {
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
          <MultyTable data={products} title="Nutrion List" cols={cols} />
        </Grid>
      </Grid>
    </Container>
  );
}
