import React from 'react';
import PropTypes from 'prop-types';

const DialogEdit = require('../dialog-entry/edit.jsx');
const PunctualDialogWrapper = require('./dialog-wrapper.jsx');

const DB = require('../../firebase/database.js');
const AmountUtils = require('../../utils/amount.js');

function handleEdit(data) {
  return DB.editPunctual(data.key, data);
}

function PunctualEdit(props) {
  const entry = AmountUtils.convertForm(props.entry);
  return (
    <PunctualDialogWrapper onValidate={handleEdit} entry={entry}>
      <DialogEdit title="entries.Edit a punctual entry" />
    </PunctualDialogWrapper>
  );
}

PunctualEdit.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  entry: PropTypes.object,
};

PunctualEdit.defaultProps = {
  entry: undefined,
};

module.exports = PunctualEdit;
