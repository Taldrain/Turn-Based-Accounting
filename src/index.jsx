import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import theme from './material-ui-theme';

import Root from './root/index';

import reducers from './reducers/index';

const store = createStore(reducers);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('tba-app'),
);
