var fs = require('fs-extra'),
    child_process = require('child_process'),
    _build_dir = 'build',
    _dist_dir = 'dist';

[
    function INSURE_DIST() {
        fs.ensureDirSync(_dist_dir);
    },
    function ASSETS_COPY() {
        var _source = 'front/app/assets/css',
            _dest = _build_dir + '/assets/css';
        fs.ensureDirSync(_dest);

        fconcat(
            [_source + '/bootstrap.css', _source + '/app.css'],
            _dest + '/style.css'
        );

        // fcopyDir('front/app/assets', _build_dir + '/assets');
    },
    function JS_BUILD() {
        shell('rollup -c --environment build:production');
    },
    function PROCESS_INDEX_HTML() {
        var _critical_js = fread(_build_dir + '/critical.min.js'),
            _index_html = fread('index.html');

        fwrite(
            _build_dir + '/index.html',
            _index_html.replace(
                '<!-- @script -->',
                '<script>' + _critical_js + '</script>'
            )
        );
    }
].forEach(function(task_) {
    task_();
});

function fconcat(sources_, destination_) {
    var _concat = '';
    sources_.forEach(function(source_) {
        _concat += fread(source_);
    });
    fwrite(destination_, _concat);
}

function fcopyDir(source_, destination_) {
    fs.removeSync(destination_);
    fs.copySync(source_, destination_);
}

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
