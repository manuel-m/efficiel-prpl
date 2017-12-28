var surplus = require('../PR/rollup-plugin-surplus/index'), // [!] Pull request in course
    eslint = require('rollup-plugin-eslint'),
    resolve = require('rollup-plugin-node-resolve'),
    uglify = require('rollup-plugin-uglify');

export default [
    {
        input: './critical/index.js',
        output: {
            name: 'app',
            format: 'iife',
            file: '../build/critical.min.js'
        },
        plugins: tasks()
    },
    {
        input: './app/main/index.js',
        output: {
            name: 'app',
            format: 'iife',
            file: '../dist/main.min.js'
        },
        plugins: tasks()
    },
    {
        input: './app/addons/index.js',
        output: {
            format: 'iife',
            file: '../dist/addons.min.js'
        },
        plugins: tasks()
    }
];

// [!] don't share plugins instances
function tasks() {
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
