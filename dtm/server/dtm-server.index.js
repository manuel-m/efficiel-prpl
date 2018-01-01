var fs = require('fs');

import cssCtrl from './css.ctrl';
import confCtrl from './conf.ctrl';
import server from '../../fa-server/fa-server.index';

server({
    api: {
        filter: req_ => req_.url.indexOf('/build') === 0
    },
    conf: Object.assign(
        {
            port: 8000,
            root: './build',
            encoding: 'utf-8'
        },
        JSON.parse(fs.readFileSync('./dtm.json', 'utf8'))
    ),
    controllers: { cssCtrl, confCtrl }
});
