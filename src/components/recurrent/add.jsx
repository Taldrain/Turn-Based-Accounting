import React from 'react';

const DialogAdd = require('../dialog-entry/add.jsx');
const RecurrentDialogWrapper = require('./dialog-wrapper.jsx');

const DB = require('../../firebase/database.js');

const defaultStateValues = {
  type: 'year',
  balance: 'negatif',
  name: '',
  amount: '',
  startDate: '',
  endDate: '',
};

function handleAdd(data) {
  return DB.addRecurrent(data);
}

function RecurrentAdd() {
  return (
    <RecurrentDialogWrapper onValidate={handleAdd} entry={defaultStateValues}>
      <DialogAdd title="entries.Add a recurrent entry" />
    </RecurrentDialogWrapper>
  );
}

module.exports = RecurrentAdd;
