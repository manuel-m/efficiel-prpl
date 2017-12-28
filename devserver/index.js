import server from './lib/index';

server({
    api: {
        filter: function(request) {
            return false;
        }
    },
    conf: {
        port:
            process.argv.indexOf('-p') >= 0
                ? process.argv[process.argv.indexOf('-p') + 1]
                : 8000,
        dir_dist: './build/',
        encoding: 'utf-8'
    },
    controllers: {}
});
