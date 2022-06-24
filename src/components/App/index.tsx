import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from '../../common/theme';
import AppRouter from '../../components/AppRouter';
import { setupStore } from '../../store';

const store = setupStore();

const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
          <CssBaseline />
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
