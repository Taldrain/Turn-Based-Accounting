import React from 'react';
import ReactDOM from 'react-dom';
import { UIRouter, UIView, hashLocationPlugin } from '@uirouter/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import theme from './material-ui-theme';

import reducers from './reducers/index';
import { startLocalization } from './utils/l10n';
import { getConfig, getStates } from './routes';

// require('./index.scss');
const store = createStore(reducers);
startLocalization(store);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <UIRouter
        plugins={[hashLocationPlugin]}
        states={getStates()}
        config={getConfig}
      >
        <UIView />
      </UIRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('tba-app'),
);
