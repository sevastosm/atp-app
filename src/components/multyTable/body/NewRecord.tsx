import React, { useContext, useEffect } from 'react';
import {
  Grid,
  Box,
  TextField,
  Button,
  Alert,
  DialogTitle,
  Typography
} from '@mui/material';
import TableContext from '../TableContext';
import SaveIcon from '@mui/icons-material/Save';
type Props = any;

let requiredFiledList = [];
const fieldList = [];
export default function NewRecord({ onSave, editMode }: Props) {
  const { cols, selectedRow, requredFiledsMessage, newRecordTitle } =
    useContext(TableContext);
  const [value, setValue] = React.useState<any>(editMode ? selectedRow : '');
  const [viewSave, setViewSave] = React.useState<any>(false);
  const [requireMessage, setRequireMessage] = React.useState<any>(false);

  const requiredFileds = cols.filter((col) => col?.required === true);

  const handleInputChange = (e) => {
    setRequireMessage(false);
    const name = e.target.name;
    const newValue = e.target.value;

    const item = fieldList.find((col) => col === e.target.name);
    if (e.target.value !== '') {
      if (!fieldList.includes(item)) fieldList.push(e.target.name);
    } else {
      fieldList.splice(requiredFiledList.indexOf(item, 1));
    }

    if (e.target.attributes.required) {
      const item = requiredFileds.find((col) => col?.name === e.target.name);
      if (e.target.value !== '') {
        if (!requiredFiledList.includes(item)) requiredFiledList.push(item);
      } else {
        requiredFiledList.splice(requiredFiledList.indexOf(item, 1));
      }
    }
    console.log('requiredFiledList', requiredFiledList);
    const upDatedValue = { ...value, [name]: newValue };

    setValue(upDatedValue);
    const t = fieldList.length ? setViewSave(true) : setViewSave(false);
  };

  const handleSave = () => {
    if (requiredFileds.length === 0) {
      return onSave(value);
    }
    if (requiredFileds && requiredFileds.length === requiredFiledList.length) {
      onSave(value);
      requiredFiledList = [];
    } else setRequireMessage(true);
  };

  useEffect(() => {
    if (editMode && requiredFileds) {
      requiredFiledList = requiredFileds;
    }
  }, [selectedRow]);

  return (
    <>
      <Grid>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <Box sx={{ ml: 1, mb: 1 }}>
            <Typography variant="h4" gutterBottom>
              {newRecordTitle}
            </Typography>
          </Box>
          <Grid
            container
            direction="row"
            //   justifyContent="center"
            alignItems="stretch"
            //   spacing={3}
          >
            {cols.map((col) => (
              <TextField
                name={col.name}
                key={col.name}
                required={col?.required}
                id={col.name}
                label={col.label}
                value={value[col?.name] || ''}
                disabled={false}
                onChange={handleInputChange}
                size="small"
              />
            ))}
          </Grid>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {viewSave && (
              <Button onClick={handleSave}>
                <SaveIcon fontSize="large" />
              </Button>
            )}
            {requireMessage && (
              <Box sx={{ ml: 1 }}>
                <Alert severity="warning">{requredFiledsMessage}</Alert>
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
    </>
  );
}
