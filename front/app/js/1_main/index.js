import S from 's-js';
import * as Surplus from 'surplus';

import { main } from '../../../lib/main';
import { go } from '../../../lib/router';

import home from './views/home/home.jsx';

var model = {},
    vm = { clic: 0, route: '/', message: S.data('Click me') },
    routes = { home: home(Surplus, { go: go, model: model, vm: vm }) };

main({
    addonsScript: 'js/addons.min.js',
    defaultRoute: 'home',
    mountId: 'app',
    routes: routes
});

export { S, Surplus, go, model, routes, vm }; // [!] for addons part
