import S from 's-js';
import * as Surplus from 'surplus';

import { loadScript } from './script';
import { routerView } from './router';

function App(in_) {
    var __context = {
            S: S,
            Surplus: Surplus,
            model: {},
            routes: in_.routes,
            vm: {}
        },
        _static = document.getElementById(in_.mountId),
        _routerView;

    Object.assign(__context.model, in_.model(__context));
    Object.assign(__context.vm, in_.vm(__context));

    _routerView = routerView({
        context: __context,
        onHashChange: in_.onHashChange,
        defaultRoute: in_.defaultRoute
    });

    window.requestAnimationFrame(function() {
        _static.parentNode.replaceChild(_routerView, _static);
        _static = undefined;

        loadScript(in_.addonsScript);
    });

    return __context;
}

export { App };
