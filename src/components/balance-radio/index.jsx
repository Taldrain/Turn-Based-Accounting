import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


function BalanceRadio({ isPositive, onChange }) {
  return (
    <Grid container direction="row" justify="space-around" alignItems="center" spacing={16}>
      <Grid item>
        <Grid container direction="row" justify="space-around" alignItems="center">
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
        <Grid container direction="row" justify="space-around" alignItems="center">
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
