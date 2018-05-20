import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import BalanceRadio from '../balance-radio/index';
import TextDisplay from '../display/text';

function PunctualForm(props) {
  return (
    <Grid container direction="column" justify="space-around" align="stretch" spacing={16}>
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
    </Grid>
  );
}

PunctualForm.propTypes = {
  onNewValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  balance: PropTypes.oneOf(['negatif', 'positif']).isRequired,
};

export default PunctualForm;
