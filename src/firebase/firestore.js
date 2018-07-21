import firebase from './index';

import { getCurrentUser } from './auth';

const DB = firebase.firestore();
DB.settings({
  timestampsInSnapshots: true,
});

const RECURRENTS_COLLECTION = 'recurrents';
const PUNCTUALS_COLLECTION = 'punctuals';
const SETTINGS_COLLECTION = 'settings';

function saveDocumentKey(doc, key) {
  return Object.assign({}, doc.data(), { [key]: doc.id });
}

function snapshotToArray(querySnapshot, key) {
  const result = [];
  querySnapshot.forEach(doc => result.push(saveDocumentKey(doc, key)));
  return result;
}

//
// Listen
//
function listenAllRecurrentEntries(callback, uid) {
  return DB
    .collection(RECURRENTS_COLLECTION)
    .where('authorId', '==', uid)
    .onSnapshot(querySnapshot => callback(snapshotToArray(querySnapshot, 'id')));
}

function listenPunctualEntries(callback, startDate, endDate, uid) {
  return DB
    .collection(PUNCTUALS_COLLECTION)
    .where('date', '>=', startDate)
    .where('date', '<=', endDate)
    .where('authorId', '==', uid)
    .onSnapshot(querySnapshot => callback(snapshotToArray(querySnapshot, 'id')));
}

function listenSettings(callback) {
  return DB
    .collection(SETTINGS_COLLECTION)
    .doc(getCurrentUser().uid)
    .onSnapshot(doc => callback(doc.data()));
}

//
// Fetch
//
function fetchSettings() {
  return DB
    .collection(SETTINGS_COLLECTION)
    .doc(getCurrentUser().uid)
    .get()
    .then(doc => doc.data());
}

//
// Push
//
function pushPunctualEntry(entry) {
  return DB
    .collection(PUNCTUALS_COLLECTION)
    .add(entry);
}

function pushRecurrentEntry(entry) {
  return DB
    .collection(RECURRENTS_COLLECTION)
    .add(entry);
}

function pushSettingsCurrency(currency) {
  return DB
    .collection(SETTINGS_COLLECTION)
    .doc(getCurrentUser().uid)
    .set({ currency });
}

//
// Update
//
function updatePunctualEntry(entryId, entry) {
  return DB
    .collection(PUNCTUALS_COLLECTION)
    .doc(entryId)
    .update(entry);
}

function updateRecurrentEntry(entryId, entry) {
  return DB
    .collection(RECURRENTS_COLLECTION)
    .doc(entryId)
    .update(entry);
}

//
// Delete
//
function deletePunctualEntry(entryId) {
  return DB
    .collection(PUNCTUALS_COLLECTION)
    .doc(entryId)
    .delete();
}

function deleteRecurrentEntry(entryId) {
  return DB
    .collection(RECURRENTS_COLLECTION)
    .doc(entryId)
    .delete();
}

export {
  listenAllRecurrentEntries,
  listenPunctualEntries,
  listenSettings,

  fetchSettings,

  pushPunctualEntry,
  pushRecurrentEntry,
  pushSettingsCurrency,

  updatePunctualEntry,
  updateRecurrentEntry,

  deletePunctualEntry,
  deleteRecurrentEntry,
};
