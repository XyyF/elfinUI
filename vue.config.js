const path = require('path')
const {use, preprocess} = require('./mkeditor-config')

module.exports = {
    lintOnSave: false,
    baseUrl: './',
    pages: {
        home: {
            // page 的入口
            entry: 'examples/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/home.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'elfinUI'
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                'elfin-ui': path.resolve(__dirname, 'packages/'),
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('md')
            .test(/\.md/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .use('vue-markdown-loader')
            .loader('vue-markdown-loader/lib/markdown-compiler')
            .options({
                raw: true,
                use,
                preprocess,
            })
    },
}