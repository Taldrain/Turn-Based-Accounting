import React from 'react';
import PropTypes from 'prop-types';

const DialogEdit = require('../dialog-entry/edit.jsx');
const RecurrentDialogWrapper = require('./dialog-wrapper.jsx');

const DB = require('../../firebase/database.js');
const AmountUtils = require('../../utils/amount.js');

function handleEdit(data) {
  return DB.editRecurrent(data.key, data);
}

function RecurrentEdit(props) {
  const entry = AmountUtils.convertForm(props.entry);
  return (
    <RecurrentDialogWrapper onValidate={handleEdit} entry={entry}>
      <DialogEdit title="entries.Edit a recurrent entry" />
    </RecurrentDialogWrapper>
  );
}

RecurrentEdit.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  entry: PropTypes.object,
};

RecurrentEdit.defaultProps = {
  entry: undefined,
};

module.exports = RecurrentEdit;
