var surplus = require('../PR/rollup-plugin-surplus/index'), // [!] Pull request in course
    eslint = require('rollup-plugin-eslint'),
    resolve = require('rollup-plugin-node-resolve'),
    uglify = require('rollup-plugin-uglify');

export default {
    input: './front.main.index.js',
    output: {
        name: 'app',
        format: 'iife',
        file: '../dist/front.main.bundle.js'
    },
    plugins: [
        eslint(),
        surplus(),
        resolve({ extensions: ['.js', '.jsx'] }),
        uglify(
            process.env.NODE_ENV === 'production'
                ? undefined
                : {
                      compress: {
                          sequences: true,
                          properties: true,
                          dead_code: true,
                          drop_debugger: true,
                          unsafe: false,
                          conditionals: true,
                          comparisons: true,
                          evaluate: false, // [!] disable asm.js if true
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
                  }
        )
    ]
};
