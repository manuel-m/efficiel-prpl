import S from 's-js';
import * as Surplus from 'surplus';

var go;

export { routerView };

function routerView(defaultRoute, onHashChange_, routes) {
    go = S.data(defaultRoute);

    if (document.location.hash !== '') {
        // [!] to remove
        setTimeout(function() {
            go(onHashChange_());
        }, 300);
    }

    window.addEventListener('hashchange', function(e_) {
        go(onHashChange_(e_));
    });

    return <div>{routes[go()]}</div>;
}
