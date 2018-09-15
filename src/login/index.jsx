import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import FirebaseUILogin from './components/firebase-ui-login';
import LoginBackground from './components/login-background';

import { onAuthStateChanged } from '../firebase/auth';

const styles = {
  root: {
    marginTop: '40px',
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
    this.unsubscribe = onAuthStateChanged(user => this.setState({ logged: !!user }));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { location } = this.props;
    const { logged } = this.state;

    const { from } = location.state || { from: { pathname: '/' } };
    const child = logged === false ? (
      <FirebaseUILogin />
    ) : (
      <div>
        <CircularProgress />
        <Redirect to={from} />
      </div>
    );

    return (
      <div>
        <LoginBackground />
        <Grid container direction="row" align="center" justify="center" style={styles.root}>
          <Grid item>
            { child }
          </Grid>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};

Login.defaultProps = {
  location: {},
};

export default Login;
