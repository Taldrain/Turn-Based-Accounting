import { initializeApp } from 'firebase/app';
import { getPerformance } from 'firebase/performance';

const config = require('./config.json');

const firebaseApp = initializeApp(config);
getPerformance(firebaseApp);

export default firebaseApp;
