import React from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '../entries/index';
import Form from './form';

import { updatePunctualEntry } from '../../firebase/firestore';
import { editEntry } from '../../utils/entry';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    const { entry } = props;

    this.state = {
      name: entry.name,
      amount: entry.amount,
      isPositive: entry.isPositive,
      errors: {},
    };

    this.onNewValue = this.onNewValue.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    const { entry } = this.props;
    const { name, amount, isPositive } = this.state;
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

    updatePunctualEntry(entry.id, editEntry({
      name,
      amount: amountFloat,
      isPositive,
    }));

    return true;
  }

  onNewValue(type, value) {
    this.setState({ [type]: value });
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
        title="Edit a punctual entry"
        validateButton="Edit"
        handleClick={this.handleEdit}
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

Edit.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    amount: PropTypes.number,
    isPositive: PropTypes.bool,
  }).isRequired,
};

export default Edit;
