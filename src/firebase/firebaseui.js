import firebase from './index';

function getConfig() {
  return ({
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    credentialHelper: 'none',
    callbacks: {
      // avoid redirects after sign-in
      signInSuccessWithAuthResult: () => false,
    },
  });
}

export default getConfig;
