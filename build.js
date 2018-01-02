var fs = require('fs-extra'),
    child_process = require('child_process'),
    build_dir = 'build';

check_folders();

build_automation();
build_assets();
build_js();
build_admin_index();
build_dev_index();
build_tool_used_css_index();
build_dev_used_css_index();
build_tool_critical_css_index();
build_tool_static_html_index();
build_dev_critical_css_index();
dist_index();

function check_folders() {
    fs.ensureDirSync(build_dir);
}

function build_admin_index() {
    fs.copySync('dtm/dtm.index.html', build_dir + '/index.html');
}

function build_assets() {
    var _source = 'src/app/assets/css',
        _dest = build_dir + '/assets/css';
    fs.ensureDirSync(_dest);

    // dtm admin
    fs.copySync(_source + '/bootstrap.css', _dest + '/bootstrap.css');

    // app
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

function build_tool_critical_css_index() {
    fmultiSubstitutions({
        input: 'index.html',
        output: build_dir + '/tool.critical_css.index.html',
        substitutions: [
            {
                before: '<!-- @script -->',
                after:
                    '<script src="js/app.critical.js"></script>' +
                    '<script src="js/tool.critical_css.js"></script>'
            },
            {
                before: '<!-- @css -->',
                after: '<link href="assets/css/used.css" rel="stylesheet">'
            }
        ]
    });
}

function build_dev_critical_css_index() {
    fmultiSubstitutions({
        input: 'index.html',
        output: build_dir + '/dev.critical_css.index.html',
        substitutions: [
            {
                before: '<!-- @script -->',
                after: '<script src="js/app.critical.js"></script>'
            },
            {
                before: '<!-- @css -->',
                after: '<link href="assets/css/critical.css" rel="stylesheet">'
            }
        ]
    });
}

function build_tool_static_html_index() {
    fmultiSubstitutions({
        input: 'index.html',
        output: build_dir + '/tool.static_html.index.html',
        substitutions: [
            {
                before: '<!-- @script -->',
                after:
                    '<script src="js/app.critical.js"></script>' +
                    '<script src="js/tool.static_html.js"></script>'
            },
            {
                before: '<!-- @css -->',
                after: '<link href="assets/css/used.css" rel="stylesheet">'
            }
        ]
    });
}

function dist_index() {
    var _critical_js = build_dir + '/js/app.critical.js',
        _critical_css = build_dir + '/assets/css/critical.css',
        _static_html = build_dir + '/app.html';

    if (fs.existsSync(_critical_js) === false) return;
    if (fs.existsSync(_critical_css) === false) return;
    if (fs.existsSync(_static_html) === false) return;

    fmultiSubstitutions({
        input: 'index.html',
        output: build_dir + '/dist.index.html',
        substitutions: [
            {
                before: '<div id="app" />',
                after: '<div id="app">' + fread(_static_html) + '</div>'
            },
            {
                before: '<!-- @script -->',
                after: '<script>' + fread(_critical_js) + '</script>'
            },
            {
                before: '<!-- @css -->',
                after:
                    '<style>' +
                    fread(_critical_css) +
                    '</style>' +
                    '<link href="assets/css/not_critical.css" rel="stylesheet">'
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
