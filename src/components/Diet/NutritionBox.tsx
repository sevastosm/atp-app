import React from 'react';
import { Stack, Paper, Typography, TextField, Box, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import MultyTable from '../multyTable';
import BoxToolbar from './BoxToolbar';
import { NutritionContext } from 'src/context/nutrition/NutritionContext';
import Products from 'src/content/applications/Users/accounts/Products';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const cols = [
  { name: 'name', label: 'Προιον', width: '300', required: true },
  // { name: 'by', label: 'Ανα' },
  // { name: 'energy', label: 'Ενέργεια (kcal)' },
  // { name: 'fat', label: 'Λιπαρά (kcal)' },
  // { name: 'saturated_fat', label: 'Κορεσμένα (γρ.)' },
  // { name: 'carbs', label: 'Υδατάνθρακες (γρ.)' },
  // { name: 'sugar', label: 'Σάκχαρα (γρ.)' },
  // { name: 'edible', label: 'Εδώδιμες ίνες  (γρ.)' },
  // { name: 'protein', label: 'Πρωτεϊνη (γρ.))' },
  // { name: 'salt', label: 'Αλάτι (γρ.)' },
  // { name: 'category', label: 'Κωδικός -Κατηγοριας', required: true },
  { name: 'notes', label: 'Σημιώσεις', required: true }
];

const box = { name: '', data: [] };

const NutritionBox = ({ data, index }) => {
  const { handleSaveBox } = React.useContext(NutritionContext);

  const [boxData, setData] = React.useState<any>([]);
  const [boxName, setBoxName] = React.useState('');
  const [nutritionVisible, setNutritionVisible] = React.useState(false);

  const handleInputChange = (e) => {
    setBoxName(e.target.value);
  };

  const getData: any = (data) => {
    const included = boxData.some((d) => d._id === data._id);
    if (!included) setData([...boxData, data]);
  };

  const handleSave = () => {
    handleSaveBox(
      {
        name: boxName,
        data: boxData
      },
      index
    );
    setNutritionVisible(false);
  };

  return (
    <Item sx={{ position: 'relative' }}>
      <Box sx={{ marginLeft: '40px', position: 'absolute' }}>
        <BoxToolbar
          isEdditVisible={false}
          onAdd={() => setNutritionVisible(true)}
          onSave={handleSave}
          // onEddit={() => setNutritionVisible(true)}
        />
      </Box>

      <TextField
        name={'name'}
        id={'boxName'}
        label="Ονομασία Box"
        value={boxName}
        onChange={handleInputChange}
        size="small"
      />

      {nutritionVisible && (
        <Products hideAddButton={true} onRowSelect={getData} />
      )}
      <>
        <MultyTable
          hideAddButton={true}
          hideSearchButton={true}
          data={boxData}
          title="ΤΡΟΦΙΜΑ"
          // hideToolbar
          cols={cols}
          // onRowClick={getData}
          //   filters={filters}
        />
      </>
    </Item>
  );
};

export default NutritionBox;
