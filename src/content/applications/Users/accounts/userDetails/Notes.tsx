import React from 'react';
import { Box, Card, Container, Grid, TextField } from '@mui/material';

type Props = {};

const labels = {
  activity: 'ΠΡΟΠΟΝΗΣΗ (ΕΙΔΟΣ,ΣΥΧΝΟΤΗΤΑ,ΩΡΕΣ Κ.Λ.Π)',
  allergies: 'ΔΙΑΦΟΡΕΣ ΠΑΘΗΣΕΙΣ - ΑΛΕΡΓΙΕΣ Κ.Α',
  notes: 'ΣΗΜΕΙΩΣΕΣ - ΠΑΡΑΤΗΡΗΣΕΙΣ',
  suplements: 'Συμπληρώματα διατροφης'
};

const Notes = (props: Props) => {
  return (
    <Grid
      container
      direction="row"
      //   justifyContent="center"
      alignItems="stretch"
      spacing={{ xs: 2, md: 3 }}
    >
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          label={labels.activity}
          multiline
          maxRows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          label={labels.allergies}
          multiline
          maxRows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          label={labels.notes}
          multiline
          maxRows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          label={labels.suplements}
          multiline
          maxRows={4}
        />
      </Grid>
    </Grid>
  );
};

export default Notes;
