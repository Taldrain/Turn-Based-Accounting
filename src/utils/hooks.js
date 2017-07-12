const Auth = require('../firebase/auth.js');

function authHook() {
  return ({
    event: 'onBefore',
    criteria: {
      to: state => state.data && state.data.requiresAuth,
    },
    callback: (transition) => {
      const state = transition.router.stateService;
      if (Auth.requiresAuth()) {
        return state.target('login', undefined, { location: false });
      }

      return undefined;
    },
  });
}

module.exports = [
  authHook,
];
