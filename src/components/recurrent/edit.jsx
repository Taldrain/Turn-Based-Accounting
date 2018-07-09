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
    };

    this.onNewValue = this.onNewValue.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  onNewValue(type, value) {
    this.setState({ [type]: value });
  }

  handleEdit() {
    updateRecurrentEntry(this.props.entry.id, editEntry({
      name: this.state.name,
      amount: this.state.amount,
      isPositive: this.state.isPositive,
      type: this.state.type,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    }));
  }

  render() {
    return (
      <Dialog
        {...this.props}
        title="Edit a recurrent entry"
        validateButton="Edit"
        handleClick={this.handleEdit}
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
