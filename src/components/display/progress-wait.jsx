import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

function ProgressWait({ marginTop }) {
  return (
    <Grid container direction="row" align="center" justifyContent="center" style={{ marginTop }}>
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
