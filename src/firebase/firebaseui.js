import firebase from './index';

function getConfig() {
  return ({
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  });
}

export default getConfig;
