import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Display = require('../../utils/display.js');

const colors = require('../../colors.js');

function mapStateToProps(state) {
  return ({
    locale: state.locale,
  });
}

function AmountDisplay(props) {
  const style = {
    color: props.value < 0 ? colors.amount.red : colors.amount.green,
  };

  return (
    <div style={style}>
      { Display.amount(props.value, props.locale) }
    </div>
  );
}

AmountDisplay.propTypes = {
  locale: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

module.exports = connect(mapStateToProps)(AmountDisplay);
