'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
var md = require('markdown-it')()
var striptags = require('./strip-tags')
var slugify = require('transliteration').slugify

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

var wrap = function (render) {
    return function () {
        return render.apply(this, arguments)
            .replace('<code v-pre class="', '<code class="hljs ')
            .replace('<code>', '<code class="hljs">')
    }
}

function convert (str) {
    str = str.replace(/(&#x)(\w{4});/gi, function ($0) {
        return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16))
    })
    return str
}

var babelLoader = {
    loader: 'babel-loader',
    options: {
        cacheDirectory: true,
        presets: [
            "react",
            [
                "es2015",
                {
                    "modules": false
                }
            ],
            "es2016"
        ]
    }
};

module.exports = {
    entry: {
        app: './src/entries/pc/main.ts'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: [ '.ts', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'vue-router': 'vue-router/dist/vue-router.min.js',
            // 可通过绝对路径引入的文件
            'common': resolve('common'),
            'package': resolve('components/package'),
            'components': resolve('src/components'),
            'vue_plugins': resolve('src/vue_plugins'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            { test: /\.ts$/, loader: 'ts-loader', options: { appendTsSuffixTo: [/\.vue$/] } },
            { test: /\.tsx$/, loader: 'babel-loader!ts-loader', options: { appendTsxSuffixTo: [/TSX\.vue$/] } },
            {
                test: /\.md$/,
                loader: 'vue-markdown-loader',
                options: {
                    use: [
                        [require('markdown-it-anchor'), {
                            level: 2,
                            slugify: slugify,
                            permalink: true,
                            permalinkBefore: true
                        }],
                        [require('markdown-it-container'), 'pc', {
                            validate: function (params) {
                                return params.trim().match(/^pc\s*(.*)$/)
                            },

                            render: function (tokens, idx) {
                                var m = tokens[idx].info.trim().match(/^pc\s*(.*)$/)
                                if (tokens[idx].nesting === 1) {
                                    var description = (m && m.length > 1) ? m[1] : ''
                                    var content = tokens[idx + 1].content
                                    var html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1')
                                    /*console.log('---html---', html)
                                    const title = /pc/.test(html)
                                    console.log('---title---', title)*/
                                    var script = striptags.fetch(content, 'script')
                                    var style = striptags.fetch(content, 'style')
                                    var descriptionHTML = description
                                        ? md.render(description)
                                        : ''

                                    return `<demo-pc class="demo-box">
                                                <div class="source" slot="source">${html}</div>
                                                    ${descriptionHTML}
                                                <div class="highlight" slot="highlight">`
                                }
                                return '</div></demo-pc>\n'
                            }
                        }],
                        [require('markdown-it-container'), 'mobile', {
                            validate: function (params) {
                                return params.trim().match(/^mobile\s*(.*)$/)
                            },

                            render: function (tokens, idx) {
                                var m = tokens[idx].info.trim().match(/^mobile\s*(.*)$/)
                                if (tokens[idx].nesting === 1) {
                                    var description = (m && m.length > 1) ? m[1] : ''
                                    var content = tokens[idx + 1].content
                                    var html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1')
                                    /*console.log('---html---', html)
                                    const title = /pc/.test(html)
                                    console.log('---title---', title)*/
                                    var script = striptags.fetch(content, 'script')
                                    var style = striptags.fetch(content, 'style')
                                    var descriptionHTML = description
                                        ? md.render(description)
                                        : ''

                                    return `<demo-mobile class="demo-box">
                                                <div class="source" slot="source">${html}</div>
                                                    ${descriptionHTML}
                                                <div class="highlight" slot="highlight">`
                                }
                                return '</div></demo-mobile>\n'
                            }
                        }],
                        [require('markdown-it-container'), 'tip'],
                        [require('markdown-it-container'), 'warning']
                    ],
                    preprocess: function (MarkdownIt, source) {
                        MarkdownIt.renderer.rules.table_open = function () {
                            return '<table class="table">'
                        }
                        MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence)
                        return source
                    },
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {test: /\.s[c|a]ss$/, loader: 'style-loader!css-loader!sass-loader'},
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                loader: 'url-loader',
                options: {limit: 100, name: '[name]_[hash:8].[ext]'}
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/,
                loader: 'url-loader',
                options: {limit: 8192, name: '[name]_[hash:8].[ext]'}
            },
        ]
    },
}
