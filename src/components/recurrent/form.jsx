import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import BalanceRadio from '../balance-radio/index';
import TypeMenu from '../type-menu/index';

function Form(props) {
  return (
    <form autoComplete="off">
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
            onChange={ev => props.onNewValue('amount', parseFloat(ev.target.value, 10))}
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
        <Grid item>
          <TypeMenu
            onChange={value => props.onNewValue('type', value)}
            type={props.type}
          />
        </Grid>
        <Grid item>
          <TextField
            id="startDate"
            helperText="Start date"
            value={props.startDate}
            onChange={ev => props.onNewValue('startDate', ev.target.value)}
            type="date"
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            id="endDate"
            helperText="End date"
            value={props.endDate}
            onChange={ev => props.onNewValue('endDate', ev.target.value)}
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
  amount: PropTypes.number.isRequired,
  isPositive: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['day', 'week', 'month', 'year']).isRequired,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

Form.defaultProps = {
  startDate: undefined,
  endDate: undefined,
};

export default Form;
