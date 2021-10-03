import {
  getAuth,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';

import firebaseApp from './index';

let currentUser;
let isSignedIn = false;

const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, (user) => {
  if (user) {
    isSignedIn = true;
    currentUser = user;
  } else {
    isSignedIn = false;
    currentUser = undefined;
  }
});

function isLoggedIn() {
  if (!auth.currentUser) {
    return isSignedIn;
  }

  return auth.currentUser;
}

function requiresAuth() {
  return !isLoggedIn();
}

function getCurrentUser() {
  return currentUser;
}

function googleLogin() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

function signOutUser() {
  return signOut(auth);
}

export {
  auth,
  requiresAuth,
  getCurrentUser,
  isLoggedIn,
  googleLogin,
  signOutUser as signOut,
};
