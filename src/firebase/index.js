import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/performance';

const config = require('./config.json');

firebase.initializeApp(config);
firebase.performance();

export default firebase;
