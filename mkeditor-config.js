/**
 * 用法：
 * const {use, preprocess} = require('./mkeditor-config')
 * chainWebpack: config => {
        config.module.rule('md')
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
    }
 **/

const cheerio = require('cheerio')
const md = require('markdown-it')()
const MarkdownItContainer = require('markdown-it-container')
const MarkdownItAnchor = require('markdown-it-anchor')
const slugify = require('transliteration').slugify

/**
 * 按标签(如style)分割代码
 * @param str 文本流内容
 * @param tags 标签
 */
function strip(str, tags) {
    // console.log('----strip-----', str, tags)
    const $ = cheerio.load(str, {decodeEntities: false})

    // console.log('----strip123-----', $.html())

    if (!tags || tags.length === 0) return str

    tags = !Array.isArray(tags) ? [tags] : tags
    let len = tags.length

    while (len--) {
        $(tags[len]).remove()
    }

    // console.log('----strip123-----', $('html head').html())
    return $('html head').html()
}

function wrap(render) {
    return function () {
        return render.apply(this, arguments)
            .replace('<code v-pre class="', '<code class="hljs ')
            .replace('<code>', '<code class="hljs">')
    }
}

/**
 * 编码转换
 * @param str 待转换字符
 */
function convertHtml(str) {
    return str.replace(/(&#x)(\w{4});/gi, $0 => String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16)))
}

exports.use = [
    [MarkdownItAnchor, {
        level: 2,
        slugify: slugify,
        permalink: false, // 锚链接
        permalinkBefore: false
    }],
    [MarkdownItContainer, 'component', {
        validate: params => params.trim().match(/^component\s*(.*)$/),
        render: function (tokens, idx) {

            var m = tokens[idx].info.trim().match(/^component\s*(.*)$/);

            if (tokens[idx].nesting === 1) {
                var description = (m && m.length > 1) ? m[1] : ''
                // console.log('----html1-----', tokens[idx + 1].content)
                // console.log('----html-----', strip(tokens[idx + 1].content, 'script'))
                const html = convertHtml(strip(tokens[idx + 1].content, ['script', 'body']))
                // console.log('----html1-----', html)
                var descriptionHTML = description
                    ? md.render(description)
                    : ''

                return `<component-demo>
                           <div slot="instance">${html}</div>
                           ${descriptionHTML}
                           <div slot="highlight">`
            }
            return '</div></component-demo>\n'
        },
    }],
]

exports.preprocess = function (MarkdownIt, source) {
    MarkdownIt.renderer.rules.table_open = function () {
        return '<table class="table">'
    }
    MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence)
    return source
}