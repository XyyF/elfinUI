module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        allowImportExportEverywhere: false,
    },
    plugins: ['@elfin-fe/eslint-plugin-elfin'],
    extends: ['plugin:vue/strongly-recommended', 'eslint:recommended'],
    // 预定义一些全局变量
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true,
    },
    // 全局变量
    // true 表示可以修改
    // false 表示不可以修改
    globals: {
        Vue: true,
    },
    // add your custom rules here
    rules: {
        // 使用 mapMutations/mapActions/mapGetters/mapState 时，使用 vx 前缀
        '@elfin-fe/elfin/vx-prefix': 'error',
        '@elfin-fe/elfin/invalid-console': ['warn', {allow: ['error', 'warn']}],
        '@elfin-fe/elfin/comments': 'error',
        // 使用 this.$refs.xx 调用方法，此方法需要 ref 前缀
        // 'elfin/ref-prefix': 'error',
        // 允许数组最后一个元素末尾加逗号
        'comma-dangle': ['error', 'always-multiline'],
        // 允许function后不加空格
        'space-before-function-paren': ['error', {'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always'}],
        // 允许行尾加分号
        'semi': ['error', 'never'],
        // 注释后面要加空格，块级注释前后必须都加空格
        'spaced-comment': ['error', 'always', {block: {balanced: true}}],
        // 最多连续空两行，文件结尾最多连续空1行
        'no-multiple-empty-lines': ['error', {max: 2, maxBOF: 1}],
        // 允许一个var定义多个变量
        'one-var': ['error', 'never'],
        // 花括号前后不加空格
        'object-curly-spacing': ['error', 'never'],
        // 尽量驼峰命名 henry
        'camelcase': ['error', {allow: ['^.*_id'], ignoreDestructuring: true}],
        // 允许在一个表达式中连用逻辑运算符不加括号
        'no-mixed-operators': ['error'],
        // if和花括号必须写在同一行，并且要把内容写在新行里
        'brace-style': ['error', 'stroustrup', {'allowSingleLine': false}],
        // 不强制文末加空行
        'eol-last': ['error', 'never'],
        // 允许注释双斜线左边有多个空格
        'no-multi-spaces': ['error'],
        'no-console': [
            'error',
            {
                allow: ['warn', 'error', 'log', 'info'],
            },
        ],
        'vue/script-indent': ['error', 4, {'baseIndent': 1, switchCase: 1}],
        // 'eol-last': 0,
        'vue/html-indent': [
            'error',
            4,
            {
                baseIndent: 1,
            },
        ],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'never',
                },
                svg: 'always',
                math: 'always',
            },
        ],
        'vue/name-property-casing': ['error', 'kebab-case'],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'never',
            },
        ],
        'vue/component-name-in-template-casing': ['error', 'kebab-case'],
        'vue/attribute-hyphenation': ['error', 'never'],
        'vue/order-in-components': [
            'error',
            {
                order: [
                    'el',
                    'name',
                    'parent',
                    'directives',
                    'components',
                    'extends',
                    'mixins',
                    'data',
                    'props',
                    'computed',
                    'filters',
                    'methods',
                    'watch',
                    ['template', 'render'],
                    'LIFECYCLE_HOOKS',
                    'errorCaptured',
                ],
            },
        ],
        'vue/attributes-order': [
            'error',
            {
                order: [
                    'CONDITIONALS',
                    'LIST_RENDERING',
                    'RENDER_MODIFIERS',
                    'TWO_WAY_BINDING',
                    'OTHER_DIRECTIVES',
                    'DEFINITION',
                    'GLOBAL',
                    'UNIQUE',
                    'OTHER_ATTR',
                    'EVENTS',
                    'CONTENT',
                ],
            },
        ],
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: 2,
                multiline: {
                    max: 1,
                    allowFirstLine: false,
                },
            },
        ],
        'vue/html-closing-bracket-spacing': [
            'error',
            {
                startTag: 'never',
                endTag: 'never',
                selfClosingTag: 'never',
            },
        ],
        'vue/no-parsing-error': [
            'error',
            {
                'invalid-first-character-of-tag-name': false,
            },
        ],
    },
    overrides: [
        {
            'files': ['*.vue'],
            'rules': {
                'indent': 'off',
            },
        },
    ],
}
