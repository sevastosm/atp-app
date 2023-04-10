import React from 'react';
import { Stack, Paper, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import MultyTable from '../multyTable';
import BoxToolbar from './BoxToolbar';
import { NutritionContext } from 'src/context/nutrition/NutritionContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const cols = [{ name: '', label: '' }];

const box = { name: '', data: [] };

const NutritionBox = ({ data }) => {
  const [boxData, setData] = React.useState(data);
  const [boxName, setBoxName] = React.useState(boxData.name);

  const handleInputChange = (e) => {
    setBoxName(e.targe.value);
  };

  console.log('boxData', boxData);

  const getData: any = (data) => {
    // const tableDAta = getData();

    console.log('onDataChange', data);
  };

  return (
    <Item>
      <BoxToolbar />
      {boxName ? (
        boxName
      ) : (
        <TextField
          name={boxName}
          key={boxName}
          id={boxName}
          label="Name"
          value={boxName}
          disabled={false}
          onChange={handleInputChange}
          size="small"
        />
      )}
      <MultyTable
        data={[]}
        //   title="ΤΡΟΦΙΜΑ"
        hideToolbar
        cols={[]}
        onDataChange={getData}
        //   filters={filters}
      />
    </Item>
  );
};

export default NutritionBox;
