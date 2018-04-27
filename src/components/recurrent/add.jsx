import React from 'react';

import DialogAdd from '../dialog-entry/add';
import RecurrentDialogWrapper from './dialog-wrapper';
import { addRecurrent } from '../../firebase/database';

const defaultStateValues = {
  type: 'year',
  balance: 'negatif',
  name: '',
  amount: '',
  startDate: '',
  endDate: '',
};

function handleAdd(data) {
  return addRecurrent(data);
}

function RecurrentAdd() {
  return (
    <RecurrentDialogWrapper onValidate={handleAdd} entry={defaultStateValues}>
      <DialogAdd title="entries.Add a recurrent entry" />
    </RecurrentDialogWrapper>
  );
}

export default RecurrentAdd;
