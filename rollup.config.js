import { minify } from 'uglify-es';

var surplus = require('./PR/rollup-plugin-surplus/index'), // [!] Pull request in course
    eslint = require('rollup-plugin-eslint'),
    resolve = require('rollup-plugin-node-resolve'),
    uglify = require('rollup-plugin-uglify'),
    _outputDir = './build';

export default [
    {
        input: './front/critical/index.js',
        output: {
            name: 'app',
            format: 'iife',
            file: _outputDir + '/critical.min.js'
        },
        plugins: front_tasks()
    },
    {
        input: './front/app/main/index.js',
        output: {
            name: 'app',
            format: 'iife',
            file: _outputDir + '/main.min.js'
        },
        plugins: front_tasks()
    },
    {
        input: './front/app/addons/index.js',
        output: {
            format: 'iife',
            file: _outputDir + '/addons.min.js'
        },
        plugins: front_tasks()
    },
    {
        input: './devserver/index.js',
        output: {
            file: _outputDir + '/devserver.min.js',
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
    }
];

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
