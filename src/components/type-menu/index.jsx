import React from 'react';
import PropTypes from 'prop-types';

import SimpleMenu from '../selection-control/simple-menu';

import { TYPES } from '../../utils/date-types';

function TypeMenu(props) {
  return (
    <SimpleMenu
      id={props.id}
      value={props.type}
      options={TYPES}
      onSelect={type => props.onChange(type)}
      disabled={props.disabledTypes}
    />
  );
}

TypeMenu.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['day', 'week', 'month', 'year']).isRequired,
  disabledTypes: PropTypes.arrayOf(PropTypes.oneOf(['day', 'week', 'month', 'year'])),
  onChange: PropTypes.func.isRequired,
};

TypeMenu.defaultProps = {
  disabledTypes: [],
};

export default TypeMenu;
