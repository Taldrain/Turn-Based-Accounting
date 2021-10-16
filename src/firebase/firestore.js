import {
  getFirestore,
  query,
  where,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';

import firebaseApp from './index';
import { getCurrentUser } from './auth';
import { recurrentRef, punctualRef, settingRef } from './ref';

const db = getFirestore(firebaseApp);

function saveDocumentKey(doc, key = 'id') {
  return ({ ...doc.data(), [key]: doc.id });
}

function snapshotToArray(querySnapshot, key) {
  return querySnapshot.docs.map(doc => saveDocumentKey(doc, key));
}

async function fetchDoc(docRef) {
  return saveDocumentKey(await getDoc(docRef));
}

//
// Listen
//
function listenAllRecurrentEntries(callback, uid) {
  return onSnapshot(
    query(recurrentRef(db), where('authorId', '==', uid)),
    querySnapshot => callback(snapshotToArray(querySnapshot)),
  );
}

function listenPunctualEntries(callback, startDate, endDate, uid) {
  return onSnapshot(
    query(punctualRef(db), where('date', '>=', startDate), where('date', '<=', endDate), where('authorId', '==', uid)),
    querySnapshot => callback(snapshotToArray(querySnapshot)),
  );
}

function listenSettings(callback) {
  return onSnapshot(
    settingRef(db, getCurrentUser().uid),
    doc => callback(saveDocumentKey(doc)),
  );
}

//
// Fetch
//
function fetchSettings() {
  return fetchDoc(settingRef(db, getCurrentUser().uid));
}

//
// Push
//
function pushPunctualEntry(entry) {
  return addDoc(punctualRef(db), entry);
}

function pushRecurrentEntry(entry) {
  return addDoc(recurrentRef(db), entry);
}

function pushSettingsCurrency(currency) {
  return setDoc(settingRef(db, getCurrentUser().uid), { currency }, { merge: true });
}

//
// Update
//
function updatePunctualEntry(entryId, entry) {
  return updateDoc(punctualRef(db, entryId), entry);
}

function updateRecurrentEntry(entryId, entry) {
  return updateDoc(recurrentRef(db, entryId), entry);
}

//
// Delete
//
function deletePunctualEntry(entryId) {
  return deleteDoc(punctualRef(db, entryId));
}

function deleteRecurrentEntry(entryId) {
  return deleteDoc(recurrentRef(db, entryId));
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
