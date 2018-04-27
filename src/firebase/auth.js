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

function userId() {
  if (currentUser) {
    return currentUser.uid;
  }

  return undefined;
}

function onAuthStateChanged(callback) {
  return firebase.auth().onAuthStateChanged(callback);
}

function signOut() {
  return firebase.auth().signOut();
}

export {
  requiresAuth,
  userId,
  onAuthStateChanged,
  signOut,
};
