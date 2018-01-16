/**
 * Created by lnk on 2017/3/29.
 */
/**
 * 设置网页标题用的工具。支持微信
 * 初始化后会让每个Vue实例带上一个$title属性，可直接赋值修改title
 * 另外带有一个v-title指令，可以在页面初始化时用在顶层元素上设置页面标题
 */
export default {
    install(Vue) {
        /**
         * 设置title用的指令，不支持异步设置。
         * 使用方法<div v-title="'标题内容'"></div>
         */
        Vue.directive('title', {
            // 不能用update方法，否则back时标题不正确
            inserted(el, binding) {
                setTitle(binding.value)
            }
        })

        // 添加实例上的引用
        Object.defineProperty(Vue.prototype, '$title', {
            get: () => document.title,
            set: setTitle
        });
    }
}

function setTitle(title) {
    document.title = title

    // 解决 iOS 微信加载网页title不更新的问题
    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
        const i = document.createElement('iframe');
        i.src = '/static/favicon.ico';
        i.style.display = 'none';
        i.onload = () => {
            setTimeout(() => i.remove(), 9)
        }
        document.body.appendChild(i);
    }
}