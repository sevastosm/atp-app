import React, { useContext } from 'react';
import { Grid, Box, TextField, Button } from '@mui/material';
import TableContext from '../TableContext';
import SaveIcon from '@mui/icons-material/Save';
type Props = {};

export default function NewRecord({ onSave, editMode }: any) {
  const { cols, selectedRow } = useContext(TableContext);
  const [value, setValue] = React.useState<any>(editMode ? selectedRow : '');
  const [viewSave, setViewSave] = React.useState<any>(false);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const newValue = e.target.value;
    setValue({ ...value, [name]: newValue });
    setViewSave(true);
  };

  const handleSave = () => onSave(value);

  return (
    <Grid>
      {/* <Card>
    <CardHeader title={TITLE} />
    <Divider />
    <CardContent> */}
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete="off"
      >
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
              required
              id={col.name}
              label={col.label}
              value={value[col?.name] || ''}
              disabled={false}
              onChange={handleInputChange}
              size="small"
            />
          ))}
        </Grid>
        {viewSave && (
          <Button onClick={handleSave}>
            <SaveIcon fontSize="large" />
          </Button>
        )}
      </Box>
    </Grid>
  );
}
