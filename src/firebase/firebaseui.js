import firebase from './index';

function getConfig() {
  return ({
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // avoid redirects after sign-in
      signInSuccessWithAuthResult: () => false,
    },
  });
}

export default getConfig;
