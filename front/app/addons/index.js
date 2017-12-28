import { addons, shared } from '../../lib';

import profile from './views/profile/profile';

var _app = shared(),
    addonsRoutes = {
        profile: profile(_app.Surplus, {
            go: _app.go,
            model: _app.model,
            vm: _app.vm
        })
    };

addons({ routes: addonsRoutes });
