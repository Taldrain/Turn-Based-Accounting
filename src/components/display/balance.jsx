import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Colors from '../../colors';

import NumberDisplay from './number';

function mapStateToProps(state) {
  return ({
    locale: state.settings.locale,
    currency: state.settings.currency,
  });
}

function BalanceDisplay(props) {
  const {
    isPositive,
    locale,
    amount,
    currency,
    ...rest
  } = props;

  const style = {
    color: isPositive ? Colors.balance.green : Colors.balance.red,
  };

  return (
    <NumberDisplay {...rest} locale={locale} currency={currency} style={style}>
      {Number(`${isPositive ? '' : '-'}${Math.abs(amount)}`)}
    </NumberDisplay>
  );
}

BalanceDisplay.propTypes = {
  locale: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  isPositive: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(BalanceDisplay);
