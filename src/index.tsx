import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/context/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { AppContextProvider } from './context/AppContext';

ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
