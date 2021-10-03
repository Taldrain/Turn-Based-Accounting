import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function DialogEntry(props) {
  const {
    open,
    handleClick,
    onClose,
    title,
    children,
    validateButton,
  } = props;

  const onClick = () => {
    if (handleClick()) {
      onClose();
    }
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
    >
      <DialogTitle>
        { title}
      </DialogTitle>
      <DialogContent>
        { children }
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClick}>
          { validateButton }
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogEntry.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  validateButton: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default DialogEntry;
