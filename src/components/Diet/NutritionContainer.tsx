import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Stack,
  Paper,
  Typography,
  Box,
  Card,
  Button,
  TextField
} from '@mui/material';
import { de, el } from 'date-fns/locale';
import BasicTable from './Table';
import NutritionBox from './NutritionBox';
import BoxToolbar from './BoxToolbar';
import {
  NutritionContext,
  NutritionContextProvider
} from 'src/context/nutrition/NutritionContext';
import NutritionDates from './NutritionDates';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { AppContext } from 'src/context/AppContext';
import { addDiet } from 'src/api/users';
import { number } from 'prop-types';

type Props = {};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const NutritionContainer = () => {
  const {
    handleAddBox,
    store,
    selectedBox,
    setSelectedBox,
    handleDeleteBox,
    handleSetStore,
    handleAddNewNutririon,
    handleAddLimit
  } = React.useContext(NutritionContext);

  const { selectedRow, setMessage, setUsers, setSelectedRow } =
    React.useContext(AppContext);

  const { boxes, caloriesLimit, nutrition } = store;

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
  const caloriesSum = React.useMemo(
    () =>
      boxes?.reduce((acc, curr) => {
        curr.data.forEach((obj) => {
          acc += parseInt(obj.energy) * parseInt(obj.qi);
        });
        return acc;
      }, 0),
    [store]
  );

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
  React.useEffect(() => {
    //Add lassr nutriton
    return selectedRow?.nutrition
      ? handleSetStore(selectedRow.nutrition[selectedRow.nutrition.length - 1])
      : null;
  }, [selectedRow]);

  const setWarning: any = () => {
    if (parseInt(caloriesLimit) < parseInt(caloriesSum)) {
      return {
        color: 'error',
        focused: true
      };
    } else if (
      parseInt(caloriesLimit) - (caloriesLimit * 30) / 100 <
      parseInt(caloriesSum)
    ) {
      return {
        color: 'warning',
        focused: true
      };
    } else {
      return {
        color: 'success',
        focused: true
      };
    }
  };

  return (
    <Box>
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <ButtonWraper>
            <Button
              onClick={handleAddNewNutririon}
              size="small"
              variant="contained"
              startIcon={<AddBoxIcon />}
            >
              <span className="button-text">ΝΕΑ ΔΙΑΤΡΟΦΗ</span>
            </Button>
          </ButtonWraper>
        </Box>
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
            <Box
              sx={{
                display: 'flex',
                flexGrow: '1',
                justifyContent: 'space-between'
              }}
            >
              <NutritionDates />

              <Box>
                <TextField
                  sx={{ marginRight: '5px' }}
                  type="number"
                  size="small"
                  id="outlined-multiline-flexible"
                  label="ΣΥΝΟΛΟ ΘΕΡΜΙΔΩΝ ΔΙΑΤΡΟΦΗΣ"
                  onChange={handleAddLimit}
                  value={parseInt(caloriesSum)}
                  InputProps={{
                    readOnly: true
                  }}
                />
                <TextField
                  type="number"
                  size="small"
                  id="outlined-multiline-flexible"
                  label="ΟΡΙΟ ΘΕΡΜΙΔΩΝ"
                  onChange={handleAddLimit}
                  value={parseInt(caloriesLimit)}
                  color={setWarning().color}
                  focused={setWarning().focused}
                  // multiline
                  // maxRows={4}
                />
              </Box>
            </Box>
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
