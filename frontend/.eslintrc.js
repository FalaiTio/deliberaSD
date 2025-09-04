module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020
    },
    env: {
        browser: true,
    },
    extends: [
        'plugin:vue/base',
        // 'eslint:recommended',
        // 'plugin:vue/vue3-recommended',
        // 'plugin:vue/essential',
        // 'plugin:@typescript-eslint/recommended',
        // 'plugin:prettier/recommended',
        // 'eslint-config-prettier'
    ],
    plugins: [
        'vue'
    ],
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
}