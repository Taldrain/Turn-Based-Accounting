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
  }

  onNewValue(type, value) {
    this.setState({ [type]: value });
  }

  handleAdd() {
    pushPunctualEntry(createEntry({
      name: this.state.name,
      amount: this.state.amount,
      isPositive: this.state.isPositive,
      date: this.props.date,
    }));
    this.setState(DEFAULT_STATE);
  }

  render() {
    return (
      <Dialog
        {...this.props}
        title="Add a new punctual entry"
        validateButton="Add"
        handleClick={this.handleAdd}
      >
        <Form
          onNewValue={this.onNewValue}
          name={this.state.name}
          amount={this.state.amount}
          isPositive={this.state.isPositive}
        />
      </Dialog>
    );
  }
}

Add.propTypes = {
  date: PropTypes.string.isRequired,
};

export default Add;
