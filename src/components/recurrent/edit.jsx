import React from 'react';
import PropTypes from 'prop-types';

import DialogEdit from '../dialog-entry/edit';
import RecurrentDialogWrapper from './dialog-wrapper';

import { editRecurrent } from '../../firebase/database';
import { convertForm } from '../../utils/amount';

function handleEdit(data) {
  return editRecurrent(data.key, data);
}

function RecurrentEdit(props) {
  const entry = convertForm(props.entry);
  if (props.entry.startDate) {
    entry.startDate = new Date(props.entry.startDate).toISOString().substring(0, 10);
  }

  if (props.entry.endDate) {
    entry.endDate = new Date(props.entry.endDate).toISOString().substring(0, 10);
  }

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

export default RecurrentEdit;
