const {
  UPDATE_CURRENCY,
} = require('../actions/action-types.js');

function currency(state = '€', action) {
  switch (action.type) {
    case UPDATE_CURRENCY:
      return action.currency || state;
    default:
      return state;
  }
}

module.exports = currency;
