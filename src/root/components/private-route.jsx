import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { requiresAuth } from '../../firebase/auth';

function PrivateRoute({ component: Component, ...other }) {
  return (
    <Route
      {...other}
      render={renderProps => (
        requiresAuth() ? (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: renderProps.location },
            }}
          />
        ) : (
          <Component {...renderProps} />
        )
      )}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
