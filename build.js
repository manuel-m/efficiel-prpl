var fs = require('fs-extra'),
    child_process = require('child_process'),
    _dist_dir = 'dist';

[
    function INSURE_DIST() {
        fs.ensureDirSync(_dist_dir);
    },
    function FRONT_BUILD() {
        _subshell('cd front && rollup -c --environment build:production');
    },
    function PROCESS_INDEX_HTML() {
        // fs.copySync('index.html', _dist_dir + '/index.html');
        var _index_html = fs.readFileSync('index.html').toString(),
            _critical_js = fs.readFileSync('build/critical.min.js').toString();

        fs.writeFileSync(
            _dist_dir + '/index.html',
            _index_html.replace('/*@critical*/', _critical_js),
            function(err_) {
                if (err_) {
                    return console.log(err_);
                }
            }
        );
    }
].forEach(function(task_) {
    task_();
});

function _subshell(cmd_) {
    child_process.execSync(cmd_, { stdio: 'inherit' });
}
