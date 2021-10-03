import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import LoginForm from './components/form';

import useAuth from '../utils/hooks/useAuth';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
  },
}));

function Login({ location }) {
  const [loggedIn, loading] = useAuth();
  const classes = useStyles();

  if (!loading && loggedIn) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Redirect to={from} />;
  }

  return (
    <React.Fragment>
      <Grid container direction="row" align="center" justify="center" className={classes.root}>
        <Grid item>
          { loading ? <CircularProgress /> : <LoginForm /> }
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Login.propTypes = {
  location: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.object,
  }),
};

Login.defaultProps = {
  location: {},
};

export default Login;
