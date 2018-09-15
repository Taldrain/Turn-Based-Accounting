import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  LinearProgress,
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

  componentDidMount() {
    const { history } = this.props;
    this.browserEvent = history.listen(() => this.setState({ selected: [] }));
  }

  componentWillUnmount() {
    this.browserEvent();
  }

  isSelected(entry) {
    const { selected } = this.state;
    return (selected.findIndex(i => i.id === entry.id) !== -1);
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

    this.setState({ selected: newSelected });
  }

  handleSelectAllClick(event, checked) {
    if (checked) {
      const { entries } = this.props;
      this.setState({ selected: entries });
      return;
    }

    this.setState({ selected: [] });
  }

  wrapperDelete(entries) {
    const { delete: deleteFn } = this.props;
    this.setState({ selected: [] });
    deleteFn(entries);
  }

  render() {
    const {
      classes,
      inProgress,
      edit,
      add,
      title,
      entries,
      columnData,
    } = this.props;

    const {
      selected,
    } = this.state;

    return (
      <Paper className={classes.root}>
        {
          inProgress && (
            <LinearProgress />
          )
        }
        <ListToolbar
          edit={edit}
          delete={this.wrapperDelete}
          add={add}
          selected={selected}
          title={title}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <ListTableHead
              numSelected={selected.length}
              rowCount={entries.length}
              onSelectAllClick={this.handleSelectAllClick}
              columnData={columnData}
            />
            <TableBody>
              {
                entries.map(entry => (
                  <RowEntry
                    key={entry.id}
                    entry={entry}
                    onSelectClick={ev => this.handleSelectClick(ev, entry)}
                    isSelected={this.isSelected(entry)}
                    columns={columnData}
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
  inProgress: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ListEntries));
