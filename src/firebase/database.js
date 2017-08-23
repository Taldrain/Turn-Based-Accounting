const firebase = require('./index.js');
const Auth = require('./auth.js');
const DateUtils = require('../utils/date.js');

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
  const userId = Auth.userId();
  return `/punctual/${userId}/`;
}

function getRecurrentPath() {
  const userId = Auth.userId();
  return `/recurrent/${userId}/`;
}

function getSettingsPath() {
  const userId = Auth.userId();
  return `/settings/${userId}/`;
}

function updateSettings(type, data) {
  return firebaseRef(getSettingsPath()).child(type).set(data);
}

module.exports = {
  //
  // Refs
  //
  getPunctualRef(date, type) {
    const { startDate, endDate } = DateUtils.formatDate(date, type);

    return firebaseRef(getPunctualPath())
      .orderByChild('date')
      .startAt(startDate.getTime())
      .endAt(endDate.getTime());
  },

  getRecurrentRef() {
    return firebaseRef(getRecurrentPath());
  },

  //
  // Add
  //
  addPunctual(data) {
    const entry = {
      date: data.date.getTime(),
      name: data.name,
      amount: parseFloat(data.amount, 10) * (data.balance === 'positif' ? 1 : -1),
      addedAt: Date.now(),
    };

    return firebaseRef(getPunctualPath()).push().set(entry);
  },

  addRecurrent(data) {
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
  },

  //
  // Update
  //
  updateLocale(locale) {
    return updateSettings('locale', locale);
  },

  updateCurrency(locale) {
    return updateSettings('currency', locale);
  },

  //
  // Fetch
  //
  fetchReccurrent() {
    return firebaseFetch(firebaseRef(getRecurrentPath()));
  },

  fetchPunctual() {
    return firebaseFetch(firebaseRef(getPunctualPath()));
  },

  fetchSettings() {
    return firebaseFetch(firebaseRef(getSettingsPath()));
  },

  //
  // Remove
  //
  deletePunctual(key) {
    return firebaseRef(getPunctualPath()).child(key).remove();
  },

  deleteRecurrent(key) {
    return firebaseRef(getRecurrentPath()).child(key).remove();
  },


  //
  // Edit
  //
  editPunctual(key, data) {
    const entry = {
      name: data.name,
      amount: parseFloat(data.amount, 10) * (data.balance === 'positif' ? 1 : -1),
      lastEdit: Date.now(),
    };

    return firebaseRef(getPunctualPath(data.date)).child(key).update(entry);
  },

  editRecurrent(key, data) {
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
  },
};
