import {
  UPDATE_SETTINGS,
  UPDATE_LOCALE,
  UPDATE_CURRENCY,
} from './type';

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

export const updateSettings = makeActionCreator(UPDATE_SETTINGS, 'settings');
export const updateLocale = makeActionCreator(UPDATE_LOCALE, 'locale');
export const updateCurrency = makeActionCreator(UPDATE_CURRENCY, 'currency');
