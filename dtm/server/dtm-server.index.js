var fs = require('fs');

import cssCtrl from './controllers/css.ctrl';
import confCtrl from './controllers/conf.ctrl';
import staticHtmlCtrl from './controllers/static_html.ctrl';
import server from 'et-es/m-server/m-server.index';

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
    controllers: { cssCtrl, confCtrl, staticHtmlCtrl }
});
