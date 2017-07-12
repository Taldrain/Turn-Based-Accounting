import React from 'react';
import PropTypes from 'prop-types';

class FontAwesomeIcon extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <i className={`fa fa-${this.props.name}`} />
    );
  }
}

FontAwesomeIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

module.exports = FontAwesomeIcon;
