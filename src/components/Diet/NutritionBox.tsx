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
  AccordionSummary,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MultyTable from '../multyTable';
import BoxToolbar from './BoxToolbar';
import { NutritionContext } from 'src/context/nutrition/NutritionContext';
import Products from 'src/content/applications/Users/accounts/Products';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AppContext } from 'src/context/AppContext';
import { margin, spacing } from '@mui/system';
import { calculateBoxMacros } from './helpers';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const cols = [
  { name: 'name', label: 'Προιον', width: '300', required: true },
  { name: 'qi', label: 'Ποσότητα (γρ.)', required: true, inputType: 'number' },
  { name: 'by', label: 'Ανα' },
  {
    name: 'count_unit',
    label: 'Μέτρηση σε'
  },
  { name: 'energy', label: 'Ενέργεια (kcal)' },
  { name: 'protein', label: 'Πρωτεϊνη (γρ.))' },
  { name: 'fat', label: 'Λιπαρά (γρ)' },
  { name: 'carbs', label: 'Υδατάνθρακες (γρ.)' },
  { name: 'saturated_fat', label: 'Κορεσμένα (γρ.)' },
  // { name: 'sugar', label: 'Σάκχαρα (γρ.)' },
  // { name: 'edible', label: 'Εδώδιμες ίνες  (γρ.)' },
  // { name: 'salt', label: 'Αλάτι (γρ.)' },
  // { name: 'category', label: 'Κωδικός -Κατηγοριας', required: true },
  { name: 'notes', label: 'Σημιώσεις' }
];

const box = { name: '', data: [] };

const NutritionBox = ({ data, index, handleSaveAll }) => {
  const { selectedRow } = React.useContext(AppContext);

  const { role } = selectedRow;

  const isAdmin = role === 'admin' || false;
  const { handleSaveBox } = React.useContext(NutritionContext);

  const [boxData, setData] = React.useState<any>([]);
  const [boxName, setBoxName] = React.useState('');
  const [boxNotes, setBoxNotes] = React.useState('');
  const [expanded, setExapnded] = React.useState(true);
  const [active, setActive] = React.useState(true);

  const [nutritionVisible, setNutritionVisible] = React.useState(false);

  const handleInputChange = (e) => {
    setBoxName(e.target.value);
  };
  const handleBoxNotesInputChange = (e) => {
    setBoxNotes(e.target.value);
  };

  const getData: any = (data) => {
    const included = boxData.some((d) => d._id === data._id);
    if (!included) setData([...boxData, data]);
  };

  const hanndleCheck = (check) => {
    setActive(check);
    handleSaveBox(
      {
        name: boxName,
        data: boxData,
        boxNotes: boxNotes,
        active: check
      },
      index
    );
  };

  const handleSave = () => {
    handleSaveBox(
      {
        name: boxName,
        data: boxData,
        boxNotes: boxNotes,
        active: active
      },
      index
    );
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
        data: updatedList,
        boxNotes: boxNotes,
        active: active
      },
      index
    );
  };

  function calculatePercentageDifference(a, b) {
    const difference = Math.abs(a - b);
    const percentage = (difference / b) * 100;
    return percentage.toFixed(); // Round to 2 decimal places
  }

  const sumWithInitial = calculateBoxMacros(boxData, 'energy');
  const sumWithInitialProtein = calculateBoxMacros(boxData, 'protein');
  const sumWithInitialCarbs = calculateBoxMacros(boxData, 'carbs');
  const sumWithInitialFat = calculateBoxMacros(boxData, 'fat');
  const sumWithInitialProteinPrecentage =
    (sumWithInitialProtein * 100) / sumWithInitial;
  const sumWithInitialCarbsPrecentage =
    (sumWithInitialCarbs * 100) / sumWithInitial;
  const sumWithInitialFatPrecentage =
    (sumWithInitialFat * 100) / sumWithInitial;

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

  const NutritionValues = () => (
    <div onClick={(e) => e.stopPropagation()}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          gap: '10px',
          marginRight: '2px'
        }}
      >
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={active}
                onChange={(e, check) => hanndleCheck(check)}
              />
            }
            label={boxName}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: '10px'
          }}
        >
          <TextField
            id={'boxName'}
            label="ΣΥΝΟΛΟ ΘΕΡΜΙΔΩΝ"
            value={boxData?.length && sumWithInitial}
            size="small"
            InputProps={{
              readOnly: true
            }}
          />

          <Box sx={{ maxWidth: '150px' }}>
            <TextField
              id={'boxName'}
              label="ΠΡΩΤΕΙΝΗ"
              value={
                boxData?.length &&
                sumWithInitialProtein.toFixed(2) +
                  ' | ' +
                  sumWithInitialProteinPrecentage.toFixed(2) +
                  '%'
              }
              size="small"
              InputProps={{
                readOnly: true
              }}
            />
          </Box>
          <Box sx={{ maxWidth: '150px' }}>
            <TextField
              id={'boxName'}
              label="ΥΔΑΤΑΘΡΑΚΕΣ"
              value={
                boxData?.length &&
                sumWithInitialCarbs.toFixed(2) +
                  ' | ' +
                  sumWithInitialCarbsPrecentage.toFixed(2) +
                  '%'
              }
              size="small"
              InputProps={{
                readOnly: true
              }}
            />
          </Box>
          <Box sx={{ maxWidth: '150px' }}>
            <TextField
              id={'boxName'}
              label="ΛΥΠΑΡΑ"
              value={
                boxData?.length &&
                sumWithInitialFat.toFixed(2) +
                  ' | ' +
                  sumWithInitialFatPrecentage.toFixed(2) +
                  '%'
              }
              size="small"
              InputProps={{
                readOnly: true
              }}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );

  React.useEffect(() => {
    //Add lassr nutriton
    setBoxName(data.name);
    setBoxNotes(data.boxNotes);
    setData(data.data);
  }, [data]);

  return (
    <Item sx={{ position: 'relative' }}>
      <Accordion
        id={'Accordion' + index}
        expanded={expanded}
        onChange={(e, exp) => setExapnded(exp)}
      >
        <AccordionSummary
          expandIcon={
            <Box sx={{ marginRight: 2 }}>
              <ExpandMoreIcon />
            </Box>
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <NutritionValues />
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 'inherit' }}>
          <Box
            sx={{
              marginLeft: '30px',
              marginRight: '30px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
              <Box>
                <TextField
                  name={'name'}
                  id={'boxName'}
                  label="Ονομασία Box"
                  value={boxName}
                  onChange={handleInputChange}
                  onBlur={() => handleSave()}
                  size="small"
                />
              </Box>
              {/* {isAdmin && ( */}
              <Box>
                <TextField
                  id={'boxNotes'}
                  label="ΣΗΜΕΙΩΣΕΙΣ"
                  name="boxNotes"
                  value={boxNotes}
                  onChange={handleBoxNotesInputChange}
                  onBlur={() => handleSave()}
                  size="small"
                />
              </Box>
              <BoxToolbar
                isEdditVisible={false}
                onAdd={() => setNutritionVisible(true)}
                onSave={handleSave}
                // onEddit={() => setNutritionVisible(true)}
                addText={'ΤΡΟΦΗΜΑ'}
                saveText={'ΑΠΟΘΗΚΕΥΣΗ'}
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
