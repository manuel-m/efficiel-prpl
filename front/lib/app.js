import addonsLauncher from './addonsLauncher';
import { routerView } from './router';

function main(in_) {
    var _static = document.getElementById(in_.mountId),
        _routerView = routerView({
            defaultRoute: in_.defaultRoute,
            routes: in_.routes
        });

    window.requestAnimationFrame(function() {
        _static.parentNode.replaceChild(_routerView, _static);
        _static = undefined;
        setTimeout(addonsLauncher);
    });
}

function addons(in_) {
    var _shared = shared();
    Object.assign(_shared.routes, in_.routes);
}

function shared() {
    /* eslint-disable no-undef */
    return app;
    /* eslint-enable no-undef */
}

export { main, addons, shared };
