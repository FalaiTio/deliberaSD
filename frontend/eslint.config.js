module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        // 'plugin:prettier/recommended',  // Descomente se usar Prettier
        // '@vue/typescript/recommended'  // Descomente se precisar de mais regras TS/Vue
    ],
    plugins: [
        'vue',
        '@typescript-eslint',
        // 'prettier'  // Descomente se usar Prettier
    ],
    rules: {
        'generator-star-spacing': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

        'vue/component-tags-order': 'off',
    },
    // Se precisar especificar arquivos (substituindo 'extensions'), use 'overrides' em vez disso
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.vue'],  // Linta apenas esses (substitui 'extensions')
            rules: {
                // Regras específicas para TS/Vue aqui
            },
        },
    ],
};