import React from 'react';
import PropTypes from 'prop-types';

import { ListEntries } from '../entries/index';
import { deleteRecurrentEntry } from '../../firebase/firestore';

import Add from './add';
import Edit from './edit';

const columnData = [
  { id: 'name', label: 'Name' },
  // { id: 'tags', numeric: false, label: 'Tags' },
  { id: 'type', label: 'Type' },
  { id: 'computedAmount', align: 'right', label: 'Amount' },
];

function handleDelete(entries) {
  entries.forEach(entry => deleteRecurrentEntry(entry.id));
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
    this.setState({ openEdit: true, entry });
  }

  render() {
    const { entries, inProgress } = this.props;
    const { openAdd, openEdit, entry } = this.state;

    return (
      <div>
        <ListEntries
          title="Recurrent"
          defaultOrderBy="computedAmount"
          columnData={columnData}
          entries={entries}
          delete={handleDelete}
          edit={this.openEdit}
          add={this.openAdd}
          inProgress={inProgress}
        />
        <Add onClose={this.onCloseAdd} open={openAdd} />
        {
          openEdit && (
            <Edit onClose={this.onCloseEdit} entry={entry} open={openEdit} />
          )
        }
      </div>
    );
  }
}

List.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
  inProgress: PropTypes.bool.isRequired,
};

export default List;
