import { conf } from 'et-es/m-server/shared';
import { wrapResponse } from 'et-es/m-server/helpers';

export default {
    GET: {
        '/build/conf': () => wrapResponse(conf)
    }
};
