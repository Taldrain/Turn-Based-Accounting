import { UPDATE_LOCALE } from '../actions/types';
import { DEFAULT_LOCALE } from '../utils/l10n';

function updateLocale(state = DEFAULT_LOCALE, action) {
  switch (action.type) {
    case UPDATE_LOCALE:
      return action.locale || state;
    default:
      return state;
  }
}

export default updateLocale;
