const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');

const config = require('./config.json');

firebase.initializeApp(config);

export default firebase;
