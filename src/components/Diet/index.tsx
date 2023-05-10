import React from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Paper, Typography } from '@mui/material';
import { de } from 'date-fns/locale';
import BasicTable from './Table';
import NutritionBox from './NutritionBox';
import BoxToolbar from './BoxToolbar';
import {
  NutritionContext,
  NutritionContextProvider
} from 'src/context/nutrition/NutritionContext';
import NutritionContainer from './NutritionContainer';

type Props = {};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const Nutrition = (props: Props) => {
  return (
    <NutritionContextProvider>
      <NutritionContainer />
    </NutritionContextProvider>
  );
};

export default Nutrition;
