import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from '@material-ui/core/';

function ListTableHead(props) {
  const {
    numSelected,
    rowCount,
    onRequestSort,
    onSelectAllClick,
    columnData,
    orderBy,
    order,
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
            <TableCell
              key={column.id}
              align={column.align}
              sortDirection={orderBy === column.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === column.id}
                direction={order}
                onClick={ev => onRequestSort(ev, column.id)}
              >
                { column.label }
              </TableSortLabel>
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
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  columnData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    align: PropTypes.string,
  })).isRequired,
};

export default ListTableHead;
