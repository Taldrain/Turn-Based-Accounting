let firebaseWrap;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const Config = require('./config.json');

  // eslint-disable-next-line
  firebaseWrap = require('firebase/app')
  // eslint-disable-next-line
  require('firebase/auth')
  // eslint-disable-next-line
  require('firebase/firestore')

  firebaseWrap.initializeApp(Config);
} else {
  firebaseWrap = window.firebase;
}

const firebase = firebaseWrap;

export default firebase;
