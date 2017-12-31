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
    GET: {
        '/build/css': GET_build_css,
        '/build/css/used': GET_build_css_used,
        '/build/css/not_used': GET_build_css_not_used
    },
    PUT: {
        '/build/css': PUT_build_css
    }
};

function GET_build_css() {
    return wrapResponse(css);
}

function GET_build_css_not_used() {
    return wrapResponse(css.not_used);
}

function GET_build_css_used() {
    return wrapResponse(css.used);
}

function PUT_build_css(data_) {
    Object.keys(css).forEach(function(k_) {
        var _s;
        if (k_ in data_) {
            css[k_] = clone(data_[k_]);

            fs.writeFileSync(
                conf.dir_dist + '/assets/css/' + k_ + '.css',
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
