import eslint from 'rollup-plugin-eslint';
import { minify } from 'uglify-es';
import uglify from 'rollup-plugin-uglify';

export default {
    input: './index.js',
    output: {
        file: '../build/devserver.min.js',
        format: 'cjs',
        name: 'efficiel-dev-server'
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
