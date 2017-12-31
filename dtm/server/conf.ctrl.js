import { conf } from '../../fa-server/shared';
import { wrapResponse } from '../../fa-server/helpers';

export default {
    GET: {
        '/build/conf': () => wrapResponse(conf)
    }
};
