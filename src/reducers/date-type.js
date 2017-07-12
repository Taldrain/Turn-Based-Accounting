const {
  UPDATE_DATE_TYPE,
} = require('../actions/action-types.js');

function dateType(state = 'day', action) {
  switch (action.type) {
    case UPDATE_DATE_TYPE:
      return action.dateType;
    default:
      return state;
  }
}

module.exports = dateType;
