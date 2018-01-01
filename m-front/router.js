export { routerView };

function routerView(in_) {
    var Surplus = in_.context.Surplus,
        _route = in_.defaultRoute,
        _routes = {},
        go = in_.context.S.data(_route);

    // default route
    if (document.location.hash === '') {
        _routes[_route] = in_.context.routes[_route](Surplus, in_.context);
    } else {
        setTimeout(function() {
            // [!] need to wait for additionnal route to be ready
            _route = in_.onHashChange(in_.context);
            _routes[_route] = in_.context.routes[_route](Surplus, in_.context);
            go(_route);
        }, 300);
    }

    window.addEventListener('hashchange', function(e_) {
        _route = in_.onHashChange(in_.context, e_);

        // [!] create view on need
        if (_route in _routes === false) {
            _routes[_route] = in_.context.routes[_route](Surplus, in_.context);
        }

        go(in_.onHashChange(in_.context, e_));
    });

    return <div>{_routes[go()]}</div>;
}
