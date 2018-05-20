import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import TextDisplay from '../display/text';

class DialogEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.onClose = this.onClose.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillUnmount() {
    this.umounted = true;
  }

  onClose() {
    if (this.umounted !== true) {
      this.props.onClose();
      this.setState({ open: false });
    }
  }

  onOpen() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
    this.setState({ open: true });
  }

  handleClick() {
    this.props.onValidate(this.state)
      .then(() => this.onClose());
  }

  render() {
    return (
      <div>
        <IconButton color={this.props.iconColor} onClick={this.onOpen}>
          { this.props.icon }
        </IconButton>
        <Dialog open={this.state.open} onClose={this.onClose}>
          <DialogTitle>
            <TextDisplay value={this.props.title} />
          </DialogTitle>
          <DialogContent>
            { this.props.children }
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.onClose}>
              <TextDisplay value="utils.Cancel" />
            </Button>
            <Button color="primary" onClick={this.handleClick}>
              <TextDisplay value={this.props.validateButton} />
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DialogEntry.propTypes = {
  onValidate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  validateButton: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  children: PropTypes.element.isRequired,
  onOpen: PropTypes.func,
};

DialogEntry.defaultProps = {
  onOpen: undefined,
  iconColor: undefined,
};

export default DialogEntry;
