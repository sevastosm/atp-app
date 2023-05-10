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

export default function NewRecord({ onSave, editMode }: Props) {
  const { cols, selectedRow, requredFiledsMessage, newRecordTitle } =
    useContext(TableContext);
  const [value, setValue] = React.useState<any>(editMode ? selectedRow : '');
  const [viewSave, setViewSave] = React.useState<any>(false);
  const [requireMessage, setRequireMessage] = React.useState<any>(false);

  /*Get required fields*/
  const requiredFileds = cols
    .map((obj) => obj.required && obj.name)
    .filter((value) => {
      return value !== undefined;
    });

  const handleInputChange = (e) => {
    setRequireMessage(false);
    const name = e.target.name;
    const newValue = e.target.value;

    const upDatedValue = { ...value, [name]: newValue };

    const isValid = requiredFileds.every(
      (f) => upDatedValue[f] && upDatedValue[f] !== ''
    );

    setViewSave(isValid);
    setValue(upDatedValue);
  };

  const handleSave = () => {
    if (viewSave) {
      return onSave(value);
    }
  };

  return (
    <>
      {console.log('RENDER')}
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
                type={col.inputType}
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
            {/* {requireMessage && (
              <Box sx={{ ml: 1 }}>
                <Alert severity="warning">{requredFiledsMessage}</Alert>
              </Box>
            )} */}
          </Box>
        </Box>
      </Grid>
    </>
  );
}
