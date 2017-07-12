import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const DB = require('../../firebase/database.js');

const ListEntries = require('../list-entries/index.jsx');
const PunctualAdd = require('./add.jsx');
const PunctualEdit = require('./edit.jsx');

const columnData = [
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'amount', numeric: true, label: 'Amount' },
];

function handleDelete(ev, keys) {
  keys.forEach(key =>
    DB.deletePunctual(key)
  );
}

function mapStateToProps(state) {
  return ({
    punctual: state.punctual,
    type: state.dateType,
  });
}

function List(props) {
  const addChild = props.type === 'day' ? (<PunctualAdd />) : '';
  return (
    <ListEntries
      title="entries.Punctual"
      columnData={columnData}
      entries={props.punctual}
      onDelete={handleDelete}
      addDialogChild={addChild}
      editDialogChild={<PunctualEdit />}
    />
  );
}

List.propTypes = {
  punctual: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  })).isRequired,
  type: PropTypes.oneOf(['day', 'week', 'month', 'year']).isRequired,
};

module.exports = connect(mapStateToProps)(List);
