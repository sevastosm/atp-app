import React from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Paper, Typography, Box, Card } from '@mui/material';
import { de } from 'date-fns/locale';
import BasicTable from './Table';
import NutritionBox from './NutritionBox';
import BoxToolbar from './BoxToolbar';
import {
  NutritionContext,
  NutritionContextProvider
} from 'src/context/nutrition/NutritionContext';
import NutritionDates from './NutritionDates';

type Props = {};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const NutritionContainer = (props: Props) => {
  const { handleAddBox, store, selectedBox, setSelectedBox, handleDeleteBox } =
    React.useContext(NutritionContext);

  const { boxes } = store;

  const handleAdd = () => handleAddBox({});
  const handleDelete = () => {
    handleDeleteBox(selectedBox);
    setSelectedBox(null);
  };

  const handleSave = () => {};

  return (
    <Box>
      <Stack spacing={1}>
        <BoxToolbar
          onAdd={handleAdd}
          onDelete={handleDelete}
          onSave={handleSave}
          selectedItem={selectedBox}
          isEdditVisible={false}
          addText={'ΝΕΟ BOX'}
          deleteText="ΔΙΑΓΡΑΦΗ ΒΟΧ"
          saveText="ΑΠΟΘΗΚΕΥΣΗ ΔΙΑΤΡΟΦΗΣ"
        />
        {boxes.length > 0 && (
          <>
            {/* <h3>Από: 25/02/2023 Έως: 12/03/2023</h3> */}
            <NutritionDates />
            {boxes.map((box, i) => (
              <Card
                variant="outlined"
                key={i}
                onClick={() => setSelectedBox(box)}
                style={{
                  border: box === selectedBox && '1px solid blue'
                  // border: 'solid 1px'
                }}
              >
                <NutritionBox data={box} index={i} />
              </Card>
            ))}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default NutritionContainer;
