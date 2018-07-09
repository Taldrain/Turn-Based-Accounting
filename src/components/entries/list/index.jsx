import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
} from '@material-ui/core';

import ListToolbar from './toolbar';
import ListTableHead from './table-head';
import RowEntry from './row-entry';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class ListEntries extends React.Component {
  constructor() {
    super();

    this.state = {
      selected: [],
    };

    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleSelectClick = this.handleSelectClick.bind(this);
    this.wrapperDelete = this.wrapperDelete.bind(this);
  }

  isSelected(entry) {
    return (this.state.selected.findIndex(i => i.id === entry.id) !== -1);
  }

  handleSelectClick(event, entry) {
    const { selected } = this.state;
    const selectedIndex = selected.findIndex(i => i.id === entry.id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, entry);
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
    console.log('selected: ', newSelected);

    this.setState({ selected: newSelected });
  }

  handleSelectAllClick(event, checked) {
    if (checked) {
      this.setState({ selected: this.props.entries });
      return;
    }

    this.setState({ selected: [] });
  }

  wrapperDelete(entries) {
    this.setState({ selected: [] });
    this.props.delete(entries);
  }

  render() {
    const { classes } = this.props;
    console.log('list index');
    console.log('list entries: ', this.props.entries);

    return (
      <Paper className={classes.root}>
        <ListToolbar
          edit={this.props.edit}
          delete={this.wrapperDelete}
          add={this.props.add}
          selected={this.state.selected}
          title={this.props.title}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <ListTableHead
              numSelected={this.state.selected.length}
              rowCount={this.props.entries.length}
              onSelectAllClick={this.handleSelectAllClick}
              columnData={this.props.columnData}
            />
            <TableBody>
              {
                this.props.entries.map(entry => (
                  <RowEntry
                    key={entry.id}
                    entry={entry}
                    onSelectClick={ev => this.handleSelectClick(ev, entry)}
                    isSelected={this.isSelected(entry)}
                    columns={this.props.columnData}
                  />
                ))
              }
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }
}

ListEntries.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  edit: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  columnData: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListEntries);
