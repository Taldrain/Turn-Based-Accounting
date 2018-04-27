import React from 'react';
import PropTypes from 'prop-types';

import DialogEdit from '../dialog-entry/edit';
import PunctualDialogWrapper from './dialog-wrapper';

import { editPunctual } from '../../firebase/database';
import { convertForm } from '../../utils/amount';

function handleEdit(data) {
  return editPunctual(data.key, data);
}

function PunctualEdit(props) {
  const entry = convertForm(props.entry);
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

export default PunctualEdit;
