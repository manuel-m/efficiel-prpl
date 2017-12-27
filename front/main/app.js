import addonsLauncher from './addonsLauncher';
import { routerView } from './router';

export default function(mountId_) {
    var _static = document.getElementById('app');

    window.requestAnimationFrame(function() {
        _static.parentNode.replaceChild(routerView, _static);
        _static = undefined;
        setTimeout(addonsLauncher);
    });
}
