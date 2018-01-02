var fs = require('fs');

import { wrapResponse } from '../../../m-server/helpers';
import { conf } from '../../../m-server/shared';

export default {
    POST: {
        '/build/static_html': POST_build_static_html
    }
};

function POST_build_static_html(static_html_) {
    fs.writeFileSync(conf.root + '/app.html', static_html_, function(err_) {
        if (err_) {
            return console.log(err_);
        }
    });
    return wrapResponse('');
}
