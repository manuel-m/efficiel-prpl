var fs = require('fs-extra'),
    child_process = require('child_process'),
    build_dir = 'build',
    dist_dir = 'dist';

[
    check_folders,
    build_automation,
    build_assets,
    build_js,
    build_admin_index,
    build_dev_index,
    build_used_css_index
].forEach(function(task_) {
    task_();
});

function check_folders() {
    fs.ensureDirSync(build_dir);
    fs.ensureDirSync(dist_dir);
}

function build_admin_index() {
    fs.copySync('front/tools/admin/index.html', build_dir + '/index.html');
}

function build_assets() {
    var _source = 'front/app/assets/css',
        _dest = build_dir + '/assets/css';
    fs.ensureDirSync(_dest);

    fconcat(
        [_source + '/bootstrap.css', _source + '/app.css'],
        _dest + '/style.css'
    );
}

function build_automation() {
    fcopyDir('front/app/automations', build_dir + '/automations');
}

function build_dev_index() {
    fwrite(
        build_dir + '/dev.index.html',
        fread('index.html').replace(
            '<!-- @script -->',
            '<script src="js/app.critical.js"></script>'
        )
    );
}

function build_js() {
    shell('./node_modules/.bin/rollup -c --environment build:production');
}

function build_used_css_index() {
    fwrite(
        build_dir + '/used_css.index.html',
        fread('index.html').replace(
            '<!-- @script -->',
            ['app.critical.js', 'tool.used_css.js'].reduce(function(s_, file_) {
                return s_ + '<script src="/js/' + file_ + '">' + '</script>';
            }, '')
        )
    );

    // var _critical_js = fread(_build_dir + '/js/app.critical.js'),
    //     _index_html = fread('index.html'),
    //     _play_js = fread(_build_dir + '/js/tool.used_css.js');

    // fwrite(
    //     _build_dir + '/index.html',
    //     _index_html.replace(
    //         '<!-- @script -->',
    //         [
    //             '<script>' + _critical_js + '</script>',
    //             '<script>' + _play_js + '</script>'
    //         ].join('\n')
    //     )
    // );
}
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
