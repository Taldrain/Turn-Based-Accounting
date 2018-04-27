import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deletePunctual } from '../../firebase/database';

import ListEntries from '../list-entries/index';
import PunctualAdd from './add';
import PunctualEdit from './edit';

const columnData = [
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'amount', numeric: true, label: 'Amount' },
];

function handleDelete(ev, keys) {
  keys.forEach(key => deletePunctual(key));
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

export default connect(mapStateToProps)(List);
