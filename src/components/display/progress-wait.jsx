import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  CircularProgress,
} from '@material-ui/core';

function ProgressWait({ marginTop }) {
  return (
    <Grid container direction="row" align="center" justify="center" style={{ marginTop }}>
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}

ProgressWait.propTypes = {
  marginTop: PropTypes.number,
};

ProgressWait.defaultProps = {
  marginTop: 0,
};

export default ProgressWait;
