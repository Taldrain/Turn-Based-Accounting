import firebase from './index';

import { userId } from './auth';
import { formatDate } from '../utils/date';

function firebaseFetch(ref) {
  return ref
    .once('value')
    .then((obj) => {
      const res = obj.val();
      if (res) {
        return res;
      }

      return undefined;
    });
}

function firebaseRef(path) {
  return firebase.database()
    .ref(path);
}

function getPunctualPath() {
  return `/punctual/${userId()}/`;
}

function getRecurrentPath() {
  return `/recurrent/${userId()}/`;
}

function getSettingsPath() {
  return `/settings/${userId()}/`;
}

function updateSettings(type, data) {
  return firebaseRef(getSettingsPath()).child(type).set(data);
}

//
// Refs
//
function getPunctualRef(date, type) {
  const { startDate, endDate } = formatDate(date, type);

  return firebaseRef(getPunctualPath())
    .orderByChild('date')
    .startAt(startDate.getTime())
    .endAt(endDate.getTime());
}

function getRecurrentRef() {
  return firebaseRef(getRecurrentPath());
}

//
// Add
//
function addPunctual(data) {
  const entry = {
    date: data.date.getTime(),
    name: data.name,
    amount: parseFloat(data.amount, 10) * (data.balance === 'positif' ? 1 : -1),
    addedAt: Date.now(),
  };

  return firebaseRef(getPunctualPath()).push().set(entry);
}

function addRecurrent(data) {
  const entry = {
    name: data.name,
    amount: parseFloat(data.amount, 10) * (data.balance === 'positif' ? 1 : -1),
    type: data.type,
    addedAt: Date.now(),
  };

  if (data.startDate) {
    entry.startDate = new Date(data.startDate).getTime();
  }

  if (data.endDate) {
    entry.endDate = new Date(data.endDate).getTime();
  }

  return firebaseRef(getRecurrentPath()).push().set(entry);
}

//
// Update
//
function updateLocale(locale) {
  return updateSettings('locale', locale);
}

function updateCurrency(locale) {
  return updateSettings('currency', locale);
}

//
// Fetch
//
function fetchReccurrent() {
  return firebaseFetch(firebaseRef(getRecurrentPath()));
}

function fetchPunctual() {
  return firebaseFetch(firebaseRef(getPunctualPath()));
}

function fetchSettings() {
  return firebaseFetch(firebaseRef(getSettingsPath()));
}

//
// Remove
//
function deletePunctual(key) {
  return firebaseRef(getPunctualPath()).child(key).remove();
}

function deleteRecurrent(key) {
  return firebaseRef(getRecurrentPath()).child(key).remove();
}


//
// Edit
//
function editPunctual(key, data) {
  const entry = {
    name: data.name,
    amount: parseFloat(data.amount, 10) * (data.balance === 'positif' ? 1 : -1),
    lastEdit: Date.now(),
  };

  return firebaseRef(getPunctualPath(data.date)).child(key).update(entry);
}

function editRecurrent(key, data) {
  const entry = {
    name: data.name,
    amount: parseFloat(data.amount, 10) * (data.balance === 'positif' ? 1 : -1),
    type: data.type,
    lastEdit: Date.now(),
  };

  if (data.startDate) {
    entry.startDate = new Date(data.startDate).getTime();
  }

  if (data.endDate) {
    entry.endDate = new Date(data.endDate).getTime();
  }

  return firebaseRef(getRecurrentPath()).child(key).update(entry);
}

export {
  getPunctualRef,
  getRecurrentRef,

  addPunctual,
  addRecurrent,

  updateLocale,
  updateCurrency,

  fetchPunctual,
  fetchReccurrent,
  fetchSettings,

  deletePunctual,
  deleteRecurrent,

  editPunctual,
  editRecurrent,
};
