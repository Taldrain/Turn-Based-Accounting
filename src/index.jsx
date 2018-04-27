import React from 'react';
import ReactDOM from 'react-dom';
import { UIRouter, UIView, hashLocationPlugin } from '@uirouter/react';
import CssBaseline from 'material-ui/CssBaseline';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import theme from './material-ui-theme';

import reducers from './reducers/index';
import { startLocalization } from './utils/l10n';
import * as Router from './routes';

// require('./index.scss');
const store = createStore(reducers);
startLocalization(store);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <UIRouter
        plugins={[hashLocationPlugin]}
        states={Router.getStates()}
        config={Router.getConfig}
      >
        <UIView />
      </UIRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('tba-app'),
);
