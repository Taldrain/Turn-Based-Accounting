import firebase from './index';

import { getCurrentUser } from './auth';

import { recurrentRef, punctualRef, settingRef } from './ref';

const DB = firebase.firestore();

function saveDocumentKey(doc, key) {
  return ({ ...doc.data(), [key]: doc.id });
}

function snapshotToArray(querySnapshot, key) {
  return querySnapshot.docs.map(doc => saveDocumentKey(doc, key));
}

//
// Listen
//
function listenAllRecurrentEntries(callback, uid) {
  return recurrentRef(DB).where('authorId', '==', uid)
    .onSnapshot(querySnapshot => callback(snapshotToArray(querySnapshot, 'id')));
}

function listenPunctualEntries(callback, startDate, endDate, uid) {
  return punctualRef(DB)
    .where('date', '>=', startDate)
    .where('date', '<=', endDate)
    .where('authorId', '==', uid)
    .onSnapshot(querySnapshot => callback(snapshotToArray(querySnapshot, 'id')));
}

function listenSettings(callback) {
  return settingRef(DB, getCurrentUser().uid).onSnapshot(doc => callback(doc.data()));
}

//
// Fetch
//
function fetchSettings() {
  return settingRef(DB, getCurrentUser().uid).get().then(doc => doc.data());
}

//
// Push
//
function pushPunctualEntry(entry) {
  return punctualRef(DB).add(entry);
}

function pushRecurrentEntry(entry) {
  return recurrentRef(DB).add(entry);
}

function pushSettingsCurrency(currency) {
  return settingRef(DB, getCurrentUser().uid).set({ currency }, { merge: true });
}

//
// Update
//
function updatePunctualEntry(entryId, entry) {
  return punctualRef(DB, entryId).update(entry);
}

function updateRecurrentEntry(entryId, entry) {
  return recurrentRef(DB, entryId).update(entry);
}

//
// Delete
//
function deletePunctualEntry(entryId) {
  return punctualRef(DB, entryId).delete();
}

function deleteRecurrentEntry(entryId) {
  return recurrentRef(DB, entryId).delete();
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
