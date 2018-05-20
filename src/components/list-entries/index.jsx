import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';

import { convertFromTo } from '../../utils/amount';
import AmountDisplay from '../display/amount';
import Header from './header';
import Toolbar from './toolbar';
import TextDisplay from '../display/text';

const styles = {
  paper: {
    overflowX: 'auto',
  },
};

function typeDisplay(value) {
  switch (value) {
    case 'year':
      return 'date.Yearly';
    case 'month':
      return 'date.Monthly';
    case 'week':
      return 'date.Weekly';
    case 'day':
      return 'date.Daily';
    default:
      return value;
  }
}

function display(entry, type, toDateType) {
  switch (type) {
    case 'type':
      return <TextDisplay value={typeDisplay(entry.type)} />;
    case 'amount':
      return <AmountDisplay value={convertFromTo(entry[type], entry.type, toDateType)} />;
    default:
      return entry[type];
  }
}

function sort(entries, order, orderBy) {
  return entries.sort((a, b) =>
    (order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]));
}

function mapStateToProps(state) {
  return ({
    type: state.dateType,
  });
}

class ListEntries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'desc',
      orderBy: 'addedAt',
      selected: [],
      entries: props.entries,
      type: props.type,
    };

    this.onDelete = this.onDelete.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ entries: sort(nextProps.entries), type: nextProps.type });
  }

  onDelete(ev, keys) {
    this.props.onDelete(ev, keys);

    this.setState({ selected: [] });
  }

  handleRequestSort(ev, orderBy) {
    let order = 'desc';
    if (this.state.orderBy === orderBy && this.state.order === 'desc') {
      order = 'asc';
    }

    const entries = sort(this.state.entries, order, orderBy);

    this.setState({ entries, order, orderBy });
  }


  handleSelectAllClick(event, checked) {
    if (checked) {
      this.setState({ selected: this.state.entries.map(n => n.key) });
      return;
    }

    this.setState({ selected: [] });
  }

  handleClick(event, key) {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(key);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, key);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  }

  isSelected(key) {
    return this.state.selected.indexOf(key) !== -1;
  }

  render() {
    return (
      <Paper style={styles.paper}>
        <Toolbar
          selected={this.state.selected}
          onDelete={this.onDelete}
          title={this.props.title}
          addDialogChild={this.props.addDialogChild}
        />
        <Table>
          <Header
            order={this.state.order}
            orderBy={this.state.orderBy}
            onRequestSort={this.handleRequestSort}
            selectedCount={this.state.selected.length}
            onSelectAllClick={this.handleSelectAllClick}
            rowCount={this.state.entries.length}
            columnData={this.props.columnData}
          />
          <TableBody>
            {this.state.entries.map((n) => {
              const isSelected = this.isSelected(n.key);
              return (
                <TableRow
                  hover
                  onClick={ev => this.handleClick(ev, n.key)}
                  role="checkbox"
                  aria-checked={isSelected}
                  selected={isSelected}
                  key={n.key}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  {this.props.columnData.map(column =>
                    (
                      <TableCell
                        key={column.id}
                        numeric={column.numeric}
                      >
                        { display(n, column.id, this.state.type) }
                      </TableCell>
                    ))}
                  <TableCell padding="none">
                    { React.cloneElement(
                      this.props.editDialogChild,
                      { entry: Object.assign({}, n) },
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

ListEntries.propTypes = {
  title: PropTypes.string.isRequired,
  columnData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    numeric: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  addDialogChild: PropTypes.node.isRequired,
  editDialogChild: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['day', 'week', 'month', 'year']).isRequired,
};

export default connect(mapStateToProps)(ListEntries);
