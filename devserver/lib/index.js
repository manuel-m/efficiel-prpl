var http = require('http');

import { conf, controllers } from './shared';

import assets from './assets';
import rest from './rest';

var _api_conf;

export default function(in_) {
    Object.assign(conf, in_.conf);
    Object.assign(controllers, in_.controllers);

    _api_conf = in_.api;

    rest.init();
    assets.init();

    http.createServer(_server_response).listen(conf.port);
    console.log('listen :' + conf.port);
}

function _server_response(request, response) {
    (_api_conf.filter(request) ? rest : assets).request(request, response);
}
