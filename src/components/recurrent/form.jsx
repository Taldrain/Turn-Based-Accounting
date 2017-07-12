import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';

const BalanceRadio = require('../balance-radio/index.jsx');
const RecurrencyRadio = require('../recurrency-radio/index.jsx');
const TextDisplay = require('../display/text.jsx');

function RecurrentForm(props) {
  return (
    <Grid container direction="column" justify="space-around" align="stretch">
      <Grid item>
        <TextField
          id="name"
          label={<TextDisplay value="entries.Name" />}
          value={props.name}
          onChange={ev => props.onNewValue('name', ev.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item>
        <TextField
          id="amount"
          label={<TextDisplay value="entries.Amount" />}
          value={props.amount}
          onChange={ev => props.onNewValue('amount', ev.target.value)}
          type="number"
          min="0"
          fullWidth
        />
      </Grid>
      <Grid item xs>
        <BalanceRadio
          onChange={balance => props.onNewValue('balance', balance)}
          balance={props.balance}
        />
      </Grid>
      <Grid item>
        <RecurrencyRadio
          onChange={type => props.onNewValue('type', type)}
          type={props.type}
        />
      </Grid>
    </Grid>
  );
}

RecurrentForm.propTypes = {
  onNewValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  balance: PropTypes.oneOf(['negatif', 'positif']).isRequired,
  type: PropTypes.oneOf(['year', 'month', 'week', 'day']).isRequired,
};

module.exports = RecurrentForm;
