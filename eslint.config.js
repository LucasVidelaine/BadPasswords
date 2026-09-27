import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                document: 'readonly',
                navigator: 'readonly',
                setTimeout: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': 'warn',
            eqeqeq: ['error', 'smart'],
        },
    },
];
