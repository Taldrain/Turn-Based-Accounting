import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import Colors from '../../colors';

function BalanceDisplay(props) {
  const { isPositive, amount, ...rest } = props;

  const style = {
    color: isPositive ? Colors.balance.green : Colors.balance.red,
  };

  return (
    <Typography {...rest} component="span" style={style}>
      { isPositive === false && '-' } { Math.abs(amount).toFixed(2) }
    </Typography>
  );
}

BalanceDisplay.propTypes = {
  amount: PropTypes.number.isRequired,
  isPositive: PropTypes.bool.isRequired,
};

export default BalanceDisplay;
