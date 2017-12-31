import S from 's-js';
import * as Surplus from 'surplus';

import { main } from '../../../../fa-front/main';
import { go } from '../../../../fa-front/router';

import home from './views/home/home.jsx';

var model = {},
    vm = { clic: 0, route: '/', message: S.data('Click me') },
    routes = { home: home(Surplus, { go: go, model: model, vm: vm }) };

main({
    addonsScript: 'js/app.addons.js',
    defaultRoute: 'home',
    mountId: 'app',
    routes: routes
});

export { S, Surplus, go, model, routes, vm }; // [!] for addons part
