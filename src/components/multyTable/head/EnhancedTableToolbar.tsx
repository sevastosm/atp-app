import React, { useState } from 'react';
import {
  Toolbar,
  alpha,
  Typography,
  Tooltip,
  IconButton,
  Input,
  FormControl,
  InputLabel,
  OutlinedInput,
  Divider,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Box } from '@mui/system';
import SimpleDialog from './AddRecordDialog';

interface EnhancedTableToolbarProps {
  numSelected: number;
}
export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  const [open, setOpen] = useState(false);
  const handleOnClose = () => setOpen(false);
  return (
    <>
      <SimpleDialog open={open} onClose={handleOnClose} />
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 }
        }}
      >
        <Typography sx={{ ml: 2 }} variant="h6" id="tableTitle" component="div">
          Nutrition
        </Typography>
        <Box sx={{ flex: '1 1 100%', ml: 2 }}>
          <Button onClick={() => setOpen(true)}>
            <AddBoxIcon fontSize="large" />
          </Button>
        </Box>
        {numSelected > 0 && (
          <Typography
            sx={{ flex: '1 1 100%', ml: 2 }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        )}
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel htmlFor="searcht">Search</InputLabel>
          <OutlinedInput
            id="search"
            // value={values.amount}
            // onChange={handleChange('amount')}
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            label="Amount"
          />
        </FormControl>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <Divider />
    </>
  );
}
