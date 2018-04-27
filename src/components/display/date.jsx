import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { date } from '../../utils/display';

function mapStateToProps(state) {
  return ({
    locale: state.locale,
  });
}

function DateDisplay(props) {
  return (
    <span>
      { date(props.value, props.locale, props.options) }
    </span>
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

export default connect(mapStateToProps)(DateDisplay);
