import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteRecurrent } from '../../firebase/database';

import ListEntries from '../list-entries/index';
import RecurrentAdd from './add';
import RecurrentEdit from './edit';

const columnData = [
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'amount', numeric: false, label: 'Amount' },
  { id: 'type', numeric: false, label: 'Type' },
];

function mapStateToProps(state) {
  return ({
    recurrent: state.recurrent,
  });
}

function handleDelete(ev, keys) {
  keys.forEach(key => deleteRecurrent(key));
}

function List(props) {
  return (
    <ListEntries
      title="entries.Recurrent"
      columnData={columnData}
      entries={props.recurrent}
      onDelete={handleDelete}
      addDialogChild={<RecurrentAdd />}
      editDialogChild={<RecurrentEdit />}
    />
  );
}

List.propTypes = {
  recurrent: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['year', 'month', 'week', 'day']).isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(List);
