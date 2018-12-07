import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ToolBarDrawer from './components/toolbar-drawer';

import Bilan from '../bilan/index';
import Global from '../global/index';
import Settings from '../settings/index';

import { fetchSettings } from '../firebase/firestore';
import { updateSettings } from '../actions/index';

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

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    fetchSettings().then(settings => props.dispatch(updateSettings(settings)));
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ToolBarDrawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/bilan/:type/:date?" component={Bilan} />
            <Route exact path="/global/:type/:date?" component={Global} />
            <Route exact path="/settings" component={Settings} />
            <Redirect from="/global" to="/global/month/" />
            <Redirect from="/" to="/bilan/day/" />
          </Switch>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(withStyles(styles)(App));
