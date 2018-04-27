import { UPDATE_RECURRENT } from '../actions/types';

function recurrent(state = [], action) {
  switch (action.type) {
    case UPDATE_RECURRENT:
      return Object.keys(action.recurrentEntries).map(key =>
        Object.assign({}, action.recurrentEntries[key], { key }));
    default:
      return state;
  }
}

export default recurrent;
