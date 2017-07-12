import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from 'material-ui-icons/Add';

const DialogEntry = require('./index.jsx');

function DialogAdd(props) {
  return (
    <DialogEntry icon={<AddIcon />} validateButton="utils.Add" iconColor="accent" {...props} >
      { props.children }
    </DialogEntry>
  );
}


DialogAdd.propTypes = {
  children: PropTypes.element,
};

DialogAdd.defaultProps = {
  children: undefined,
};

module.exports = DialogAdd;
