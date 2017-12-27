module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    globals: {
        BUILD: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        sourceType: 'module'
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-unused-vars': 'off',
        'no-console': 'off',
        indent: 'off'
    }
};
