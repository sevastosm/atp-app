import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
  open: boolean;
  setDeleteOpen: any;
};

const DeleteDialog = ({ open, setDeleteOpen }: Props) => {
  // const { handleDelete, deleteWarningMessage } = React.useContext(TableContext);

  const handleClose = () => {
    setDeleteOpen(false);
  };
  const handleCloseOk = () => {
    setDeleteOpen(false);
    // handleDelete();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* {deleteWarningMessage} */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={handleCloseOk} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
