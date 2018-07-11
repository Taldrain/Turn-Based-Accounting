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
  type: 'day',
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
    console.log('add: ', this.state);
    pushRecurrentEntry(createEntry({
      name: this.state.name,
      amount: this.state.amount,
      isPositive: this.state.isPositive,
      type: this.state.type,
      startDate: this.state.startDate || undefined,
      endDate: this.state.endDate || undefined,
    }));
    this.setState(DEFAULT_STATE);
  }

  handleClose() {
    this.props.onClose();
    this.setState(DEFAULT_STATE);
  }

  render() {
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
          name={this.state.name}
          amount={this.state.amount}
          isPositive={this.state.isPositive}
          type={this.state.type}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
        />
      </Dialog>
    );
  }
}

Add.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Add;
