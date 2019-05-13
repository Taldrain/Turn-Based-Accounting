import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { requiresAuth } from '../../firebase/auth';

function PrivateRoute({ component, ...other }) {
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
          React.createElement(component, renderProps)
        )
      )}
    />
  );
}

PrivateRoute.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.object.isRequired,
};

export default PrivateRoute;
