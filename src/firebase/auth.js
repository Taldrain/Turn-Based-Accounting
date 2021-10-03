import firebase from './index';

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
  const { current } = firebase.auth();
  if (!current) {
    return isSignedIn;
  }

  return current;
}

function requiresAuth() {
  return !isLoggedIn();
}

function getCurrentUser() {
  return currentUser;
}

function googleLogin() {
  return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
}

function signOut() {
  return firebase.auth().signOut();
}

export {
  requiresAuth,
  getCurrentUser,
  isLoggedIn,
  googleLogin,
  signOut,
};
