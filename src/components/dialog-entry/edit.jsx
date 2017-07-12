import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from 'material-ui-icons/Edit';

const DialogEntry = require('./index.jsx');

function DialogEdit(props) {
  return (
    <DialogEntry icon={<EditIcon />} validateButton="utils.Edit" {...props} >
      { props.children }
    </DialogEntry>
  );
}


DialogEdit.propTypes = {
  children: PropTypes.element,
};

DialogEdit.defaultProps = {
  children: undefined,
};

module.exports = DialogEdit;
