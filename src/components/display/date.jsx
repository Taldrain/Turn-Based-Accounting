import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Display = require('../../utils/display.js');

function mapStateToProps(state) {
  return ({
    locale: state.locale,
  });
}

function DateDisplay(props) {
  return (
    <div>
      { Display.date(props.value, props.locale, props.options) }
    </div>
  );
}

DateDisplay.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  locale: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.object,
};

DateDisplay.defaultProps = {
  options: undefined,
};

module.exports = connect(mapStateToProps)(DateDisplay);
