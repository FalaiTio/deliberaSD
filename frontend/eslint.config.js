const vue = require('eslint-plugin-vue');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');

module.exports = [
    {
        files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.vue'],
        ignores: ['node_modules/**', 'dist/**'],
        languageOptions: {
            parser: vue.parsers['vue-eslint-parser'],
            parserOptions: {
                parser: typescriptParser,
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                browser: 'readonly',
                node: 'readonly',
            },
        },
        plugins: {
            vue,
            '@typescript-eslint': typescriptEslint,
        },
        rules: {
            ...vue.configs['vue3-recommended'].rules,
            ...typescriptEslint.configs.recommended.rules,
            'generator-star-spacing': 'off',
            'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
            'vue/component-tags-order': 'off',
        },
    },
];