var fs = require('fs-extra'),
    child_process = require('child_process'),
    build_dir = 'build',
    dist_dir = 'dist';

check_folders();

build_automation();
build_assets();
build_js();
build_admin_index();
build_dev_index();
build_tool_used_css_index();
build_dev_used_css_index();

function check_folders() {
    fs.ensureDirSync(build_dir);
    fs.ensureDirSync(dist_dir);
}

function build_admin_index() {
    fs.copySync('dtm/index.html', build_dir + '/index.html');
}

function build_assets() {
    var _source = 'src/app/assets/css',
        _dest = build_dir + '/assets/css';
    fs.ensureDirSync(_dest);

    fconcat(
        [_source + '/bootstrap.css', _source + '/app.css'],
        _dest + '/style.css'
    );
}

function build_automation() {
    fcopyDir('src/app/automations', build_dir + '/automations');
}

function build_dev_index() {
    fmultiSubstitutions({
        input: 'index.html',
        output: build_dir + '/dev.index.html',
        substitutions: [
            {
                before: '<!-- @script -->',
                after: '<script src="js/app.critical.js"></script>'
            },
            {
                before: '<!-- @css -->',
                after: '<link href="assets/css/style.css" rel="stylesheet">'
            }
        ]
    });
}

function build_js() {
    shell('./node_modules/.bin/rollup -c --environment build:production');
}

function build_tool_used_css_index() {
    fmultiSubstitutions({
        input: 'index.html',
        output: build_dir + '/tool.used_css.index.html',
        substitutions: [
            {
                before: '<!-- @script -->',
                after:
                    '<script src="js/app.critical.js"></script>' +
                    '<script src="js/tool.used_css.js"></script>'
            },
            {
                before: '<!-- @css -->',
                after: '<link href="assets/css/style.css" rel="stylesheet">'
            }
        ]
    });
}

function build_dev_used_css_index() {
    fmultiSubstitutions({
        input: 'index.html',
        output: build_dir + '/dev.used_css.index.html',
        substitutions: [
            {
                before: '<!-- @script -->',
                after: '<script src="js/app.critical.js"></script>'
            },
            {
                before: '<!-- @css -->',
                after: '<link href="assets/css/used.css" rel="stylesheet">'
            }
        ]
    });
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

function fmultiSubstitutions(in_) {
    var _text = fread(in_.input);

    in_.substitutions.forEach(function(v_) {
        _text = _text.replace(v_.before, v_.after);
    });

    fwrite(in_.output, _text);
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
