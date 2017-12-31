import cssCtrl from './css.ctrl';

import server from '../../fa-server/index';

server({
    api: {
        filter: req_ => req_.url.indexOf('/build') === 0
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
