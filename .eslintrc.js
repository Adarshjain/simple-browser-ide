const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions:{
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    extends: [
        'plugin:vue/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@chargebee/recommended'
    ],
    rules: {
        indent:'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-parameter-properties':'off',
        camelcase: 'off',
        '@typescript-eslint/camelcase': ['error', { 'properties': 'never' }],
        '@typescript-eslint/explicit-member-accessibility': ['warn', { accessibility: 'off'}],
        '@typescript-eslint/no-this-alias': 'off',
        'vue/attributes-order': 'off',
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: 5,
                multiline: {
                    max: 5,
                    allowFirstLine: true
                }
            }
        ],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always'
                }
            }
        ],
        'no-console': PRODUCTION ? 'error' : 'off',
        'no-debugger': PRODUCTION ? 'error' : 'off',
        'vue/require-component-is': 'off',
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
        // needs to be fixed at all cost
        'vue/require-prop-types': 'off'
    }
}