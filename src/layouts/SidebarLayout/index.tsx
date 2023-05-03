import { FC, ReactNode } from 'react';
import { Box, alpha, lighten, useTheme, Alert, Snackbar } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header';
import React from 'react';
import { AppContext } from 'src/context/AppContext';

interface SidebarLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const theme = useTheme();
  const { message, setMessage } = React.useContext(AppContext);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

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
      <Box
        sx={{
          flex: 1,
          height: '100%',

          '.MuiPageTitle-wrapper': {
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0 1px 0 ${alpha(
                    lighten(theme.colors.primary.main, 0.7),
                    0.15
                  )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                    theme.colors.alpha.black[100],
                    0.1
                  )}, 0px 5px 12px -4px ${alpha(
                    theme.colors.alpha.black[100],
                    0.05
                  )}`
          }
        }}
      >
        <Header />
        <Sidebar />
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            pt: `${theme.header.height}`,
            [theme.breakpoints.up('lg')]: {
              ml: `${theme.sidebar.width}`
            }
          }}
        >
          <Box display="block">
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SidebarLayout;
