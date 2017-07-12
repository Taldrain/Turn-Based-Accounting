import React from 'react';

const DialogAdd = require('../dialog-entry/add.jsx');
const PunctualDialogWrapper = require('./dialog-wrapper.jsx');

const DB = require('../../firebase/database.js');

const defaultStateValues = {
  balance: 'negatif',
  name: '',
  amount: '',
};

function handleAdd(data) {
  return DB.addPunctual(data);
}

function PunctualAdd() {
  return (
    <PunctualDialogWrapper onValidate={handleAdd} entry={defaultStateValues}>
      <DialogAdd title="entries.Add a punctual entry" />
    </PunctualDialogWrapper>
  );
}

module.exports = PunctualAdd;
