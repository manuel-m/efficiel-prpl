export { routerView };

function routerView(in_) {
    var Surplus = in_.context.Surplus,
        go = in_.context.S.data(in_.defaultRoute);

    if (document.location.hash !== '') {
        // [!] to remove
        setTimeout(function() {
            go(in_.onHashChange());
        }, 300);
    }

    window.addEventListener('hashchange', function(e_) {
        go(in_.onHashChange(e_));
    });

    return <div>{in_.context.routes[go()]}</div>;
}
