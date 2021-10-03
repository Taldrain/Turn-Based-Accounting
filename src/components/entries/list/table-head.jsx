import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

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
