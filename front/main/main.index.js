import S from 's-js';

import { main } from './app';

import { go } from './router';

import home from './views/home/home.jsx';

var model = {},
    vm = { clic: 0, route: '/', message: S.data('Click me') },
    routes = { home: home({ model: model, vm: vm }) };

main({ mountId: 'app', routes: routes });

export { go, model, routes, vm };
