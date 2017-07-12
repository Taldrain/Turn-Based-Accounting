const {
  UPDATE_LOCALE,
} = require('../actions/action-types.js');

const {
  DEFAULT_LOCALE,
} = require('../utils/l10n.js');

function updateLocale(state = DEFAULT_LOCALE, action) {
  switch (action.type) {
    case UPDATE_LOCALE:
      return action.locale || state;
    default:
      return state;
  }
}

module.exports = updateLocale;
