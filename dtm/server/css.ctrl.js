var fs = require('fs');

import { clone } from '../../fa/utils';
import { wrapResponse } from '../../fa-server/helpers';

import { conf } from '../../fa-server/shared';

var css = {
    critical: [],
    not_used: [],
    used: []
};

export default {
    PUT: {
        '/build/css': PUT_build_css
    }
};

function PUT_build_css(data_) {
    Object.keys(css).forEach(function(k_) {
        var _s;
        if (k_ in data_) {
            css[k_] = clone(data_[k_]);

            fs.writeFileSync(
                conf.root + '/' + conf.css.directory + '/' + k_ + '.css',
                css[k_].map(css_ => css_.cssText).join('\n'),
                function(err_) {
                    if (err_) {
                        return console.log(err_);
                    }
                }
            );
        }
    });

    return wrapResponse(css);
}
