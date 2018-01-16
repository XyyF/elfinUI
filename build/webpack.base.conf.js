'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: './src/entries/pc/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'vue-router': 'vue-router/dist/vue-router.min.js',
            // 可通过绝对路径引入的文件
            'components': resolve('src/components'),
            'vue_plugins': resolve('src/vue_plugins'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
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
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {test: /\.s[c|a]ss$/, loader: 'style-loader!css-loader!sass-loader'},
            {test: /\.css$/, loader: 'vue-loader'},
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'url-loader',
                options: {limit: 100, name: '[name]_[hash:8].[ext]'}
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/,
                loader: 'url-loader',
                options: {limit: 8192, name: '[name]_[hash:8].[ext]'}
            },
        ]
    }
}
