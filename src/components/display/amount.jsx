import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { amount } from '../../utils/display';
import Colors from '../../colors';

function mapStateToProps(state) {
  return ({
    locale: state.locale,
  });
}

function AmountDisplay(props) {
  const style = {
    color: props.value < 0 ? Colors.amount.red : Colors.amount.green,
  };

  return (
    <div style={style}>
      { amount(props.value, props.locale) }
    </div>
  );
}

AmountDisplay.propTypes = {
  locale: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(AmountDisplay);
