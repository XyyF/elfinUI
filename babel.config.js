module.exports = api => {
    const isTest = api.env('test')
    // You can use isTest to determine what presets and plugins to use.
    if (isTest) {
        return {
            'presets': [['env', {'modules': false}]],
            'env': {
                'test': {
                    'presets': [
                        ['env', {'targets': {'node': 'current'}}],
                    ],
                },
            },
            plugins: [
                'lodash',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-private-methods',
                'transform-vue-jsx',
            ],
        }
    }
    return {
        presets: [
            '@vue/app',
            ['@babel/env', {'modules': 'commonjs'}],
        ],
        plugins: [
            'lodash',
            'add-module-exports',
            '@babel/plugin-proposal-class-properties',
        ],
    }
}