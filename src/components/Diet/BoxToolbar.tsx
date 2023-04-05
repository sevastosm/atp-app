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
import { styled } from '@mui/material/styles';

import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import { Box } from '@mui/system';
import SimpleDialog from '../general/SimpleDialog';
import UserDetails from 'src/content/applications/Users/accounts/userDetails/UserDetails';
import DeleteDialog from './DeleteDialog';
import { AppContext } from 'src/context/AppContext';
import { NutritionContext } from 'src/context/nutrition/NutritionContext';

interface BoxToolbarProps {
  onAdd?: () => void;
  onEddit?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
  mode?: string;
  selectedItem?: any;
  isAddVisible?: boolean;
  isEdditVisible?: boolean;
  isDeleteVisible?: boolean;
  isSaveVisible?: boolean;
  addText?: string;
  editText?: string;
  deleteText?: string;
  saveText?: string;
}

const search = 'ΑΝΑΖΗΤΗΣΗ';
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

export default function BoxToolbar(props: BoxToolbarProps) {
  const {
    onEddit,
    onDelete,
    onAdd,
    onSave,
    selectedItem,
    isAddVisible = true,
    isEdditVisible = true,
    isDeleteVisible = true,
    isSaveVisible = true,
    addText = null,
    editText = null,
    deleteText = null,
    saveText = null
  } = props;
  const { handleAddBox, boxes } = useContext(NutritionContext);
  const handleAdd = () => onAdd();

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          mr: 2,
          mb: 3,
          alignItems: 'center',
          flexGrow: '1'
        }}
      >
        {isAddVisible && (
          <ButtonWraper>
            <Button
              size="small"
              variant="contained"
              onClick={handleAdd}
              startIcon={<AddBoxIcon />}
            >
              {addText && <span className="button-text">{addText}</span>}
            </Button>
          </ButtonWraper>
        )}
        {isEdditVisible && (
          <ButtonWraper>
            <Button
              size="small"
              variant="contained"
              onClick={onEddit}
              startIcon={<EditIcon />}
            >
              {editText && <span className="button-text">{editText}</span>}
            </Button>
          </ButtonWraper>
        )}
        {isSaveVisible && (
          <ButtonWraper>
            <Button
              size="small"
              variant="contained"
              onClick={onSave}
              startIcon={<SaveIcon />}
            >
              {saveText && <span className="button-text">{saveText}</span>}
            </Button>
          </ButtonWraper>
        )}

        {selectedItem && isDeleteVisible && (
          <ButtonWraper>
            <Button
              size="small"
              variant="contained"
              onClick={onDelete}
              startIcon={<DeleteIcon />}
            >
              {deleteText && <span className="button-text">{deleteText}</span>}
            </Button>
          </ButtonWraper>
        )}
      </Box>
    </Toolbar>
  );
}
