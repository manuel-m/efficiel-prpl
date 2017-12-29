import { S, Surplus, main, go } from '../../../lib';

import home from './views/home/home.jsx';

var model = {},
    vm = { clic: 0, route: '/', message: S.data('Click me') },
    routes = { home: home(Surplus, { go: go, model: model, vm: vm }) };

main({
    addonsScript: 'addons.min.js',
    defaultRoute: 'home',
    mountId: 'app',
    routes: routes
});

export { S, Surplus, go, model, routes, vm }; // [!] for addons part
