import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';

const FontAwesomeIcon = require('../../components/element/font-awesome-icon.jsx');

const MobileDetect = require('mobile-detect');

const Auth = require('../../firebase/auth.js');

const isMobile = (new MobileDetect(window.navigator.userAgent).mobile() !== null);

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const provider = Auth.newProvider(this.props.provider);

    if (isMobile) {
      Auth.signInWithPopup(provider);
    } else {
      Auth.signInWithRedirect(provider);
    }
  }

  render() {
    return (
      <IconButton onClick={this.handleClick}>
        <FontAwesomeIcon name={this.props.icon} />
      </IconButton>
    );
  }
}

AuthProvider.propTypes = {
  icon: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
};

module.exports = AuthProvider;
