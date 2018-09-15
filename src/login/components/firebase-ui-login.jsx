import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import firebase from '../../firebase/index';
import getConfig from '../../firebase/firebaseui';

function FirebaseUILogin() {
  return (
    <StyledFirebaseAuth uiConfig={getConfig()} firebaseAuth={firebase.auth()} />
  );
}

export default FirebaseUILogin;
