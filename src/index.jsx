import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import theme from './material-ui-theme';

import Root from './root/index';

import reducers from './reducers/index';

const store = createStore(reducers);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <Root />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('tba-app'),
);
