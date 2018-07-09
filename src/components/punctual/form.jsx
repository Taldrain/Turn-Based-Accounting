import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import BalanceRadio from '../balance-radio/index';

function Form(props) {
  return (
    <Grid container direction="column" justify="space-around" align="stretch" spacing={32}>
      <Grid item>
        <TextField
          id="name"
          label="Name"
          value={props.name}
          onChange={ev => props.onNewValue('name', ev.target.value)}
          autoFocus
          fullWidth
        />
      </Grid>
      <Grid item>
        <TextField
          id="amount"
          label="Amount"
          value={props.amount}
          onChange={ev => props.onNewValue('amount', parseFloat(ev.target.value || 0, 10))}
          type="number"
          min="0"
          fullWidth
        />
      </Grid>
      <Grid item>
        <BalanceRadio
          onChange={value => props.onNewValue('isPositive', value === '+')}
          isPositive={props.isPositive}
        />
      </Grid>
    </Grid>
  );
}

Form.propTypes = {
  onNewValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  isPositive: PropTypes.bool.isRequired,
};

export default Form;
