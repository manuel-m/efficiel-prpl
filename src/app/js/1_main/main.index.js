import S from 's-js';
import * as Surplus from 'surplus';

import { main } from '../../../../m-front/main';
import onClickNav from '../../../../m-front/onClickNav';

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

function _onHashChange(e_) {
    var _hash = (e_ === undefined ? document.location.href : e_.newURL).split(
        '#'
    )[1];

    if (_hash in routes === false) {
        console.log('route not ready:' + _hash);
        return 'home';
    }

    return _hash === '' || _hash === undefined || _hash in routes === false
        ? 'home'
        : _hash;
}

export { Surplus, context };
