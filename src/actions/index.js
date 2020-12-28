import {
  UPDATE_SETTINGS,
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
export const updateCurrency = makeActionCreator(UPDATE_CURRENCY, 'currency');
