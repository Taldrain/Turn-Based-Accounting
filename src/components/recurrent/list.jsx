import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const DB = require('../../firebase/database.js');

const ListEntries = require('../list-entries/index.jsx');
const RecurrentAdd = require('./add.jsx');
const RecurrentEdit = require('./edit.jsx');

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
  keys.forEach(key =>
    DB.deleteRecurrent(key)
  );
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

module.exports = connect(mapStateToProps)(List);
