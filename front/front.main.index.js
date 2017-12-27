import model from './model';
import routes from './routes';
import vm from './views/vm';

var _static = document.getElementById('app'),
    _dynamic = routes.home();

window.requestAnimationFrame(function() {
    _static.parentNode.replaceChild(_dynamic, _static);
    _static = undefined;
});

export { model, routes, vm };
