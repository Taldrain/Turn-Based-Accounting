import React from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '../entries/index';
import Form from './form';

import { pushPunctualEntry } from '../../firebase/firestore';
import { createEntry } from '../../utils/entry';

const DEFAULT_STATE = {
  name: '',
  amount: 0,
  isPositive: false,
};

class Add extends React.Component {
  constructor() {
    super();

    this.state = DEFAULT_STATE;

    this.onNewValue = this.onNewValue.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  onNewValue(type, value) {
    this.setState({ [type]: value });
  }

  handleAdd() {
    const { name, amount, isPositive } = this.state;
    const { date } = this.props;

    pushPunctualEntry(createEntry({
      name,
      amount,
      isPositive,
      date,
    }));
    this.setState(DEFAULT_STATE);
  }

  handleClose() {
    const { onClose } = this.props;
    onClose();
    this.setState(DEFAULT_STATE);
  }

  render() {
    const {
      name,
      amount,
      isPositive,
    } = this.state;

    return (
      <Dialog
        {...this.props}
        title="Add a new punctual entry"
        validateButton="Add"
        onClose={this.handleClose}
        handleClick={this.handleAdd}
      >
        <Form
          onNewValue={this.onNewValue}
          name={name}
          amount={amount}
          isPositive={isPositive}
        />
      </Dialog>
    );
  }
}

Add.propTypes = {
  date: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Add;
