import S from 's-js';
import * as Surplus from 'surplus';

import { main } from '../../../../m-front/main';
// import onClickNav from '../../../../m-front/onClickNav';

import home from './views/home/home.jsx';

var context = {
    S: S,
    Surplus: Surplus,
    model: {},
    // onClickNav: onClickNav,
    routes: {
        home: home
    },
    vm: { clic: 0, message: S.data('Click me') }
};

main({
    addonsScript: 'js/app.addons.js',
    context: context,
    defaultRoute: 'home',
    mountId: 'app',
    onHashChange: _onHashChange
});

function _onHashChange(e_) {
    var _hash = (e_ === undefined ? document.location.href : e_.newURL).split(
        '#'
    )[1];

    if (_hash in context.routes === false) {
        console.log('route not ready:' + _hash);
        return 'home';
    }

    return _hash === '' ||
        _hash === undefined ||
        _hash in context.routes === false
        ? 'home'
        : _hash;
}

export { context };
