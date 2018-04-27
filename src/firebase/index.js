let firebaseWrap;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  const Config = require('./config.json');

  // eslint-disable-next-line global-require
  firebaseWrap = require('firebase');

  firebaseWrap.initializeApp(Config);
} else {
  firebaseWrap = window.firebase;
}

const firebase = firebaseWrap;

export default firebase;
