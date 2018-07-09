import React from 'react';
import * as firebaseui from 'firebaseui';

import firebase from '../../firebase/index';
import getConfig from '../../firebase/firebaseui';

class FirebaseUILogin extends React.Component {
  componentDidMount() {
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    this.ui.start('#firebase-ui-auth-container', getConfig());
  }

  componentWillUnmount() {
    this.ui.delete();
  }

  render() {
    return (
      <div id="firebase-ui-auth-container" />
    );
  }
}

export default FirebaseUILogin;
