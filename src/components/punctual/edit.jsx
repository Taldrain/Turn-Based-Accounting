import React from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '../entries/index';
import Form from './form';

import { updatePunctualEntry } from '../../firebase/firestore';
import { editEntry } from '../../utils/entry';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.entry.name,
      amount: props.entry.amount,
      isPositive: props.entry.isPositive,
    };

    this.onNewValue = this.onNewValue.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  onNewValue(type, value) {
    this.setState({ [type]: value });
  }

  handleEdit() {
    updatePunctualEntry(this.props.entry.id, editEntry({
      name: this.state.name,
      amount: this.state.amount,
      isPositive: this.state.isPositive,
    }));
  }

  render() {
    return (
      <Dialog
        {...this.props}
        title="Edit a punctual entry"
        validateButton="Edit"
        handleClick={this.handleEdit}
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

Edit.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    amount: PropTypes.number,
    isPositive: PropTypes.bool,
  }).isRequired,
};

export default Edit;
