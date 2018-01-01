import { loadScript } from './script';
import { routerView } from './router';

function main(in_) {
    var _static = document.getElementById(in_.mountId),
        _routerView = routerView(
            in_.defaultRoute,
            in_.onHashChange,
            in_.routes
        );

    window.requestAnimationFrame(function() {
        _static.parentNode.replaceChild(_routerView, _static);
        _static = undefined;

        loadScript(in_.addonsScript);
    });
}

export { main };
