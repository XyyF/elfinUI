const path = require('path')
const QiniuPlugin = require('qn-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const secret = require('../secret')

const isBuilding = process.env.NODE_ENV === 'production'
const isInExternal = process.env.STORYBOOK_IN_EXTERNAL === '1'

module.exports = {
    managerWebpack: (config) => {
        // build下
        if (isBuilding) {
            // 输出的 html 位置变动
            const htmlWebpackPlugin = config.plugins.find(e => e instanceof HtmlWebpackPlugin)
            if (htmlWebpackPlugin) {
                htmlWebpackPlugin.options.filename = 'html/ui.html'
            }
            // 七牛上传打包
            config.output.publicPath = '//res.dev.xiaojing0.com/'
            config.output.filename = 'js/[name].[hash:8].bundle.js'
            config.output.chunkFilename = 'js/[name].[hash:8].bundle.js'
            config.plugins.push(
                new QiniuPlugin(secret),
            )
        }
        // update config
        return config;
    },
    webpackFinal: (config) => {
        config.output.filename = 'js/[name].[hash:8].js'
        config.output.chunkFilename = 'js/[name].[hash:8].js'
        // add addon-storysource
        config.module.rules.push({
            test: [/.*\.js$/],
            loaders: [require.resolve('@storybook/addon-storysource/loader')],
            include: [path.resolve(__dirname, '../main/stories')],
            enforce: 'pre',
        });
        // allow SCSS
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        implementation: require('sass'),
                    },
                },
            ],
            include: path.resolve(__dirname, '../'),
        });
        // 设置Alias别名
        config.resolve.alias = {
            ...config.resolve.alias,
            '@packages': path.resolve(__dirname, '../packages'),
        };
        // __external的node_modules优先使用根目录下的
        config.resolve.modules.unshift(path.join(__dirname, '../node_modules'));
        // build下
        if (isBuilding) {
            // 输出的 html 位置变动
            const htmlWebpackPlugin = config.plugins.find(e => e instanceof HtmlWebpackPlugin)
            if (htmlWebpackPlugin) {
                htmlWebpackPlugin.options.filename = 'html/iframe.html'
            }
            // 七牛上传打包
            config.output.publicPath = '//res.dev.xiaojing0.com/'
            config.plugins.push(
                new QiniuPlugin(secret),
            )
        }
        return config;
    },
}