import { UPDATE_CURRENCY } from '../actions/types';

function currency(state = '€', action) {
  switch (action.type) {
    case UPDATE_CURRENCY:
      return action.currency || state;
    default:
      return state;
  }
}

export default currency;
