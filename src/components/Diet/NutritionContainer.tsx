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
import { AppBlockingTwoTone, ConstructionOutlined } from '@mui/icons-material';
import { AppContext } from 'src/context/AppContext';
import { addDiet } from 'src/api/users';

type Props = {};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const NutritionContainer = (props: Props) => {
  const {
    handleAddBox,
    store,
    selectedBox,
    setSelectedBox,
    handleDeleteBox,
    handleSetStore
  } = React.useContext(NutritionContext);

  const { selectedRow, setMessage, setUsers, setSelectedRow } =
    React.useContext(AppContext);

  const { boxes } = store;

  const handleAdd = () => handleAddBox({ name: '', data: [] });
  const handleDelete = () => {
    handleDeleteBox(selectedBox);
    setSelectedBox(null);
  };

  const handleSave = () => {
    addDiet(store, setMessage, selectedRow._id, store._id).then(
      (response: any) => {
        setSelectedRow(response.data.user);
        setUsers(response.data.users);
      }
    );
  };

  React.useEffect(() => {
    //Add lassr nutriton
    return selectedRow?.nutrition[0]
      ? handleSetStore(selectedRow.nutrition[0])
      : null;
  }, [selectedRow]);
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
          saveText="ΑΠΟΘΗΚΕΥΣΗ ΟΛΩΝ"
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
