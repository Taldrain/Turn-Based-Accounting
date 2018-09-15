import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  withMobileDialog,
} from '@material-ui/core/';

class DialogEntry extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { handleClick, onClose } = this.props;
    handleClick();
    onClose();
  }

  render() {
    const {
      open,
      onClose,
      fullScreen,
      title,
      children,
      validateButton,
    } = this.props;

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
          <Button onClick={this.handleClick}>
            { validateButton }
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DialogEntry.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  validateButton: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(DialogEntry);
