module.exports = {
    'root': true,
    'env': {
        'es6': true,
        'node': true,
        'mocha': true
    },
    'extends': [
        'eslint:recommended'
    ],
    'plugins': [
        'mocha'
    ],
    'rules': {
        'curly': [
            'error'
        ],
        'dot-notation': [
            'error'
        ],
        'eqeqeq': [
            'error',
            'smart' // allow 
            // Comparing two literal values
            // Evaluating the value of typeof
            // Comparing against null to also catch undefined case
        ],
        'strict': [
            'warn'
        ],
        'indent': [
            'error',
            2
        ],
        'eol-last': [
            'error',
            'always'
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'no-unused-expressions': [
            'error'
        ],
        'no-unused-vars': [
            'error',
            {
                'argsIgnorePattern': 'next'
            }
        ],
        'no-trailing-spaces': [
            'error'
        ],
        'quotes': [
            'warn',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-console': [
            'warn'
        ],
        'mocha/no-exclusive-tests': 'error',
        'mocha/no-skipped-tests': 'warn'
    }
};
