import S from 's-js';
import * as Surplus from 'surplus';

var go = S.data();

export { routerView };

function routerView(defaultRoute, onHashChange, routes) {
    window.addEventListener('hashchange', function(e_) {
        go(onHashChange(e_.oldURL, e_.oldURL));
    });

    if (document.location.hash === '') {
        document.location.hash = defaultRoute;
    } else {
        go(onHashChange(undefined, document.location.href));
    }

    return <div>{routes[go()]}</div>;
}
