var fs = require('fs-extra'),
    child_process = require('child_process'),
    _build_dir = 'build',
    _dist_dir = 'dist';

[
    function INSURE_DIST() {
        fs.ensureDirSync(_dist_dir);
    },
    function FRONT_BUILD() {
        shell('cd front && rollup -c --environment build:production');
    },
    function PROCESS_INDEX_HTML() {
        var _critical_js = fread(_build_dir + '/critical.min.js'),
            _index_html = fread('index.html');

        fwrite(
            _dist_dir + '/index.html',
            _index_html.replace('/*@script*/', _critical_js)
        );
    }
].forEach(function(task_) {
    task_();
});

function fread(path_) {
    return fs.readFileSync(path_).toString();
}

function fwrite(path_, string_) {
    fs.writeFileSync(path_, string_, function(err_) {
        if (err_) {
            return console.log(err_);
        }
    });
}

function shell(cmd_) {
    child_process.execSync(cmd_, { stdio: 'inherit' });
}
