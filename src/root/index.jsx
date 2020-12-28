import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../login/index';
import App from '../app/index';

import GitHash from './components/git-hash';
import PrivateRoute from './components/private-route';

function Root() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" component={App} />
      </Switch>
      <GitHash />
    </React.Fragment>
  );
}

export default Root;
