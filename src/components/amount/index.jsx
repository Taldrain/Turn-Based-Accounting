import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import { connect } from 'react-redux';

import { computeWithEntries } from '../../utils/amount';
import AmountDisplay from '../display/amount';
import TextDisplay from '../../components/display/text';

function mapStateToProps(state) {
  return ({
    punctual: state.punctual,
    recurrent: state.recurrent,
    type: state.dateType,
  });
}

function Amount(props) {
  const entries = [].concat(props.punctual, props.recurrent);

  return (
    <Card>
      <CardContent>
        <Typography variant="title">
          <TextDisplay value="entries.Balance" />
        </Typography>

        <Grid container direction="row" justify="center" align="center" spacing={16}>
          <Grid item>
            <Typography variant="title">
              <AmountDisplay value={computeWithEntries(entries, props.type)} />
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="column" justify="center" align="flex-start" spacing={8}>
              <Grid item>
                <Typography variant="caption">
                  <TextDisplay value="entries.Recurrent" />
                  <AmountDisplay
                    value={computeWithEntries(props.recurrent, props.type)}
                  />
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  <TextDisplay value="entries.Punctual" />
                  <AmountDisplay
                    value={computeWithEntries(props.punctual, props.type)}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

Amount.propTypes = {
  punctual: PropTypes.arrayOf(PropTypes.object).isRequired,
  recurrent: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.oneOf(['day', 'week', 'month', 'year']).isRequired,
};

export default connect(mapStateToProps)(Amount);
