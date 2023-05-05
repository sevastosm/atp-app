import { useContext, useState } from 'react';
import {
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  FormControl,
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
import DeleteDialog from './DeleteDialog';
import { AppContext } from 'src/context/AppContext';

interface EnhancedTableToolbarProps {
  numSelected: number;
  setSearch?: (string) => void;
}

const search = 'ΑΝΑΖΗΤΗΣΗ';

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  // const { setSelectedRow } = useContext(AppContext);
  const {
    handleDelete,
    title,
    refersTo,
    handleEdit,
    addRecord,
    editRecord,
    selectedRow,
    withSelect,
    onRecordSave,
    setSelectedRow,
    hideAddButton,
    hideSearchButton
  } = useContext(TableContext);

  const { numSelected, setSearch } = props;
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [editMode, setEditNode] = useState(false);

  const handleOnClose = () => {
    setOpen(false);
    setSelectedRow('');
  };
  const handleSave = (value) => {
    if (editMode) {
      editRecord(value);
    } else {
      addRecord(value);
    }
    onRecordSave(value);
    // handleOnClose();
    setEditNode(false);
  };

  const onDelete = () => {
    setDeleteOpen(true);
  };

  const onEdit = () => {
    setOpen(true);
    setEditNode(true);
    handleEdit();
  };

  return (
    <>
      <DeleteDialog open={deleteOpen} setDeleteOpen={setDeleteOpen} />
      <SimpleDialog open={open} onClose={handleOnClose}>
        {refersTo === 'customers' ? (
          <UserDetails
            mode={selectedRow ? 'edit' : 'add'}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
          />
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
          {!withSelect && (
            <>
              {!hideAddButton && (
                <Button
                  onClick={() => {
                    setSelectedRow('');
                    setEditNode(false);
                    setOpen(true);
                  }}
                >
                  <AddBoxIcon fontSize="large" />
                </Button>
              )}
              {numSelected > 0 && selectedRow && !hideAddButton && (
                <Tooltip title="Edit">
                  <IconButton onClick={onEdit}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
            </>
          )}
          <Filters />
        </Box>
        {!hideSearchButton && (
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            {/* <InputLabel htmlFor="searcht">{search}</InputLabel> */}
            <OutlinedInput
              size="small"
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
        )}

        {numSelected > 0 && selectedRow && !hideAddButton && (
          <>
            {!withSelect && (
              <Tooltip title="Delete">
                <IconButton onClick={onDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </>
        )}
        {/* // ) : (
        //   <Tooltip title="Filter list">
        //     <IconButton>
        //       <FilterListIcon />
        //     </IconButton>
        //   </Tooltip>
        // )} */}
      </Toolbar>
      <Divider />
    </>
  );
}
