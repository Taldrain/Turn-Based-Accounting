import React from 'react';
import ReactDOM from 'react-dom';
import { UIRouter, UIView, pushStateLocationPlugin } from '@uirouter/react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const theme = require('./material-ui-theme.js');

const Router = require('./routes.js');

require('font-awesome-webpack');

require('./index.scss');

injectTapEventPlugin();

const store = createStore(require('./reducers/index.js'));
require('./utils/l10n.js').start(store);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <UIRouter
        plugins={[pushStateLocationPlugin]}
        states={Router.getStates()}
        config={Router.getConfig}
      >
        <UIView />
      </UIRouter>
    </Provider>
  </MuiThemeProvider>
, document.getElementById('tba-app'));
