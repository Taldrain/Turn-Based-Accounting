import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import { connect } from 'react-redux';

const AmountUtils = require('../../utils/amount.js');
const AmountDisplay = require('../display/amount.jsx');
const TextDisplay = require('../../components/display/text.jsx');

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
        <Typography type="title">
          <TextDisplay value="entries.Balance" />
        </Typography>

        <Grid container direction="row" justify="center" align="center">
          <Grid item>
            <Typography type="title">
              <AmountDisplay value={AmountUtils.computeWithEntries(entries, props.type)} />
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="column" justify="center" align="flex-start">
              <Grid item>
                <Typography type="caption">
                  <TextDisplay value="entries.Recurrent" />
                  <AmountDisplay
                    value={AmountUtils.computeWithEntries(props.recurrent, props.type)}
                  />
                </Typography>
              </Grid>
              <Grid item>
                <Typography type="caption">
                  <TextDisplay value="entries.Punctual" />
                  <AmountDisplay
                    value={AmountUtils.computeWithEntries(props.punctual, props.type)}
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

module.exports = connect(mapStateToProps)(Amount);
