import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import BalanceRadio from '../balance-radio/index';
import RecurrencyRadio from '../recurrency-radio/index';
import TextDisplay from '../display/text';

const styles = {
  maxWidthTypo: {
    maxWidth: '275px',
  },
};

function RecurrentForm(props) {
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
      <Grid item>
        <RecurrencyRadio
          onChange={type => props.onNewValue('type', type)}
          type={props.type}
        />
      </Grid>
      <Grid item>
        <TextField
          id="startDate"
          helperText={<TextDisplay value="entries.Start date" />}
          value={props.startDate}
          onChange={ev => props.onNewValue('startDate', ev.target.value)}
          type="date"
          fullWidth
        />
      </Grid>
      <Grid item>
        <TextField
          id="endDate"
          helperText={<TextDisplay value="entries.End date" />}
          value={props.endDate}
          onChange={ev => props.onNewValue('endDate', ev.target.value)}
          type="date"
          fullWidth
        />
      </Grid>
      <Grid item style={styles.maxWidthTypo}>
        <Typography color="secondary" variant="caption">
          <TextDisplay value="entries.Issue recurrent limit" />
        </Typography>
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
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default RecurrentForm;
