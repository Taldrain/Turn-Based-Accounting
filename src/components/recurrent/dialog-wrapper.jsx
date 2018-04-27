import React from 'react';
import PropTypes from 'prop-types';

import RecurrentForm from './form';

class RecurrentDialogWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.entry;

    this.onClose = this.onClose.bind(this);
    this.handleNewValue = this.handleNewValue.bind(this);
    this.onValidate = this.onValidate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.entry);
  }

  onClose() {
    this.setState(this.props.entry);
  }

  onValidate() {
    return this.props.onValidate(this.state);
  }

  handleNewValue(type, value) {
    const obj = {};
    obj[type] = value;
    this.setState(obj);
  }

  render() {
    const child = (
      <RecurrentForm
        onNewValue={this.handleNewValue}
        name={this.state.name}
        amount={this.state.amount}
        balance={this.state.balance}
        type={this.state.type}
        startDate={this.state.startDate || ''}
        endDate={this.state.endDate || ''}
      />
    );

    return React.cloneElement(this.props.children, {
      onValidate: this.onValidate,
      onClose: this.onClose,
      children: child,
    });
  }
}

RecurrentDialogWrapper.propTypes = {
  entry: PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    balance: PropTypes.oneOf(['negatif', 'positif']).isRequired,
    type: PropTypes.oneOf(['year', 'month', 'day']).isRequired,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
  children: PropTypes.element.isRequired,
  onValidate: PropTypes.func.isRequired,
};

RecurrentDialogWrapper.defaultProps = {
  entry: undefined,
};

export default RecurrentDialogWrapper;
