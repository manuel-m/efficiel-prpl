var http = require('http');

import RouterStatic from './router.static';
import RouterApi from './router.api';

export default function(in_) {
    var _api = RouterApi(in_.conf, in_.controllers),
        _static = RouterStatic(in_.conf);

    http.createServer(_server_response).listen(in_.conf.port);

    function _server_response(request, response) {
        (in_.api.filter(request) ? _api : _static).request(request, response);
    }
    console.log('listen :' + in_.conf.port);
}
