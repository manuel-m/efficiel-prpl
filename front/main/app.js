import addonsLauncher from './addonsLauncher';
import { routerView } from './router';

function main(in_) {
    var _static = document.getElementById(in_.mountId),
        _routerView = routerView(in_.defaultRoute, in_.routes);

    window.requestAnimationFrame(function() {
        _static.parentNode.replaceChild(_routerView, _static);
        _static = undefined;
        setTimeout(addonsLauncher);
    });
}

export { main };
