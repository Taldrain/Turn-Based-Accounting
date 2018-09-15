import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import BalanceRadio from '../balance-radio/index';
import TypeMenu from '../type-menu/index';

function Form(props) {
  const {
    name,
    amount,
    isPositive,
    type,
    onNewValue,
    startDate,
    endDate,
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
        <Grid item>
          <TypeMenu
            onChange={value => onNewValue('type', value)}
            type={type}
          />
        </Grid>
        <Grid item>
          <TextField
            id="startDate"
            helperText="Start date"
            value={startDate}
            onChange={ev => onNewValue('startDate', ev.target.value)}
            type="date"
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            id="endDate"
            helperText="End date"
            value={endDate}
            onChange={ev => onNewValue('endDate', ev.target.value)}
            type="date"
            fullWidth
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
  type: PropTypes.oneOf(['day', 'week', 'month', 'year']).isRequired,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

Form.defaultProps = {
  amount: undefined,
  startDate: undefined,
  endDate: undefined,
};

export default Form;
