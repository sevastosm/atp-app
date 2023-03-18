import React, { ReactEventHandler, useContext, useState } from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/system';
import SimpleDialog from '../../general/SimpleDialog';
import TableContext from '../TableContext';
import UserDetails from 'src/content/applications/Users/accounts/userDetails/UserDetails';
import NewRecord from '../body/NewRecord';
import Filters from './Filters';

interface EnhancedTableToolbarProps {
  numSelected: number;
  setSearch?: (string) => void;
}

const search = 'ΑΝΑΖΗΤΗΣΗ';

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { handleDelete, title, refersTo, handleEdit, addRecord, editRecord } =
    useContext(TableContext);

  const { numSelected, setSearch } = props;
  const [open, setOpen] = useState(false);
  const [editMode, setEditNode] = useState(false);

  const handleOnClose = () => setOpen(false);
  const handleSave = (value) => {
    if (editMode) {
      editRecord(value);
    } else {
      addRecord(value);
    }
    handleOnClose();
    setEditNode(false);
  };

  const onEdit = () => {
    setOpen(true);
    setEditNode(true);
    handleEdit();
  };

  return (
    <>
      <SimpleDialog open={open} onClose={handleOnClose}>
        {refersTo === 'customers' ? (
          <UserDetails mode={editMode ? 'edit' : 'add'} />
        ) : (
          <NewRecord onSave={handleSave} editMode={editMode} />
        )}
      </SimpleDialog>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 }
        }}
      >
        <Box
          sx={{ display: 'flex', ml: 2, alignItems: 'center', flexGrow: '1' }}
        >
          <Typography
            sx={{ fontWeight: 'bold' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>
          <Button
            onClick={() => {
              setEditNode(false);
              setOpen(true);
            }}
          >
            <AddBoxIcon fontSize="large" />
          </Button>
          {numSelected > 0 && (
            <Tooltip title="Edit">
              <IconButton onClick={onEdit}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          <Filters />
        </Box>
        {/* {numSelected > 0 && (
          <Typography
            sx={{ flex: '1 1 100%', ml: 2 }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        )} */}
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          {/* <InputLabel htmlFor="searcht">{search}</InputLabel> */}
          <OutlinedInput
            id="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder={search}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        {numSelected > 0 ? (
          <>
            <Tooltip title="Delete">
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
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
