import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const i18n = require('../../utils/i18n.js');

function mapStateToProps(state) {
  return ({
    locale: state.locale,
  });
}

class TextDisplay extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };

    this.componentMounted = false;
  }

  componentDidMount() {
    this.componentMounted = true;
    this.translateValue(this.props.value, this.props.locale);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value || nextProps.locale !== this.props.locale) {
      this.translateValue(nextProps.value, nextProps.locale);
    }
  }

  componentWillUnmount() {
    this.componentMounted = false;
  }

  translateValue(value, locale) {
    i18n.translate(value, locale)
      .then((res) => {
        if (this.componentMounted) {
          this.setState({ value: res });
        }
      });
  }

  render() {
    return (
      <span>
        { this.state.value }
      </span>
    );
  }
}

TextDisplay.propTypes = {
  value: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

module.exports = connect(mapStateToProps)(TextDisplay);
