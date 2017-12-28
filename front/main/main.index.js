import { S, main, go } from '../lib';

import home from './views/home/home.jsx';

var model = {},
    vm = { clic: 0, route: '/', message: S.data('Click me') },
    routes = { home: home({ model: model, vm: vm }) };

main({ defaultRoute: 'home', mountId: 'app', routes: routes });

export { go, model, routes, vm };
