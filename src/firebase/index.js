if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const firebase = require('firebase');

  // eslint-disable-next-line
  const Config = require('Config');

  firebase.initializeApp(Config.firebase.config);

  module.exports = firebase;
} else {
  module.exports = window.firebase;
}
