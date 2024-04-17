import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Stack,
  Paper,
  Typography,
  Box,
  Card,
  Button,
  TextField,
  Select,
  MenuItem,
  Avatar,
  CardHeader,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  useTheme,
  List,
  useMediaQuery
} from '@mui/material';
import {
  NutritionContext,
  NutritionContextProvider
} from 'src/context/nutrition/NutritionContext';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { AppContext } from 'src/context/AppContext';
import { addDiet } from 'src/api/users';
import { number } from 'prop-types';
import { calulateTotalMacros } from 'src/components/Diet/helpers';
import NutritionBox from 'src/components/Diet/NutritionBox';
import NutritionDates from 'src/components/Diet/NutritionDates';

type Props = {};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const Nutrition = () => {
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

  const boxes = selectedRow?.nutrition || [];

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

  return (
    <Box>
      {boxes?.length > 0 && (
        <Card sx={{ margin: 2 }}>
          <Typography
            variant={matches ? 'h4' : 'h3'}
            sx={{ textAlign: 'center', marginTop: 3 }}
          >
            Η διατροφή μου
          </Typography>
          <Paper elevation={8} sx={{ margin: 2 }}></Paper>
          {boxes[0]?.boxes.map(
            (box, i) =>
              box.active && (
                <>
                  <Paper key={i} elevation={8} sx={{ margin: 2 }}>
                    <Card sx={{ height: '100%', background: '#55c3f5' }}>
                      <Typography
                        variant="h4"
                        sx={{ margin: 1, color: '#fff' }}
                      >
                        {box.name}
                      </Typography>
                      <Divider />
                      {box.data.map((box, i) => (
                        <ListWrapper
                          sx={{ background: '#fff' }}
                          key={i}
                          disablePadding
                        >
                          <ListItem
                            key={i}
                            sx={{
                              color: `#000`,
                              '&:hover': {
                                color: `${theme.colors.primary.dark}`
                              }
                            }}
                          >
                            {/* <ListItemText primary="Είδος:" /> */}
                            <Box
                              sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                flexGrow: '1',
                                alignItems: 'baseline'
                              }}
                            >
                              <ListItemText
                                sx={{ marginRight: 1 }}
                                primaryTypographyProps={{
                                  variant: 'h5',
                                  color: `#000`
                                }}
                                primary="Είδος"
                              />
                              <ListItemText primary={box.name} />
                            </Box>
                          </ListItem>
                          <Divider />
                          <ListItem
                            key={i}
                            sx={{
                              color: `#000`,
                              '&:hover': {
                                color: `${theme.colors.primary.dark}`
                              }
                            }}
                          >
                            <ListItemText
                              primaryTypographyProps={{
                                variant: 'h5',
                                color: `${theme.colors.alpha.black[100]}`
                              }}
                              primary="Ποσότητα"
                            />
                            <ListItemText
                              primary={`${box.qi} ${
                                box.count_unit === 'piece'
                                  ? 'τεμάχιο'
                                  : box.count_unit
                              }`}
                            />
                          </ListItem>
                          <Divider />
                          {box?.notes && (
                            <ListItem
                              key={i}
                              sx={{
                                color: `#000`,
                                '&:hover': {
                                  color: `${theme.colors.primary.dark}`
                                }
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  flexGrow: '1',
                                  alignItems: 'baseline'
                                }}
                              >
                                <ListItemText
                                  sx={{ marginRight: 1 }}
                                  primaryTypographyProps={{
                                    variant: 'h5',
                                    color: `#000`
                                  }}
                                  primary="Σημιώσεις"
                                />
                                <Divider />
                                <ListItemText primary={box?.notes} />
                              </Box>
                            </ListItem>
                          )}
                        </ListWrapper>
                      ))}
                    </Card>
                    <Divider />
                  </Paper>
                  <Paper elevation={8} sx={{ margin: 2 }}>
                    <Card sx={{ height: '100%' }}>
                      <CardHeader title="Γενικές σημιώσεις" />
                      <Divider />
                      <ListWrapper disablePadding>
                        <ListItem
                          sx={{
                            color: `#000`,
                            '&:hover': { color: `${theme.colors.primary.dark}` }
                          }}
                        >
                          <ListItemText primary={box?.boxNotes} />
                        </ListItem>
                      </ListWrapper>
                    </Card>
                  </Paper>
                </>
              )
          )}
        </Card>
      )}
    </Box>
  );
};

export default Nutrition;
