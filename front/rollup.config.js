var surplus = require('../PR/rollup-plugin-surplus/index'), // [!] Pull request in course
    eslint = require('rollup-plugin-eslint'),
    resolve = require('rollup-plugin-node-resolve'),
    uglify = require('rollup-plugin-uglify'),
    _tasks = [eslint(), surplus(), resolve({ extensions: ['.js', '.jsx'] })];

if (process.env.NODE_ENV === 'production') {
    _tasks.push(uglify());
}

export default {
    input: './front.main.index.js',
    output: {
        name: 'app',
        format: 'iife',
        file: '../dist/front.main.bundle.js'
    },
    plugins: _tasks
};
