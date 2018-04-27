import React from 'react';

import DialogAdd from '../dialog-entry/add';
import PunctualDialogWrapper from './dialog-wrapper';

import { addPunctual } from '../../firebase/database';

const defaultStateValues = {
  balance: 'negatif',
  name: '',
  amount: '',
};

function handleAdd(data) {
  return addPunctual(data);
}

function PunctualAdd() {
  return (
    <PunctualDialogWrapper onValidate={handleAdd} entry={defaultStateValues}>
      <DialogAdd title="entries.Add a punctual entry" />
    </PunctualDialogWrapper>
  );
}

export default PunctualAdd;
