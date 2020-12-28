import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ToolBarDrawer from './components/toolbar-drawer';
import ProgressWait from '../components/display/progress-wait';

import Bilan from '../bilan/index';
import Global from '../global/index';
import User from '../user/index';
import Settings from '../settings/index';

import { updateSettings } from '../actions/index';
import useSettings from '../utils/hooks/useSettings';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App({ dispatch }) {
  const [settings, loading] = useSettings();
  const classes = useStyles();

  if (loading) {
    return (
      <ProgressWait marginTop={40} />
    );
  }

  dispatch(updateSettings(settings));

  return (
    <div className={classes.root}>
      <ToolBarDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/bilan/:type/:date?" component={Bilan} />
          <Route exact path="/global/:type/:date?" component={Global} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/user" component={User} />
          <Redirect from="/global" to="/global/month/" />
          <Redirect from="/" to="/bilan/day/" />
        </Switch>
      </main>
    </div>
  );
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);
