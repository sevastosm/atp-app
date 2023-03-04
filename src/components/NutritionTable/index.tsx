import React from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Paper, Typography } from '@mui/material';
import { de } from 'date-fns/locale';
import BasicTable from './Table';

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
    <div>
      <Stack spacing={2}>
        <h3>Από: 25/02/2023 Έως: 12/03/2023</h3>
        <Item>
          <Typography
            sx={{ m: 1, mb: 2 }}
            align="left"
            variant="h4"
            gutterBottom
          >
            ΠΡΩΙΝΟ
          </Typography>
          <BasicTable />
        </Item>
        <Item>
          <Typography align="left" variant="h4" gutterBottom>
            ΣΝΑΚ
          </Typography>
          <BasicTable />
        </Item>
        <Item>
          <Typography align="left" variant="h4" gutterBottom>
            ΜΕΣΗΜΕΡΙΑΝΟ
          </Typography>
          <BasicTable />
        </Item>
      </Stack>
    </div>
  );
};

export default Nutrition;
