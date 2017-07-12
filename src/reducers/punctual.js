const {
  UPDATE_PUNCTUAL,
} = require('../actions/action-types.js');

function punctual(state = [], action) {
  switch (action.type) {
    case UPDATE_PUNCTUAL:
      return Object.keys(action.punctualEntries).map(key =>
        Object.assign({}, action.punctualEntries[key], { key })
      );
    default:
      return state;
  }
}

module.exports = punctual;
