import { FC, ReactNode } from 'react';
import { Box, alpha, lighten, useTheme, Alert, Snackbar } from '@mui/material';
import { Outlet } from 'react-router-dom';

import React from 'react';
import { AppContext } from 'src/context/AppContext';

interface SidebarLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const { message, setMessage } = React.useContext(AppContext);

  const [open, setOpen] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setMessage(null);
  };

  React.useEffect(() => {
    if (message) setOpen(true);
  }, [message]);

  return (
    <>
      {message && (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleClose}
            severity={message.type}
            sx={{ width: '100%' }}
          >
            {message.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default SidebarLayout;
