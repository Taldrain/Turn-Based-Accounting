import {
  UPDATE_LOCALE,
  UPDATE_PUNCTUAL,
  UPDATE_RECURRENT,
  UPDATE_DATE_TYPE,
  UPDATE_CURRENCY,
} from './types';


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

export const updateLocale = makeActionCreator(UPDATE_LOCALE, 'locale');
export const updatePunctual = makeActionCreator(UPDATE_PUNCTUAL, 'punctualEntries');
export const updateRecurrent = makeActionCreator(UPDATE_RECURRENT, 'recurrentEntries');
export const updateDateType = makeActionCreator(UPDATE_DATE_TYPE, 'dateType');
export const updateCurrency = makeActionCreator(UPDATE_CURRENCY, 'currency');
