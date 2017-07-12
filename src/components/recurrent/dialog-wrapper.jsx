import React from 'react';
import PropTypes from 'prop-types';

const RecurrentForm = require('./form.jsx');

class RecurrentDialogWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.entry;

    this.onRequestClose = this.onRequestClose.bind(this);
    this.handleNewValue = this.handleNewValue.bind(this);
    this.onValidate = this.onValidate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.entry);
  }

  onRequestClose() {
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
      />
    );

    return React.cloneElement(this.props.children, {
      onValidate: this.onValidate,
      onRequestClose: this.onRequestClose,
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
  }),
  children: PropTypes.element.isRequired,
  onValidate: PropTypes.func.isRequired,
};

RecurrentDialogWrapper.defaultProps = {
  entry: undefined,
};

module.exports = RecurrentDialogWrapper;
