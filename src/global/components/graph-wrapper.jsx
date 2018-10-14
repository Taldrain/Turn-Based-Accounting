import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';

function GraphWrapper(props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          Graph
        </Typography>
        { props.children }
      </CardContent>
    </Card>
  );
}

GraphWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default GraphWrapper;
