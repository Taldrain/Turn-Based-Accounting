import React from 'react';
import PropTypes from 'prop-types';
import { TableSortLabel, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';

const TextDisplay = require('../display/text.jsx');

function mapStateToProps(state) {
  return ({
    currency: state.currency,
  });
}

function Header(props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell checkbox>
          <Checkbox
            checked={props.selected.length > 0}
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
          )
        )}
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

Header.propTypes = {
  // order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  // orderBy: PropTypes.string.isRequired,
  // onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  columnData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    numeric: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  currency: PropTypes.string.isRequired,
};

module.exports = connect(mapStateToProps)(Header);
