import { S, Surplus } from './vendors';

var go = S.data();

export { go, routerView };

function routerView(in_) {
    go(in_.defaultRoute);
    return <div>{in_.routes[go()]}</div>;
}
