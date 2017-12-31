import S from 's-js';
import * as Surplus from 'surplus';

import { main } from '../../../../fa-front/main';

import home from './views/home/home.jsx';

var model = {},
    vm = { clic: 0, route: '/', message: S.data('Click me') },
    routes = { home: home(Surplus, { model: model, vm: vm }) };

main({
    addonsScript: 'js/app.addons.js',
    mountId: 'app',
    onHashChange: _onHashChange,
    routes: routes
});

function _onHashChange(oldUrl_, newUrl_) {
    var _hash = newUrl_.split('#')[1];

    return _hash === undefined || _hash === '' ? 'home' : _hash;
}

export { S, Surplus, model, routes, vm }; // [!] for addons part
