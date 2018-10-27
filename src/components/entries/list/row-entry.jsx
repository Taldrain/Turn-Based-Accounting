import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  TableCell,
  TableRow,
} from '@material-ui/core';

import BalanceDisplay from '../../display/balance';

import { typeDisplay } from '../../../utils/date-types';

function cellDisplay(column, entry) {
  if (column.id === 'amount' || column.id === 'computedAmount') {
    return (
      <BalanceDisplay
        isPositive={entry.isPositive}
        amount={entry[column.id]}
      />
    );
  }

  if (column.id === 'type') {
    return typeDisplay(entry[column.id]);
  }

  return entry[column.id];
}

function RowRecord(props) {
  const {
    onSelectClick,
    isSelected,
    columns,
    entry,
  } = props;

  return (
    <TableRow
      hover
      onClick={onSelectClick}
      aria-checked={isSelected}
      selected={isSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox checked={isSelected} />
      </TableCell>
      {
        columns.map(column => (
          <TableCell key={column.id} numeric={column.numeric}>
            { cellDisplay(column, entry) }
          </TableCell>
        ))
      }
    </TableRow>
  );
}

RowRecord.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  entry: PropTypes.object.isRequired,
  onSelectClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    numeric: PropTypes.bool,
  })).isRequired,
};

export default RowRecord;
