import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

import BalanceDisplay from '../../components/display/balance';

function computeBalance(entries) {
  return entries.reduce((acc, entry) => (
    acc + ((entry.computedAmount || entry.amount) * (entry.isPositive ? 1 : -1))
  ), 0);
}

function Balance(props) {
  const sumPunctuals = computeBalance(props.punctuals);
  const sumRecurrents = computeBalance(props.recurrents);
  const sumEntries = sumPunctuals + sumRecurrents;
  return (
    <Card>
      <CardContent>
        <Typography variant="title">
          Balance
        </Typography>
        <Grid container direction="row" justify="center" alignItems="center" spacing={40}>
          <Grid item>
            <BalanceDisplay variant="title" amount={sumEntries} isPositive={sumEntries < 0} />
          </Grid>
          <Grid item>
            <Grid container direction="column" justify="center" alignItems="flex-start" spacing={8}>
              <Grid item>
                <Typography variant="caption">
                  Recurrents
                </Typography>
                <BalanceDisplay
                  variant="caption"
                  amount={sumRecurrents}
                  isPositive={sumRecurrents < 0}
                />
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  Punctuals
                </Typography>
                <BalanceDisplay
                  variant="caption"
                  amount={sumPunctuals}
                  isPositive={sumPunctuals < 0}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

Balance.propTypes = {
  recurrents: PropTypes.arrayOf(PropTypes.object).isRequired,
  punctuals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Balance;