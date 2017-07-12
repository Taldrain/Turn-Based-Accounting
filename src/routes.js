const Root = require('./root/index.jsx');
const Login = require('./login/index.jsx');
const App = require('./app/index.jsx');
const Bilan = require('./bilan/index.jsx');
const Global = require('./global/index.jsx');
const Settings = require('./settings/index.jsx');
const About = require('./about/index.jsx');

const Hooks = require('./utils/hooks.js');

const DB = require('./firebase/database.js');

const states = [];

// send back user where it came from (ie: after a login)
function returnTo(trans) {
  let from = trans.redirectedFrom();
  if (from != null) {
    while (from.redirectedFrom()) {
      from = from.redirectedFrom();
    }

    const obj = { state: from.to(), params: from.params('to') };
    return obj;
  }

  const fromState = trans.from();
  const fromParams = trans.params('from');

  if (fromState.name !== '') {
    return { state: fromState, params: fromParams };
  }

  return { state: 'app' };
}


states.push(
  { name: 'root', url: '/', redirectTo: 'app', component: Root },
);

states.push(
  {
    parent: 'root',
    name: 'login',
    url: 'login',
    component: Login,
    resolve: [{
      token: 'returnTo',
      deps: ['$transition$'],
      resolveFn: returnTo,
    }],
  },
);

states.push(
  {
    parent: 'root',
    name: 'app',
    redirectTo: 'bilan',
    component: App,
    data: {
      requiresAuth: true,
    },
    resolve: [{
      token: 'settings',
      resolveFn: () => DB.fetchSettings(),
    }],
  },
);

states.push(
  {
    parent: 'app',
    name: 'bilan',
    url: 'bilan/:date',
    params: {
      date: {
        type: 'date',
        value: new Date(),
        squash: true,
      },
    },
    component: Bilan,
    resolve: [{
      token: 'date',
      deps: ['$transition$'],
      resolveFn: trans => trans.params().date,
    }],
  },
);

states.push(
  {
    parent: 'app',
    name: 'global',
    url: 'global',
    component: Global,
    resolve: [{
      token: 'recurrent',
      deps: ['$transition$'],
      resolveFn: () => DB.fetchReccurrent(),
    }, {
      token: 'punctual',
      deps: ['$transition$'],
      resolveFn: () => DB.fetchPunctual(),
    }],
  },
);

states.push(
  {
    parent: 'app',
    name: 'settings',
    url: 'settings',
    component: Settings,
  },
);

states.push(
  {
    parent: 'app',
    name: 'about',
    url: 'about',
    component: About,
  },
);

module.exports = {
  getConfig: ((router) => {
    router.urlRouter.otherwise('/');
    Hooks.forEach((hook) => {
      const hookObj = hook();
      router.transitionService[hookObj.event](
        hookObj.criteria,
        hookObj.callback,
        hookObj.priority,
      );
    });
  }),

  getStates: (() =>
    states
  ),
};
