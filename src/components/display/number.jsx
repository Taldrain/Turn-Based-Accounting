import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';

import { formatBalance } from '../../utils/format';

function NumberDisplay(props) {
  const {
    style,
    children,
    locale,
    currency,
    variant,
  } = props;

  return (
    <Typography variant={variant} component="span" style={style}>
      {formatBalance(children, locale, currency)}
    </Typography>
  );
}

NumberDisplay.propTypes = {
  locale: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  children: PropTypes.number.isRequired,
  variant: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

NumberDisplay.defaultProps = {
  variant: 'body2',
  style: {},
};

export default NumberDisplay;
