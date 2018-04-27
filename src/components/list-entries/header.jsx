import React from 'react';
import PropTypes from 'prop-types';
import { TableSortLabel, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';

import TextDisplay from '../display/text';

function mapStateToProps(state) {
  return ({
    currency: state.currency,
  });
}

function Header(props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={props.selectedCount > 0 && props.selectedCount < props.rowCount}
            checked={props.selectedCount === props.rowCount && props.rowCount !== 0}
            onChange={props.onSelectAllClick}
          />
        </TableCell>
        {props.columnData.map(column =>
          (
            <TableCell
              key={column.id}
              numeric={column.numeric}
            >
              <TableSortLabel
                active={props.orderBy === column.id}
                direction={props.order}
                onClick={ev => props.onRequestSort(ev, column.id)}
              >
                <div>
                  <TextDisplay value={`entries.${column.label}`} />
                  <span>
                    { column.label === 'Amount' ? ` (${props.currency})` : '' }
                  </span>
                </div>
              </TableSortLabel>
            </TableCell>
          ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

Header.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  // onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  selectedCount: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  columnData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    numeric: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  currency: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
