import {
  UPDATE_LIST_RECURRENTS,
} from '../actions/type';

function updateRecurrents(state = [], action) {
  switch (action.type) {
    case UPDATE_LIST_RECURRENTS:
      return action.recurrents;
    default:
      return state;
  }
}

export default updateRecurrents;
