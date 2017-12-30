import { clone } from '../../common/lib/utils';
import { wrapResponse } from '../lib/helpers';

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
        if (k_ in data_) css[k_] = clone(data_[k_]);
    });

    return wrapResponse(css);
}
