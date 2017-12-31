import S from 's-js';
import * as Surplus from 'surplus';

import { main } from '../../../../fa-front/main';
import onClickNav from '../../../../fa-front/onClickNav';

import home from './views/home/home.jsx';

var model = {},
    vm = { clic: 0, route: '/', message: S.data('Click me') },
    context = { S: S, model: model, onClickNav: onClickNav, vm: vm },
    routes = {
        home: home(Surplus, context)
    };

context.routes = routes;

main({
    addonsScript: 'js/app.addons.js',
    defaultRoute: 'home',
    mountId: 'app',
    onHashChange: _onHashChange,
    routes: routes
});

function _onHashChange(oldUrl_, newUrl_) {
    var _hash = newUrl_.split('#')[1];

    return _hash === '' ? 'home' : _hash;
}

export { Surplus, context }; // [!] for addons part
