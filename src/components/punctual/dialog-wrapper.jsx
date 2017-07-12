import React from 'react';
import PropTypes from 'prop-types';

const PunctualForm = require('./form.jsx');

class PunctualDialogWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.entry;

    this.onRequestOpen = this.onRequestOpen.bind(this);
    this.onRequestClose = this.onRequestClose.bind(this);
    this.handleNewValue = this.handleNewValue.bind(this);
    this.onValidate = this.onValidate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.entry);
  }

  onRequestOpen() {
    this.setState({ date: new Date(this.context.router.globals.params.date) });
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
      <PunctualForm
        onNewValue={this.handleNewValue}
        name={this.state.name}
        amount={this.state.amount}
        balance={this.state.balance}
      />
    );

    return React.cloneElement(this.props.children, {
      onValidate: this.onValidate,
      onRequestOpen: this.onRequestOpen,
      onRequestClose: this.onRequestClose,
      children: child,
    });
  }
}


PunctualDialogWrapper.propTypes = {
  entry: PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    balance: PropTypes.oneOf(['negatif', 'positif']).isRequired,
  }),
  children: PropTypes.element.isRequired,
  onValidate: PropTypes.func.isRequired,
};

PunctualDialogWrapper.defaultProps = {
  entry: undefined,
};

PunctualDialogWrapper.contextTypes = {
  router: PropTypes.object.isRequired,
};

module.exports = PunctualDialogWrapper;
