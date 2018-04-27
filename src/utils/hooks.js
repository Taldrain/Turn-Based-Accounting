import { requiresAuth } from '../firebase/auth';

function authHook() {
  return ({
    event: 'onBefore',
    criteria: {
      to: state => state.data && state.data.requiresAuth,
    },
    callback: (transition) => {
      const state = transition.router.stateService;
      if (requiresAuth()) {
        return state.target('login', undefined, { location: false });
      }

      return undefined;
    },
  });
}

export default [
  authHook,
];
