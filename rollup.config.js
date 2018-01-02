import { minify } from 'uglify-es';

var surplus = require('./PR/rollup-plugin-surplus/index'), // [!] Pull request in course
    eslint = require('rollup-plugin-eslint'),
    resolve = require('rollup-plugin-node-resolve'),
    uglify = require('rollup-plugin-uglify'),
    _outputDir = './build/js';

export default [
    APP_CRITICAL_JS(),
    APP_MAIN_JS(),
    APP_ADDONS_JS(),
    DTM_SERVER_JS(),
    DTM_USED_CSS_JS(),
    DTM_CRITICAL_CSS_JS()
];

function APP_CRITICAL_JS() {
    return {
        input: './src/app/js/0_critical/critical.index.js',
        output: {
            name: 'app',
            format: 'iife',
            file: _outputDir + '/app.critical.js'
        },
        plugins: front_tasks()
    };
}

function APP_ADDONS_JS() {
    return {
        input: './src/app/js/2_addons/addons.index.js',
        output: {
            format: 'iife',
            file: _outputDir + '/app.addons.js'
        },
        plugins: front_tasks()
    };
}

function APP_MAIN_JS() {
    return {
        input: './src/app/js/1_app/app.index.js',
        output: {
            name: 'app',
            format: 'iife',
            file: _outputDir + '/app.js'
        },
        plugins: front_tasks()
    };
}

function DTM_SERVER_JS() {
    return {
        input: './dtm/server/dtm-server.index.js',
        output: {
            file: _outputDir + '/dtm-server.js',
            format: 'cjs',
            name: 'devserver'
        },
        plugins: [
            eslint(),
            uglify(
                {
                    compress: {
                        sequences: true,
                        properties: true,
                        dead_code: true,
                        drop_debugger: false,
                        unsafe: false,
                        conditionals: true,
                        comparisons: true,
                        evaluate: true, // [!] disable asm.js if true
                        booleans: true,
                        loops: true,
                        unused: true,
                        hoist_funs: true,
                        hoist_vars: true,
                        if_return: true,
                        join_vars: true,
                        side_effects: false,
                        warnings: true
                    },
                    mangle: false,
                    output: {
                        beautify: true
                    }
                },
                minify // [!] uglify-es
            )
        ]
    };
}

function DTM_USED_CSS_JS() {
    return {
        input: './dtm/front/used_css/js/used_css.index.js',
        output: {
            name: 'used_css',
            format: 'iife',
            file: _outputDir + '/tool.used_css.js'
        },
        plugins: front_tasks()
    };
}

function DTM_CRITICAL_CSS_JS() {
    return {
        input: './dtm/front/critical_css/js/critical_css.index.js',
        output: {
            name: 'used_css',
            format: 'iife',
            file: _outputDir + '/tool.critical_css.js'
        },
        plugins: front_tasks()
    };
}

// [!] don't share plugins instances
function front_tasks() {
    var _tasks = [
        eslint(),
        surplus(),
        resolve({ extensions: ['.js', '.jsx'] })
    ];
    if (process.env.build === 'production') {
        _tasks.push(uglify());
    }
    return _tasks;
}
