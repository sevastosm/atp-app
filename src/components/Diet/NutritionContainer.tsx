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
  MenuItem
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
import { calulateTotalMacros } from './helpers';

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
    handleAddLimit,
    handleSaveAll
  } = React.useContext(NutritionContext);

  const { selectedRow, setMessage, setUsers, setSelectedRow } =
    React.useContext(AppContext);

  // const { role } = selectedRow;

  // const isAdmin = role === 'admin';

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
  const caloriesSum = calulateTotalMacros(boxes, 'energy');
  const caloriesProtein = calulateTotalMacros(boxes, 'protein');
  const caloriesCarbs = calulateTotalMacros(boxes, 'carbs');
  const caloriesFat = calulateTotalMacros(boxes, 'fat');
  const sumWithInitialProteinPrecentage = (caloriesProtein * 100) / caloriesSum;
  const sumWithInitialCarbsPrecentage = (caloriesCarbs * 100) / caloriesSum;
  const sumWithInitialFatPrecentage = (caloriesFat * 100) / caloriesSum;

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
    //Add last nutriton
    return selectedRow?.nutrition?.length
      ? handleSetStore(selectedRow.nutrition[selectedRow.nutrition.length - 1])
      : null;
  }, [selectedRow]);

  // const setWarning: any = () => {
  //   if (parseFloat(caloriesLimit) < parseFloat(caloriesSum)) {
  //     return {
  //       color: 'error',
  //       focused: true
  //     };
  //   } else if (
  //     parseFloat(caloriesLimit) - (caloriesLimit * 30) / 100 <
  //     parseFloat(caloriesSum)
  //   ) {
  //     return {
  //       color: 'warning',
  //       focused: true
  //     };
  //   } else {
  //     return {
  //       color: 'success',
  //       focused: true
  //     };
  //   }
  // };

  const handleChangeNutrition = (i) => {
    handleSetStore(selectedRow.nutrition[i]);
  };

  return (
    <Box>
      <Stack spacing={1}>
        {/* {isAdmin && ( */}
        <>
          {selectedRow.nutrition && (
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <ButtonWraper>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={
                    selectedRow[nutrition?.length - 1]?.duration.from || ''
                  }
                  label="Age"
                  onChange={(e) => handleChangeNutrition(e.target.value)}
                >
                  {selectedRow.nutrition.map((n, i) => (
                    <MenuItem key={i} value={i}>
                      {n.duration.from}
                    </MenuItem>
                  ))}
                </Select>
              </ButtonWraper>
            </Box>
          )}
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
        </>
        {/* )} */}
        {boxes?.length > 0 && (
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
                  sx={{ marginRight: '5px', maxWidth: '135px' }}
                  type="number"
                  size="small"
                  id="outlined-multiline-flexible"
                  label="ΣΥΝΟΛΟ ΘΕΡΜΙΔΩΝ"
                  onChange={handleAddLimit}
                  value={caloriesSum}
                  InputProps={{
                    readOnly: true
                  }}
                />
                {caloriesProtein && (
                  <TextField
                    sx={{ marginRight: '5px', maxWidth: '135px' }}
                    size="small"
                    id="outlined-multiline-flexible"
                    label="ΣΥΝΟΛΟ ΠΡΩΤΕΙΝΗ"
                    onChange={handleAddLimit}
                    // value={parseFloat(caloriesProtein)}
                    value={
                      caloriesProtein.toFixed(2) +
                      ' | ' +
                      sumWithInitialProteinPrecentage.toFixed(2) +
                      '%'
                    }
                    InputProps={{
                      readOnly: true
                    }}
                  />
                )}
                {caloriesCarbs && (
                  <TextField
                    sx={{ marginRight: '5px', maxWidth: '155px' }}
                    size="small"
                    id="outlined-multiline-flexible"
                    label="ΣΥΝΟΛΟ ΥΔΑΤΑ"
                    onChange={handleAddLimit}
                    value={
                      caloriesCarbs.toFixed(2) +
                      ' | ' +
                      sumWithInitialCarbsPrecentage.toFixed(2) +
                      '%'
                    }
                    InputProps={{
                      readOnly: true
                    }}
                  />
                )}
                {caloriesFat && (
                  <TextField
                    sx={{ marginRight: '5px', maxWidth: '135px' }}
                    size="small"
                    id="outlined-multiline-flexible"
                    label="ΣΥΝΟΛΟ ΛΥΠΑΡΑ"
                    onChange={handleAddLimit}
                    value={
                      caloriesFat.toFixed(2) +
                      ' | ' +
                      sumWithInitialFatPrecentage.toFixed(2) +
                      '%'
                    }
                    InputProps={{
                      readOnly: true
                    }}
                  />
                )}
                <TextField
                  sx={{ marginRight: '5px', maxWidth: '135px' }}
                  type="number"
                  size="small"
                  id="outlined-multiline-flexible"
                  label="ΟΡΙΟ"
                  onChange={handleAddLimit}
                  value={caloriesFat}
                  // color={setWarning().color}
                  // focused={setWarning().focused}
                  // InputProps={{
                  //   readOnly: !isAdmin
                  // }}
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
                <NutritionBox data={box} index={i} handleSaveAll={handleSave} />
              </Card>
            ))}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default NutritionContainer;
