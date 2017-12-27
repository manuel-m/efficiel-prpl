var fs = require('fs-extra'),
    child_process = require('child_process'),
    _dist_dir = 'dist';

[
    function INSURE_DIST() {
        fs.ensureDirSync(_dist_dir);
    },
    function COPY_INDEX_HTML() {
        fs.copySync('index.html', _dist_dir + '/index.html');
    },
    function FRONT_BUILD() {
        _subshell('cd front && cross-env NODE_ENV=production rollup -c');
    }
].forEach(function(task_) {
    task_();
});

function _subshell(cmd_) {
    child_process.execSync(cmd_, { stdio: 'inherit' });
}
