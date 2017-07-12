import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';

const AuthTabs = require('./components/auth-tabs.jsx');
const AuthProviders = require('./components/auth-providers.jsx');
const TrianglifyBackground = require('./components/trianglify-background.jsx');

const Auth = require('../firebase/auth.js');

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = Auth.onAuthStateChanged((user) => {
      if (this.setState) {
        if (user) {
          this.setState({ logged: true });
          this.props.transition.router.stateService.go(
            this.props.resolves.returnTo.state,
            this.props.resolves.returnTo.params,
            { reload: true },
          );
        } else {
          this.setState({ logged: false });
        }
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const child = this.state.logged === false ?
      (
        <div>
          <AuthTabs />
          <AuthProviders />
        </div>
      ) :
      (
        <CircularProgress />
      );

    return (
      <div>
        <Grid container direction="row" align="center" justify="center">
          <Grid item>
            { child }
          </Grid>
        </Grid>
        <TrianglifyBackground />
      </div>
    );
  }
}

Login.propTypes = {
  transition: PropTypes.shape({
    router: PropTypes.object,
  }),
  resolves: PropTypes.shape({
    returnTo: PropTypes.object,
  }),
};

Login.defaultProps = {
  transition: {},
  resolves: {},
};

module.exports = Login;
