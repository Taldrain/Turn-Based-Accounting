import React from 'react';
import PropTypes from 'prop-types';

import { ListEntries } from '../entries/index';
import { deletePunctualEntry } from '../../firebase/firestore';

import Add from './add';
import Edit from './edit';

const columnData = [
  { id: 'name', numeric: false, label: 'Name' },
  // { id: 'tags', numeric: false, label: 'Tags' },
  { id: 'amount', numeric: true, label: 'Amount' },
];

function handleDelete(entries) {
  entries.forEach(entry => deletePunctualEntry(entry.id));
}

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openAdd: false,
      openEdit: false,
      entry: undefined,
    };

    this.onCloseAdd = this.onCloseAdd.bind(this);
    this.onCloseEdit = this.onCloseEdit.bind(this);

    this.openAdd = this.openAdd.bind(this);
    this.openEdit = this.openEdit.bind(this);
  }

  onCloseAdd() {
    this.setState({ openAdd: false });
  }

  onCloseEdit() {
    this.setState({ openEdit: false, entry: undefined });
  }

  openAdd() {
    this.setState({ openAdd: true });
  }

  openEdit(entry) {
    console.log('edit punctual: ', entry);
    this.setState({ openEdit: true, entry });
  }

  render() {
    return (
      <div>
        <ListEntries
          title="Punctual"
          columnData={columnData}
          entries={this.props.entries}
          delete={handleDelete}
          edit={this.openEdit}
          add={this.openAdd}
          inProgress={this.props.inProgress}
        />
        <Add onClose={this.onCloseAdd} open={this.state.openAdd} date={this.props.date} />
        {
          this.state.openEdit && (
            <Edit onClose={this.onCloseEdit} entry={this.state.entry} open={this.state.openEdit} />
          )
        }
      </div>
    );
  }
}

List.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
  date: PropTypes.string.isRequired,
  inProgress: PropTypes.bool.isRequired,
};

export default List;
