import {
  UPDATE_LIST_RECURRENTS,
  UPDATE_COMPUTED_LIST_RECURRENTS,
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

export const updateListRecurrents = makeActionCreator(UPDATE_LIST_RECURRENTS, 'recurrents');
export const updateComputedListRecurrents = makeActionCreator(UPDATE_COMPUTED_LIST_RECURRENTS, 'recurrents');
