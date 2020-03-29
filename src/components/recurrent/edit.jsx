import React from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '../entries/index';
import Form from './form';

import { updateRecurrentEntry } from '../../firebase/firestore';
import { editEntry } from '../../utils/entry';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.entry.name,
      amount: props.entry.amount,
      isPositive: props.entry.isPositive,
      type: props.entry.type,
      startDate: props.entry.startDate,
      endDate: props.entry.endDate,
      errors: {},
    };

    this.onNewValue = this.onNewValue.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  onNewValue(type, value) {
    this.setState({ [type]: value });
  }

  handleEdit() {
    const {
      name,
      amount,
      isPositive,
      type,
      startDate,
      endDate,
    } = this.state;
    const { entry } = this.props;
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

    updateRecurrentEntry(entry.id, editEntry({
      name,
      amount,
      isPositive,
      type,
      startDate,
      endDate,
    }));

    return true;
  }

  render() {
    const {
      name,
      amount,
      isPositive,
      type,
      startDate,
      endDate,
      errors,
    } = this.state;

    return (
      <Dialog
        {...this.props}
        title="Edit a recurrent entry"
        validateButton="Edit"
        handleClick={this.handleEdit}
      >
        <Form
          onNewValue={this.onNewValue}
          name={name}
          amount={amount}
          isPositive={isPositive}
          type={type}
          startDate={startDate}
          endDate={endDate}
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
    type: PropTypes.oneOf(['day', 'week', 'month', 'year']),
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }).isRequired,
};

export default Edit;
