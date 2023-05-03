import React from 'react';
import { useRoutes } from 'react-router-dom';
import router from 'src/router';
import { AppContext } from 'src/context/AppContext';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import AppNotification from './components/general/AppNotification';

function App() {
  const content = useRoutes(router);
  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
        <AppNotification />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
