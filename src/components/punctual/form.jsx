import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import BalanceRadio from '../balance-radio/index';

function Form(props) {
  const {
    name,
    amount,
    onNewValue,
    isPositive,
  } = props;
  return (
    <form autoComplete="off">
      <Grid container direction="column" justify="space-around" align="stretch" spacing={32}>
        <Grid item>
          <TextField
            id="name"
            label="Name"
            value={name}
            onChange={ev => onNewValue('name', ev.target.value)}
            inputProps={{
              autocapitalize: 'words',
            }}
            autoFocus
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            id="amount"
            label="Amount"
            value={amount ? `${amount}` : 0}
            onChange={ev => onNewValue('amount', parseFloat(ev.target.value, 10) || undefined)}
            type="number"
            min="0"
            fullWidth
          />
        </Grid>
        <Grid item>
          <BalanceRadio
            onChange={value => onNewValue('isPositive', value === '+')}
            isPositive={isPositive}
          />
        </Grid>
      </Grid>
    </form>
  );
}

Form.propTypes = {
  onNewValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  amount: PropTypes.number,
  isPositive: PropTypes.bool.isRequired,
};

Form.defaultProps = {
  amount: undefined,
};

export default Form;
