import { addons, shared } from '../../../../fa-front/addons';
import profile from './views/profile/profile';

var _app = shared(),
    addonsRoutes = {
        profile: profile(_app.Surplus, _app.context)
    };

addons({ routes: addonsRoutes });
