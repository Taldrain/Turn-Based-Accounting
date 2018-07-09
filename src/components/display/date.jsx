import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const moment = require('moment');

function getFormat(type) {
  if (type === 'day' || type === 'week') {
    return 'LL';
  } else if (type === 'month') {
    return 'MMMM YYYY';
  }

  return 'YYYY';
}

// TODO: we suppose props.date is already of format 'YYYY-MM-DD'
// we might want to allow for date object
function DateDisplay(props) {
  return (
    <Typography {...props} component="span">
      { moment(props.date).format(getFormat(props.type)) }
    </Typography>
  );
}

DateDisplay.propTypes = {
  date: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default DateDisplay;
