import { loadScript } from './script';
import { routerView } from './router';

function main(in_) {
    var _static = document.getElementById(in_.mountId),
        _routerView = routerView({
            context: in_.context,
            onHashChange: in_.onHashChange,
            defaultRoute: in_.defaultRoute
        });

    window.requestAnimationFrame(function() {
        _static.parentNode.replaceChild(_routerView, _static);
        _static = undefined;

        loadScript(in_.addonsScript);
    });
}

export { main };
