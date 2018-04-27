import React from 'react';
import PropTypes from 'prop-types';

import PunctualForm from './form';

class PunctualDialogWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.entry;

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleNewValue = this.handleNewValue.bind(this);
    this.onValidate = this.onValidate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.entry);
  }

  onOpen() {
    this.setState({ date: new Date(this.context.router.globals.params.date) });
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
      <PunctualForm
        onNewValue={this.handleNewValue}
        name={this.state.name}
        amount={this.state.amount}
        balance={this.state.balance}
      />
    );

    return React.cloneElement(this.props.children, {
      onValidate: this.onValidate,
      onOpen: this.onOpen,
      onClose: this.onClose,
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

export default PunctualDialogWrapper;
