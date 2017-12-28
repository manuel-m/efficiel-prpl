var fs = require('fs'),
    path = require('path'),
    url = require('url');

export default function(conf_) {
    var _dir = conf_.dir_dist,
        _encoding = conf_.encoding;

    return { request: _on_router_static_request };

    function _on_router_static_request(request, response) {
        var _url = url.parse(request.url, true).pathname,
            filePath = _dir + (_url === '/' ? '/index.html' : _url),
            extname = String(path.extname(filePath)).toLowerCase(),
            mimeTypes = {
                '.html': 'text/html',
                '.js': 'text/javascript',
                '.css': 'text/css',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpg',
                '.gif': 'image/gif',
                '.wav': 'audio/wav',
                '.mp4': 'video/mp4',
                '.woff': 'application/font-woff',
                '.ttf': 'application/font-ttf',
                '.eot': 'application/vnd.ms-fontobject',
                '.otf': 'application/font-otf',
                '.svg': 'image/svg+xml'
            },
            contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, function(error, content) {
            if (error) {
                if (error.code == 'ENOENT') {
                    response.writeHead(404, {
                        'Content-Type': 'text/html'
                    });
                    response.end(
                        '<h1>router.static.js - 404 not found</h1><br/><h3>' +
                            request.url +
                            '</h3>',
                        _encoding
                    );
                } else {
                    response.writeHead(500, {
                        'Content-Type': 'text/html'
                    });
                    response.end(
                        '<h1>Sorry, check with the site admin for error: ' +
                            error.code +
                            '</h1><br/><h3>' +
                            request.url +
                            '</h3>',
                        _encoding
                    );
                }
            } else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, _encoding);
            }
        });
    }
}
