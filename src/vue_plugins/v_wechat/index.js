import {getHost} from 'utils/common_utils'
import WXSDKManager from './wx_sdk_manager'

const SHARE_MODE_DEFAULT = 'default'
const SHARE_MODE_MANUL = 'manul'
/**
 * 微信相关接口用的工具。初始化后会让每个Vue实例带上一个$wx属性，其取值为WXSDKManager实例，可通过它配置分享、调起支付。
 * 初始化方法如下:
 * 在index.ejs文件中手动引入http://res.wx.qq.com/open/js/jweixin-1.2.0.js
 * 在webpack中配置externals = {wechatSdk: 'wx'}
 *
 * import vWechat from 'vue_plugins/v_wechat'
 * Vue.use(vWechat, {router, logo: logoImg});
 * {VueRouter?} router VueRouter实例，用来配置分享信息，解析跳转地址
 * {string?} logo 分享时的默认图片
 * {boolean?} share 页面是否默认可分享
 *
 *
 * 配置分享参数方法有如下3种，优先级依次递增：
 * 1. 在上面的Vue.use方法处填写默认的分享规则
 * 2. 在router中通过meta配置分享参数，具体取值可参考WXSDKManager中setupShare方法的参数。如下
 * meta: {wx: {title:'标题', imgUrl:'xxx.com/logo.jpg'}}
 * 这个wx对象中还可以配置几个特殊的参数：
 * {string} shareMode 该页面是否可分享，即是否显示微信菜单中的分享按钮。若不设置则以vWechat初始化时的配置为准
 *                取值为'default'表示使用默认分享参数
 *                取值为'manul'表示通过方法3动态设置分享参数（如根据异步拉取到的数据设置分享标题）
 * 3. 直接在*.vue文件中通过this.$wx.setupShare方法配置分享参数
 */
export default {
    install(Vue, options) {
        if (options.logo) {
            if (options.logo.startsWith('//')) {
                options.logo = window.location.protocol + options.logo
            } else if (options.logo.startsWith('/')) {
                options.logo = getHost() + options.logo
            }
        }
        // 初始化sdk
        const instance = new WXSDKManager({
            share: true,
            pay: true,
            onError,
            router: options.router,
            defaultShareLogo: options.logo,
        })

        // 添加实例上的引用
        Vue.prototype.$wx = instance

        // 页面跳转时更新分享配置
        if (options.router) {
            // 正在等待配置微信分享信息的路由
            let penddingRoute = null
            options.router.afterEach((route) => {
                penddingRoute = route
                // 此时location.href（签名用）和document.title（分享用的默认标题）还没有真的改变，延时一下再进行操作
                Vue.nextTick(() => {
                    if (route !== penddingRoute) {
                        // 如果页面连续跳转了多次，只对最后一次的url进行配置
                        console.log('ignore older router change event')
                        return
                    }
                    if (instance.isShareConfigured()) {
                        // 如果当前页面已经配置过分享信息了（在mounted中设置），这里就不需要再设置一遍了
                        console.log('ignore configured router change event')
                        return
                    }
                    const config = {
                        ...{shareMode: options.share ? SHARE_MODE_DEFAULT : '', imgUrl: options.logo},
                        ...(route.meta && route.meta.wx || {})
                    }
                    instance.showShareBtn(!!config.shareMode)
                    if (config.shareMode === SHARE_MODE_MANUL) {
                        return
                    }
                    instance.setupShare(config)
                })
            });
        }
    }
}

function onError(err) {
    if (typeof window.Toast === 'function') {
        // 在app.vue注册的vux全局方法
        // window.Toast({text: err.message, type: 'warn'})
    } else {
        console.error(err)
    }
}