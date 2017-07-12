const {
  UPDATE_RECURRENT,
} = require('../actions/action-types.js');

function recurrent(state = [], action) {
  switch (action.type) {
    case UPDATE_RECURRENT:
      return Object.keys(action.recurrentEntries).map(key =>
        Object.assign({}, action.recurrentEntries[key], { key })
      );
    default:
      return state;
  }
}

module.exports = recurrent;
