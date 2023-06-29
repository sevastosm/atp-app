import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardHeader,
  Divider,
  ListItem,
  ListItemText,
  useTheme,
  List,
  useMediaQuery
} from '@mui/material';
import { AppContext } from 'src/context/AppContext';

type Props = {};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const Metrics = () => {
  const { selectedRow } = React.useContext(AppContext);

  const theme = useTheme();
  const matches = useMediaQuery(() => theme.breakpoints.down('sm'));
  // const { role } = selectedRow;

  // const isAdmin = role === 'admin';
  const ListWrapper = styled(List)(
    () => `
      .MuiListItem-root {
        border-radius: 0;
        margin: 0;
      }
`
  );

  const metrics = selectedRow?.metrics || [];

  const ButtonWraper = styled(Box)(
    ({ theme }) => `

    .MuiButton-root {
      margin-right:15px;
      border-radius: 6px;
    }
    .MuiButton-startIcon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin:auto
    }
    .button-text{
      font-size: 14px;
      margin-left: 4px;
    }

`
  );

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
    { name: 'thigh', label: 'ΜΗΡΟΣ' },
    { name: 'calves', label: 'ΓΑΜΠΑ' },
    { name: 'biseps', label: 'ΔΙΚΕΦΑΛΟΣ' }
  ];

  const fields = [...metricsFieldsLeft, ...metricsFieldsRight];

  return (
    <Box>
      {metrics?.length > 0 && (
        <Card sx={{ margin: 2, background: '#c1c3d169' }}>
          <Typography
            variant={matches ? 'h4' : 'h3'}
            sx={{ textAlign: 'center', marginTop: 3 }}
          >
            Οι μετρήσεις μου
          </Typography>
          <Paper elevation={8} sx={{ margin: 2 }}></Paper>
          {fields.map((field, i) => (
            <>
              <Paper key={i} elevation={8} sx={{ margin: 2 }}>
                <Card sx={{ height: '100%' }}>
                  <Typography variant="h4" sx={{ margin: 1 }}>
                    {field?.label}
                  </Typography>

                  <Divider />
                  <ListWrapper disablePadding>
                    <ListItem
                      sx={{
                        color: `${theme.colors.primary.main}`,
                        '&:hover': { color: `${theme.colors.primary.dark}` }
                      }}
                      button
                    >
                      {<ListItemText primary={metrics[0][field?.name] || ''} />}
                    </ListItem>
                  </ListWrapper>
                </Card>

                <Divider />
              </Paper>
            </>
          ))}
        </Card>
      )}
    </Box>
  );
};

export default Metrics;
