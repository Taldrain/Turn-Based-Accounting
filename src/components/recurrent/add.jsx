import React from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '../entries/index';
import Form from './form';

import { pushRecurrentEntry } from '../../firebase/firestore';
import { createEntry } from '../../utils/entry';

const DEFAULT_STATE = {
  name: '',
  amount: 0,
  isPositive: false,
  type: 'month',
  startDate: '',
  endDate: '',
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
    const {
      name,
      amount,
      isPositive,
      type,
      startDate,
      endDate,
    } = this.props;

    pushRecurrentEntry(createEntry({
      name,
      amount,
      isPositive,
      type,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
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
      type,
      startDate,
      endDate,
    } = this.state;

    return (
      <Dialog
        {...this.props}
        title="Add a new recurrent entry"
        validateButton="Add"
        onClose={this.handleClose}
        handleClick={this.handleAdd}
      >
        <Form
          onNewValue={this.onNewValue}
          name={name}
          amount={amount}
          isPositive={isPositive}
          type={type}
          startDate={startDate}
          endDate={endDate}
        />
      </Dialog>
    );
  }
}

Add.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Add;
