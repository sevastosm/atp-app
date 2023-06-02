import React, { SyntheticEvent, useState } from 'react';

import { Grid, Box, Typography } from '@mui/material';
import moment from 'moment';
import { AppContext } from 'src/context/AppContext';
import FormFields from 'src/components/general/Form';

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
  { name: 'thigh', label: 'ΜΟΙΡΟΣ' },
  { name: 'calves', label: 'ΓΑΜΠΑ' },
  { name: 'biseps', label: 'ΔΙΚΕΦΑΛΟΣ' }
];

const Metrics = () => {
  const { selectedRow } = React.useContext(AppContext);
  const [metrics, setMetrics] = React.useState<any | null>(moment(new Date()));

  React.useEffect(() => {
    setMetrics(selectedRow.metrics[selectedRow.metrics.length - 1]);
  }, [selectedRow]);

  return (
    metrics && (
      <Grid className="tests" container direction="row" alignItems="start">
        <FormFields
          fields={[...metricsFieldsLeft, ...metricsFieldsRight]}
          // onSave={handleSaveUserMetrics}
          data={metrics && metrics}
        />
      </Grid>
    )
  );
};

export default Metrics;
