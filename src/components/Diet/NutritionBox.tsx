import React from 'react';
import {
  Stack,
  Paper,
  Typography,
  TextField,
  Box,
  Card,
  Accordion,
  AccordionDetails,
  AccordionSummary
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MultyTable from '../multyTable';
import BoxToolbar from './BoxToolbar';
import { NutritionContext } from 'src/context/nutrition/NutritionContext';
import Products from 'src/content/applications/Users/accounts/Products';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AppContext } from 'src/context/AppContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const cols = [
  { name: 'by', label: 'Ανα' },
  { name: 'name', label: 'Προιον', width: '300', required: true },
  { name: 'protein', label: 'Πρωτεϊνη (γρ.))' },
  { name: 'fat', label: 'Λιπαρά (γρ)' },
  { name: 'carbs', label: 'Υδατάνθρακες (γρ.)' },
  { name: 'saturated_fat', label: 'Κορεσμένα (γρ.)' },
  { name: 'energy', label: 'Ενέργεια (kcal)' },
  // { name: 'sugar', label: 'Σάκχαρα (γρ.)' },
  // { name: 'edible', label: 'Εδώδιμες ίνες  (γρ.)' },
  // { name: 'salt', label: 'Αλάτι (γρ.)' },
  // { name: 'category', label: 'Κωδικός -Κατηγοριας', required: true },
  { name: 'qi', label: 'Ποσότητα (γρ.)', required: true, inputType: 'number' },
  { name: 'notes', label: 'Σημιώσεις' }
];

const box = { name: '', data: [] };

const NutritionBox = ({ data, index }) => {
  const { selectedRow } = React.useContext(AppContext);

  const { role } = selectedRow;

  const isAdmin = role === 'admin' || false;
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
    // handleSaveBox(
    //   {
    //     name: boxName,
    //     data: boxData
    //   },
    //   index
    // );
    setNutritionVisible(false);
  };

  const handleSaveRecord = (record) => {
    const updatedList = boxData.map((t, i) => {
      if (i._id === record._id) {
        return record;
      } else {
        return t;
      }
    });
    setData(updatedList);
    handleSaveBox(
      {
        name: boxName,
        data: updatedList
      },
      index
    );
  };
  const sumWithInitial = boxData.reduce(
    (sum, li) =>
      sum + (parseInt(li.energy) * parseInt(li.qi)) / parseInt(li.by),
    0
  );
  const sumWithInitialProtein = boxData.reduce(
    (sum, li) =>
      sum + (parseInt(li.protein) * parseInt(li.qi)) / parseInt(li.by),
    0
  );
  const sumWithInitialCarbs = boxData.reduce(
    (sum, li) => sum + (parseInt(li.carbs) * parseInt(li.qi)) / parseInt(li.by),
    0
  );
  const sumWithInitialFat = boxData.reduce(
    (sum, li) => sum + (parseInt(li.fat) * parseInt(li.qi)) / parseInt(li.by),
    0
  );

  const handleDeleteRecord = (record) => {
    const updatedList = boxData.filter((d) => d._id !== record._id);
    setData(updatedList);
    handleSaveBox(
      {
        name: boxName,
        data: updatedList
      },
      index
    );
  };

  React.useEffect(() => {
    //Add lassr nutriton
    setBoxName(data.name);
    setData(data.data);
  }, [data]);

  return (
    <Item sx={{ position: 'relative' }}>
      <Accordion id={'Accordion' + index}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box
            sx={{
              width: '100%',

              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <TextField
                name={'name'}
                id={'boxName'}
                label="Ονομασία Box"
                value={boxName}
                onChange={handleInputChange}
                size="small"
                // InputProps={{
                //   readOnly: true
                // }}
              />
            </Box>
            <Box sx={{ maxWidth: '150px' }}>
              <TextField
                id={'boxName'}
                label="ΣΥΝΟΛΟ ΘΕΡΜΙΔΩΝ"
                value={boxData?.length && sumWithInitial}
                onChange={handleInputChange}
                size="small"
                InputProps={{
                  readOnly: !isAdmin
                }}
              />
            </Box>
            <Box sx={{ maxWidth: '150px' }}>
              <TextField
                id={'boxName'}
                label="ΠΡΩΤΕΙΝΗ"
                value={boxData?.length && sumWithInitialProtein}
                onChange={handleInputChange}
                size="small"
                InputProps={{
                  readOnly: !isAdmin
                }}
              />
            </Box>
            <Box sx={{ maxWidth: '150px' }}>
              <TextField
                id={'boxName'}
                label="ΥΔΑΤΑΘΡΑΚΕΣ"
                value={boxData?.length && sumWithInitialCarbs}
                onChange={handleInputChange}
                size="small"
                InputProps={{
                  readOnly: !isAdmin
                }}
              />
            </Box>
            <Box sx={{ maxWidth: '150px' }}>
              <TextField
                id={'boxName'}
                label="ΛΥΠΑΡΑ"
                value={boxData?.length && sumWithInitialFat}
                onChange={handleInputChange}
                size="small"
                InputProps={{
                  readOnly: !isAdmin
                }}
              />
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              marginLeft: '30px',
              marginRight: '30px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between'
            }}
          >
            {/* {isAdmin && ( */}
            <Box sx={{ flexGrow: 1 }}>
              <BoxToolbar
                isEdditVisible={false}
                onAdd={() => setNutritionVisible(true)}
                onSave={handleSave}
                // onEddit={() => setNutritionVisible(true)}
                addText={'ΤΡΟΦΗΜΑ ΓΙΑ ' + boxName}
                saveText={'ΚΛΕΙΣΙΜΟ ΤΡΟΦΗΜΑ '}
              />
            </Box>
            {/* )} */}
          </Box>

          <MultyTable
            hideAddButton={true}
            hideSearchButton={true}
            hideEditButton={isAdmin}
            hideDeleteButton={isAdmin}
            data={boxData}
            title={`ΤΡΟΦΙΜΑ ` + boxName}
            onRecordSave={handleSaveRecord}
            onRecordDelete={handleDeleteRecord}
            // hideToolbar
            cols={cols}
            // onRowClick={getData}
            //   filters={filters}
          />

          {nutritionVisible && (
            <Products
              hideAddButton={true}
              hideEditButton={true}
              hideDeleteButton={true}
              onRowSelect={getData}
            />
          )}
        </AccordionDetails>
      </Accordion>
    </Item>
  );
};

export default NutritionBox;
