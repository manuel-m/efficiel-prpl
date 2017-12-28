import S from 's-js';
import * as Surplus from 'surplus';

var go = S.data('home');

export { go, routerView };

function routerView(defaultRoute_, routes_) {
    go(defaultRoute_);
    return <div>{routes_[go()]}</div>;
}
