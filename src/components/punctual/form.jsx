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
    errors,
  } = props;
  return (
    <form autoComplete="off">
      <Grid container direction="column" justify="space-around" align="stretch" spacing={4}>
        <Grid item>
          <TextField
            id="name"
            label="Name"
            value={name}
            onChange={ev => onNewValue('name', ev.target.value)}
            inputProps={{
              autoCapitalize: 'words',
            }}
            autoFocus
            fullWidth
            error={errors.name !== undefined}
            helperText={errors.name}
          />
        </Grid>
        <Grid item>
          <TextField
            id="amount"
            label="Amount"
            value={amount}
            onChange={ev => onNewValue('amount', ev.target.value)}
            type="number"
            min="0"
            fullWidth
            error={errors.amount !== undefined}
            helperText={errors.amount}
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
  amount: PropTypes.string.isRequired,
  isPositive: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.string,
  }),
};

Form.defaultProps = {
  errors: {},
};

export default Form;
