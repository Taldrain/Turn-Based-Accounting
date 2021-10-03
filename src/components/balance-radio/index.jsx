import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function BalanceRadio({ isPositive, onChange }) {
  return (
    <Grid container direction="row" justifyContent="space-around" alignItems="center" spacing={2}>
      <Grid item>
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
          <Grid item>
            <Radio
              checked={isPositive}
              onChange={ev => onChange(ev.currentTarget.value)}
              label="+"
              value="+"
            />
          </Grid>
          <Grid item>
            <AddIcon />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
          <Grid item>
            <Radio
              checked={!isPositive}
              onChange={ev => onChange(ev.currentTarget.value)}
              label="-"
              value="-"
            />
          </Grid>
          <Grid item>
            <RemoveIcon />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

BalanceRadio.propTypes = {
  isPositive: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BalanceRadio;
