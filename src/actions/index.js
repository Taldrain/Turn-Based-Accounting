const {
  UPDATE_LOCALE,
  UPDATE_PUNCTUAL,
  UPDATE_RECURRENT,
  UPDATE_DATE_TYPE,
  UPDATE_CURRENCY,
} = require('./action-types.js');


function makeActionCreator(type, ...argNames) {
  return (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
      return undefined;
    });

    return action;
  };
}

module.exports = {
  updateLocale: makeActionCreator(UPDATE_LOCALE, 'locale'),
  updatePunctual: makeActionCreator(UPDATE_PUNCTUAL, 'punctualEntries'),
  updateRecurrent: makeActionCreator(UPDATE_RECURRENT, 'recurrentEntries'),
  updateDateType: makeActionCreator(UPDATE_DATE_TYPE, 'dateType'),
  updateCurrency: makeActionCreator(UPDATE_CURRENCY, 'currency'),
};
