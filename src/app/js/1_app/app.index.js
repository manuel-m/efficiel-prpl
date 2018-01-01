import { App } from '../../../../m-front/app';

import home from './views/home/home.jsx';

var app = App({
    addonsScript: 'js/app.addons.js',
    defaultRoute: 'home',
    model: function(context_) {
        return {};
    },
    mountId: 'app',
    routes: {
        home: home
    },
    onHashChange: onHashChange,
    vm: function(context_) {
        return { clic: 0, message: context_.S.data('Click me') };
    }
});

function onHashChange(context_, e_) {
    var _hash = (e_ === undefined ? document.location.href : e_.newURL).split(
        '#'
    )[1];

    if (_hash in context_.routes === false) {
        console.log('route not ready:' + _hash);
        return 'home';
    }

    return _hash === '' ||
        _hash === undefined ||
        _hash in context_.routes === false
        ? 'home'
        : _hash;
}

export default app;
