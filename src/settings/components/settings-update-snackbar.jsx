import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import { listenSettings } from '../../firebase/firestore';

class SettingsUpdateSnackBar extends React.Component {
  constructor() {
    super();

    this.state = {
      firstEvent: true,
      open: false,
      key: undefined,
    };

    this.queue = [];

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleExited = this.handleExited.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = listenSettings(() => this.handleOpen());
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleOpen() {
    const { firstEvent, open } = this.state;

    if (firstEvent) {
      // skip first event
      this.setState({ firstEvent: false });
      return;
    }

    this.queue.push(new Date().getTime());
    if (open) {
      // close current snackbar to start a new one
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  }

  handleClose(ev, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  }

  handleExited() {
    this.processQueue();
  }

  processQueue() {
    if (this.queue.length > 0) {
      this.setState({ key: this.queue.shift(), open: true });
    }
  }

  render() {
    const { key, open } = this.state;
    return (
      <Snackbar
        key={key}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={1500}
        onClose={this.handleClose}
        onExited={this.handleExited}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<div id="message-id">Settings updated</div>}
      />
    );
  }
}

export default SettingsUpdateSnackBar;
