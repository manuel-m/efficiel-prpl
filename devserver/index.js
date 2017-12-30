import cssCtrl from './app/css.ctrl';

import server from './lib/index';

server({
    api: {
        filter: function(req_) {
            return req_.url.indexOf('/build') === 0;
        }
    },
    conf: {
        port:
            process.argv.indexOf('-p') >= 0
                ? process.argv[process.argv.indexOf('-p') + 1]
                : 8000,
        dir_dist: './build',
        encoding: 'utf-8'
    },
    controllers: { cssCtrl }
});
