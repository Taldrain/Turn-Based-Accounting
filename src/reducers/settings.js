import {
  UPDATE_SETTINGS,
  UPDATE_CURRENCY,
} from '../actions/type';

const DEFAULT_SETTINGS = {
  locale: 'fr-FR',
  currency: 'EUR',
};

function updateSettings(state = DEFAULT_SETTINGS, action) {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return ({ ...state, ...action.settings });
    case UPDATE_CURRENCY:
      return ({ ...state, currency: action.currency });
    default:
      return state;
  }
}

export default updateSettings;
