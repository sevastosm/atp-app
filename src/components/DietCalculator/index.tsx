import {
  CAlCULATION,
  CAlCULATION_BMR,
  gender,
  workoutDencity,
  FAT_CALCULATION,
  BODY_DENCITY,
  metrics
} from './constants';

import {
  Grid,
  Card,
  CardHeader,
  Divider,
  CardContent,
  TextField,
  Box
} from '@mui/material';
// import { User } from 'src/models/user';
import { AppContext } from 'src/context/AppContext';
import React from 'react';

type Props = { user };

//const bmrMaleTEst = (66 + 13.7 * 78 + 5 * 184 - 6.8 * 38).toFixed(1);

function DietCalculator({ user }: Props) {
  console.log('user', user);
  if (!user?.metrics) return null;
  const bmrMale = (
    66 +
    13.7 * user.metrics[0].weight +
    5 * user.metrics[0].height -
    6.8 * user.age
  ).toFixed(1);
  const bmrFemale = (
    655 +
    9.6 * user.metrics[0].height +
    1.8 * user.metrics[0].weight -
    4.7 * user.age
  ).toFixed(1);

  const getGender = user.gender === '0' ? bmrMale : bmrFemale;
  const rareDencity = 1.2 * parseFloat(getGender);
  const mediumDencity = 1.375 * parseFloat(getGender);
  const intenceDencity = 1.55 * parseFloat(getGender);
  const evetydayDencity = 1.725 * parseFloat(getGender);
  const evetydayIntenceDencity = 1.9 * parseFloat(getGender);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
      width={'100%'}
      sx={{ mt: 2, mb: 4 }}
    >
      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader title="Diet Calculator" />
          <Divider />
          <CardContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' }
              }}
              noValidate
              autoComplete="off"
              onSubmit={() => console.log('Form submited!')}
            >
              <Grid
                container
                direction="row"
                //   justifyContent="center"
                alignItems="stretch"
                //   spacing={3}
              >
                <TextField
                  size="small"
                  id="outlined-read-only-input"
                  label={CAlCULATION_BMR}
                  value={user.gender === 'Male' ? bmrMale : bmrFemale}
                  InputProps={{
                    readOnly: true
                  }}
                />
                <div>
                  <div>{CAlCULATION}</div>
                  <TextField
                    size="small"
                    id="outlined-read-only-input"
                    label={workoutDencity.RARE}
                    value={rareDencity}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <TextField
                    size="small"
                    id="outlined-read-only-input"
                    label={workoutDencity.MEDIUM}
                    value={mediumDencity}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <TextField
                    size="small"
                    id="outlined-read-only-input"
                    label={workoutDencity.INTENCE}
                    value={intenceDencity}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <TextField
                    size="small"
                    id="outlined-read-only-input"
                    label={workoutDencity.EVERYDAY}
                    value={evetydayDencity}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <TextField
                    size="small"
                    id="outlined-read-only-input"
                    label={workoutDencity.EVERYDAY_INTENCE}
                    value={evetydayIntenceDencity}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </div>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default DietCalculator;
