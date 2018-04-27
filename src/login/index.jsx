import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';

import FirebaseUILogin from './components/firebase-ui-login';
import TrianglifyBackground from './components/trianglify-background';

import { onAuthStateChanged } from '../firebase/auth';

const styles = {
  root: {
    marginTop: '20px',
  },
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = onAuthStateChanged((user) => {
      if (this.setState) {
        if (user) {
          this.setState({ logged: true });
          this.props.transition.router.stateService.go(
            this.props.returnTo.state,
            this.props.returnTo.params,
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
      <FirebaseUILogin /> : <CircularProgress />;

    return (
      <div>
        <Grid container direction="row" align="center" justify="center" style={styles.root}>
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
  returnTo: PropTypes.shape({
    state: PropTypes.object,
    params: PropTypes.object,
  }),
};

Login.defaultProps = {
  transition: {},
  returnTo: {},
};

export default Login;
