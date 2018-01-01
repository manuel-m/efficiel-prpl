function addons(in_) {
    var _shared = shared();
    Object.assign(_shared.context.routes, in_.routes);
}

function shared() {
    /* eslint-disable no-undef */
    return app;
    /* eslint-enable no-undef */
}

export { addons, shared };
