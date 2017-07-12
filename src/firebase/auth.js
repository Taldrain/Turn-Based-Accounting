const firebase = require('./index.js');

let currentUser;
let isSignedIn = false;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    isSignedIn = true;
    currentUser = user;
  } else {
    isSignedIn = false;
    currentUser = undefined;
  }
});

function isLoggedIn() {
  const current = firebase.auth().current;
  if (!current) {
    return isSignedIn;
  }

  return current;
}

module.exports = {
  requiresAuth: (() =>
    !isLoggedIn()
  ),

  userId: () => {
    if (currentUser) {
      return currentUser.uid;
    }

    return undefined;
  },

  onAuthStateChanged: (callback =>
    firebase.auth().onAuthStateChanged(callback)
  ),

  newProvider: (provider) => {
    if (provider === 'google') {
      return new firebase.auth.GoogleAuthProvider();
    }

    return new firebase.auth.FacebookAuthProvider();
  },

  signOut: (() =>
    firebase.auth().signOut()
  ),

  signUp: ((email, password) =>
    firebase.auth().createUserWithEmailAndPassword(email, password)
  ),

  signInWithEmailAndPassword: ((email, password) =>
    firebase.auth().signInWithEmailAndPassword(email, password)
  ),

  signInWithPopup: (provider =>
    firebase.auth().signInWithPopup(provider)
  ),

  signInWithRedirect: (provider =>
    firebase.auth().signInWithRedirect(provider)
  ),
};
