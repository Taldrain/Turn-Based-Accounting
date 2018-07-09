import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';

import ToolBarDrawer from './components/toolbar-drawer';

import Bilan from '../bilan/index';
import Global from '../global/index';
import Settings from '../settings/index';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
  },
});

function App(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <ToolBarDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/bilan/:type/:date?" component={Bilan} />
          <Route exact path="/global" component={Global} />
          <Route exact path="/settings" component={Settings} />
          <Redirect from="/" to="/bilan/day/" />
        </Switch>
      </main>
    </div>
  );
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
