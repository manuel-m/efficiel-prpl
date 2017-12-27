import S from 's-js';
import * as Surplus from 'surplus';

var go = S.data('home');

export { go, routerView };

function routerView(routes_) {
    return <div>{routes_[go()]}</div>;
}
