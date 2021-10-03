import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

const moment = require('moment');

function getFormat(type) {
  if (type === 'day' || type === 'week') {
    return 'dddd, MMMM D, YYYY';
  }

  if (type === 'month') {
    return 'MMMM YYYY';
  }

  return 'YYYY';
}

// TODO: we suppose props.date is already of format 'YYYY-MM-DD'
// we might want to allow for date object
function DateDisplay({ type, date, ...restProps }) {
  return (
    <Typography {...restProps} component="span">
      { moment(date).format(getFormat(type)) }
    </Typography>
  );
}

DateDisplay.propTypes = {
  date: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default DateDisplay;
