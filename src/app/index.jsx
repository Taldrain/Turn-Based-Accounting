import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ToolBarDrawer from './components/toolbar-drawer';
import ProgressWait from '../components/display/progress-wait';

import Bilan from '../bilan/index';
import Global from '../global/index';
import User from '../user/index';
import Settings from '../settings/index';

import { fetchSettings } from '../firebase/firestore';
import { updateSettings } from '../actions/index';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class App extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      isReady: false,
    };
  }

  componentDidMount() {
    fetchSettings()
      .then(settings => this.props.dispatch(updateSettings(settings)))
      .then(() => this.setState({ isReady: true }));
  }

  render() {
    const { classes } = this.props;

    if (this.state.isReady === false) {
      return (<ProgressWait marginTop={40} />);
    }

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
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(withStyles(styles)(App));
