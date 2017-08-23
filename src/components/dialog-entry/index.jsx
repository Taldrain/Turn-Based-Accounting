import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

const TextDisplay = require('../display/text.jsx');

class DialogEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleRequestOpen = this.handleRequestOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillUnmount() {
    this.umounted = true;
  }

  handleRequestClose() {
    if (this.umounted !== true) {
      this.props.onRequestClose();
      this.setState({ open: false });
    }
  }

  handleRequestOpen(ev) {
    ev.stopPropagation();
    if (this.props.onRequestOpen) {
      this.props.onRequestOpen();
    }
    this.setState({ open: true });
  }

  handleClick() {
    this.props.onValidate(this.state)
      .then(() => this.handleRequestClose());
  }

  render() {
    return (
      <div>
        <IconButton color={this.props.iconColor} onClick={this.handleRequestOpen}>
          { this.props.icon }
        </IconButton>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>
            <TextDisplay value={this.props.title} />
          </DialogTitle>
          <DialogContent>
            { this.props.children }
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleRequestClose}>
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
  onRequestClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  validateButton: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  children: PropTypes.element.isRequired,
  onRequestOpen: PropTypes.func,
};

DialogEntry.defaultProps = {
  onRequestOpen: undefined,
  iconColor: undefined,
};

module.exports = DialogEntry;
