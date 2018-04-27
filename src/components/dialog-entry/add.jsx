import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';

import DialogEntry from './index';

function DialogAdd(props) {
  return (
    <DialogEntry icon={<AddIcon />} validateButton="utils.Add" iconColor="secondary" {...props} >
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

export default DialogAdd;
