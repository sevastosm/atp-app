import { Container, Grid, SelectChangeEvent } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import MultyTable from 'src/components/multyTable';

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
          {/* <MultyTable /> */}
        </Grid>
      </Grid>
    </Container>
  );
}
