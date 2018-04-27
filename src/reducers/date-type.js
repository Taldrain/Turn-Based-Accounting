import { UPDATE_DATE_TYPE } from '../actions/types';

function dateType(state = 'day', action) {
  switch (action.type) {
    case UPDATE_DATE_TYPE:
      return action.dateType;
    default:
      return state;
  }
}

export default dateType;
