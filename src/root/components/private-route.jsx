import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { requiresAuth } from '../../firebase/auth';

function PrivateRoute({ component, path }) {
  return (
    <Route
      path={path}
      render={({ location }) => (
        requiresAuth() ? (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        ) : (
          React.createElement(component)
        )
      )}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    // eslint-disable-next-line react/forbid-prop-types
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  path: PropTypes.string.isRequired,
};

export default PrivateRoute;
