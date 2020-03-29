import React from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '../entries/index';
import Form from './form';

import { pushPunctualEntry } from '../../firebase/firestore';
import { createEntry } from '../../utils/entry';

const DEFAULT_STATE = {
  name: '',
  amount: '',
  isPositive: false,
  errors: {},
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
    const errors = {};
    const amountFloat = parseFloat(amount, 10);

    if (Number.isNaN(amountFloat)) {
      errors.amount = 'Incorrect amount';
    }
    if (name.length === 0) {
      errors.name = 'Incorrect name';
    }

    this.setState({ errors });

    if (Object.keys(errors).length > 0) {
      return false;
    }

    pushPunctualEntry(createEntry({
      name,
      amount: amountFloat,
      isPositive,
      date,
    }));
    this.setState(DEFAULT_STATE);

    return true;
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
      errors,
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
          errors={errors}
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
