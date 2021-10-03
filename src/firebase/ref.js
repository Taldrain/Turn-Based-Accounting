import { collection, doc } from 'firebase/firestore';

const RECURRENTS = 'recurrents';
const PUNCTUALS = 'punctuals';
const SETTINGS = 'settings';

function checkDoc(ref, id = null) {
  if (id === null) {
    return ref;
  }

  return doc(ref, id);
}

function accessCollection(ref, col, id) {
  return checkDoc(collection(ref, col), id);
}

//
// Ref
//
function recurrentRef(ref, entryId) {
  return accessCollection(ref, RECURRENTS, entryId);
}

function punctualRef(ref, entryId) {
  return accessCollection(ref, PUNCTUALS, entryId);
}

function settingRef(ref, userId) {
  return accessCollection(ref, SETTINGS, userId);
}

export {
  recurrentRef,
  punctualRef,
  settingRef,
};
