import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core/';

function ListTableHead(props) {
  const {
    numSelected,
    rowCount,
    onSelectAllClick,
    columnData,
  } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount !== 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {
          columnData.map(column => (
            <TableCell key={column.id} numeric={column.numeric}>
              { column.label }
            </TableCell>
          ))
        }
      </TableRow>
    </TableHead>
  );
}

ListTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  columnData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    numeric: PropTypes.bool,
  })).isRequired,
};

export default ListTableHead;
