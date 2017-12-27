import S from 's-js';
import * as Surplus from 'surplus';
import routes from '../routes';

var go = S.data('home'),
    routerView = (function() {
        return <div>{routes[go()]}</div>;
    })();

export { go, routerView };
