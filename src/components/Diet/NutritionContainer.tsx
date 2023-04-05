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

type Props = {};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const NutritionContainer = (props: Props) => {
  const { handleAddBox, boxes, selectedBox, setSelectedBox, handleDeleteBox } =
    React.useContext(NutritionContext);

  const handleAdd = () => handleAddBox({ name: 'tatatat', boxes: [] });
  const handleDelete = () => handleDeleteBox(selectedBox);

  console.log('setSelectedBox', setSelectedBox);
  return (
    <div>
      <Stack spacing={2}>
        <BoxToolbar
          onAdd={handleAdd}
          onDelete={handleDelete}
          selectedItem={selectedBox}
          isEdditVisible={false}
          addText={'NEO BOX'}
          deleteText="ΔΙΑΓΡΑΦΗ ΒΟΧ"
          saveText="ΑΠΟΘΗΚΕΥΣΗ"
        />
        <h3>Από: 25/02/2023 Έως: 12/03/2023</h3>
        {boxes.map((box, i) => (
          <div
            key={i}
            onClick={() => setSelectedBox(box)}
            style={{ background: box === selectedBox && 'red' }}
          >
            <NutritionBox data={box} />
          </div>
        ))}
      </Stack>
    </div>
  );
};

export default NutritionContainer;
