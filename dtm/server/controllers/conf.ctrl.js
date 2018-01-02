import { conf } from '../../../m-server/shared';
import { wrapResponse } from '../../../m-server/helpers';

export default {
    GET: {
        '/build/conf': () => wrapResponse(conf)
    }
};
