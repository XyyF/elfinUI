// 微信sdk文档地址https://mp.weixin.qq.com/wiki
// 需要在index.ejs文件中手动引入http://res.wx.qq.com/open/js/jweixin-1.2.0.js，并在webpack中配置externals = {wechatSdk: 'wx'}
// eslint-disable-next-line
import wx from 'wechatSdk'
import httpRequestor from 'utils/http_requestor'
import {getUrlParam, stringifyUrlParams} from 'utils/common_utils'

// 微信sdk初始化状态
const SDKStatus = {
    // 默认状态，未初始化
    DEFAULT: 0,
    // 正在初始化，获取签名
    INITIALIZING: 1,
    // 已成功获取到签名，可以调用各种接口了
    SUCCESS: 2,
    // 获取签名失败
    FAIL: 3,
}

// 分享相关的微信菜单项
const SHARE_ITEMS = [
    'menuItem:share:appMessage',
    'menuItem:share:timeline',
    'menuItem:share:qq',
    'menuItem:share:weiboApp',
    'menuItem:favorite',
    'menuItem:share:facebook',
    'menuItem:share:QZone',
]

/**
 * 微信sdk包装类。只能通过单例模式使用
 */
class WXSDKManager {
    /**
     * {object?} options 配置参数
     * {boolean} options.share 是否使用分享功能。开启后会获取对应的权限
     * {boolean} options.pay 是否使用支付功能。开启后会获取对应的权限
     * {boolean} options.locate 是否使用定位功能。开启后会获取对应的权限
     * {function} options.onError 初始化错误回调。会传入一个Error对象
     * {function} options.router VueRouter实例，用来解析跳转地址
     *
     * @constructor
     */
    constructor(options = {}) {
        // 要使用的接口列表，必须注册后才能使用
        this.apiList = [
            ...(options.share ? ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems'] : []),
            ...(options.pay ? ['chooseWXPay'] : []),
            ...(options.locate ? ['getLocation'] : []),
        ]
        // 初始化错误
        this.onError = options.onError || console.error.bind(console)
        // 分享时的默认logo图片地址
        this.defaultShareLogo = options.defaultShareLogo

        // 私有数据
        // 微信sdk初始化状态，取值为SDKStatus
        this.status = SDKStatus.DEFAULT
        // 是否需要在ready事件中重新调用init方法
        this.needReinit = false
        // 等待初始化完成后再执行的方法
        this.penddingFuncs = []
        // 当前已签名的url
        this.signatureUrl = ''
        // 当前页面的分享参数
        this.shareConfig = {sigUrl: '', config: null}
        const {appid, sigApiUrl, wxUsrInfoUrl} = initUrl()
        // 微信appid
        this.appid = appid
        // 获取签名的接口
        this.sigApiUrl = sigApiUrl
        // 重定向获取微信用户信息的地址
        this.wxUsrInfoUrl = wxUsrInfoUrl
        // 自己的公众号不会在url上带appid
        this.isOwnPlatform = !this.appid
        // 是否已验证过后端的微信appid配置正确，用来在签名错误时定位错误原因
        this.appidIsValidated = false
        // VueRouter实例
        this.router = options.router

        // 如果调用多次，则后面注册的回调函数会替换前面的
        wx.error(onInitError.bind(null, this))
    }

    /**
     * 对当前url进行签名授权
     * 若失败或取消则会抛出一个带有code属性的异常对象
     */
    async init() {
        try {
            this.status = SDKStatus.INITIALIZING
            const sigUrl = getSignatureUrl()
            this.signatureUrl = sigUrl
            console.log(`wechat signature ${sigUrl}`)
            const sigResult = await requestSignature(this.sigApiUrl, sigUrl)
            console.log(`signature success for ${sigUrl}`)
            // 期间没有跳转到其它页面
            if (sigUrl === getSignatureUrl()) {
                if (this.appid && this.appid !== sigResult.appid) {
                    // appid不一致，可能是登录了A公众号的页面，后端session中存放了A公众号的appid，又去点开B公众号分享出来的页面。同时这个页面又不需要登录态（需要登录态的话会被踢下线，走B公众号的登录流程）
                    // 这种场景下理论上用url上的appid更好，但下发的签名是根据session中的appid计算的，所以优先采用下发的这个
                    console.warn(`Different appid! Got ${this.appid} from url, but ${sigResult.appid} from server`)
                }
                this.appid = sigResult.appid
                // 这里失败不会抛异常，只能根据status大概判断一下结果。因为status只表示最后一次调用的结果
                await setupConfig(this, sigResult)
                callPendingFuncs(this)
            } else {
                console.warn(`Too late! Discard sigResult for ${sigUrl}`)
            }
        } catch (error) {
            this.onError(error)
        }
    }

    /**
     * 是否已配置当前页面分享信息（不一定配置完成）
     * @return {boolean}
     */
    isShareConfigured() {
        return this.shareConfig.sigUrl === getSignatureUrl()
    }

    /**
     * 如果是第三方公众平台，就返回它的appid，否则返回空字符串
     * @return {string}
     */
    getThirdAppid() {
        return !this.isOwnPlatform && this.appid || ''
    }

    /**
     * 返回一个promise，在初始化完成后调用
     * @returns {Promise}
     */
    waitInitFinish() {
        const sigUrl = getSignatureUrl()
        if (this.status === SDKStatus.SUCCESS && this.signatureUrl === sigUrl) {
            return Promise.resolve()
        }
        console.log('Waiting for wxManager\'s initialization...')
        const result = new Promise((resolve) => {
            this.penddingFuncs.push(() => {
                // 如果页面跳转了，这个任务也不用执行了
                if (sigUrl === getSignatureUrl()) {
                    resolve()
                } else {
                    console.warn(`Too late! Discard the pendding task for ${sigUrl}`)
                }
            })
        })
        // 首次加载或已跳转到新页面，需要初始化
        if (this.signatureUrl !== sigUrl) {
            this.init()
        }
        return result
    }

    /**
     * 配置分享信息
     * @param {object?} config
     * @param {string?} config.title 分享标题
     * @param {string?} config.desc 分享描述
     * @param {string?} config.link 分享链接
     * @param {string?} config.imgUrl 分享图标
     * @param {string?} config.type 分享给好友时的类型，music、video或link，不填默认为link
     * @param {string?} config.dataUrl 如果type是music或video，则要提供数据链接，默认为空
     * @param {function?} config.success 用户确认分享后执行的回调函数
     * @param {function?} config.fail 用户分享失败后执行的回调函数
     * @param {function?} config.cancel 用户取消分享后执行的回调函数
     * @param {function?} config.complete 用户分享成功、失败或取消后都会执行的回调函数
     */
    setupShare(config = {}) {
        this.shareConfig = mergeShareConfig(this.shareConfig.sigUrl, this.shareConfig.config, config, this.defaultShareLogo, this.getThirdAppid())
        console.log('going to call setupShare')
        this.waitInitFinish().then(() => {
            console.log('setupShare. config:', this.shareConfig.config)
            wx.onMenuShareAppMessage(this.shareConfig.config)
            wx.onMenuShareTimeline(this.shareConfig.config)
            wx.onMenuShareQQ(this.shareConfig.config)
            wx.onMenuShareQZone(this.shareConfig.config)
            wx.onMenuShareWeibo(this.shareConfig.config)
        })
    }

    /**
     * 设置分享按钮显隐状态
     * @param {boolean} show 是否显示分享按钮
     */
    showShareBtn(show) {
        console.log('going to call showShareBtn')
        this.waitInitFinish().then(() => {
            console.log('showShareBtn. show:', show)
            if (show) {
                wx.showMenuItems({menuList: SHARE_ITEMS})
            } else {
                wx.hideMenuItems({menuList: SHARE_ITEMS})
            }
        })
    }

    /**
     * 调起微信支付
     * @param {object} payInfo 后端下发的支付用的参数
     * @param {number} payInfo.timeStamp 支付签名时间戳
     * @param {string} payInfo.nonceStr 支付签名随机串，不长于 32 位
     * @param {string} payInfo.prepayId 预支付id
     * @param {string} payInfo.signType 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
     * @param {string} payInfo.paySign 支付签名
     * @returns {Promise}
     */
    pay(payInfo) {
        if (!payInfo.prepayId) {
            // 与sdk返回的错误格式统一
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject({errMsg: 'no prepayId'})
        }
        return this.waitInitFinish().then(() => {
            return new Promise((resolve, reject) => {
                wx.chooseWXPay({
                    timestamp: payInfo.timeStamp, // 注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: payInfo.nonceStr,
                    package: `prepay_id=${payInfo.prepayId}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: payInfo.signType,
                    paySign: payInfo.paySign,
                    success: resolve,
                    fail: reject,
                })
            })
        })
    }

    /**
     * 获取经纬度
     * @returns {Promise}
     */
    getLocation() {
        return this.waitInitFinish().then(() => {
            return new Promise((resolve, reject) => {
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: (res) => {
                        // const latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
                        // const longitude = res.longitude // 经度，浮点数，范围为180 ~ -180
                        // const speed = res.speed // 速度，以米/每秒计
                        // const accuracy = res.accuracy // 位置精度
                        resolve(res)
                    },
                    cancel: reject,
                    fail: reject,
                })
            })
        })
    }

    /**
     * 重定向获取微信用户信息
     * @param {string|object?} targetUrl 获取到后需要打开的url字符串，或可以传入VueRouter.push的路由信息对象
     */
    requestWxUserInfo(targetUrl) {
        if (typeof targetUrl === 'object') {
            if (this.router) {
                targetUrl = this.router.resolve(targetUrl).href
            } else {
                console.error('wx_sdk_manager中没有配置router，无法解析路由信息')
            }
        }
        window.location.href = `${this.wxUsrInfoUrl}?redirect=${encodeURIComponent(targetUrl || window.location.href)}`
    }
}

/**
 * 尝试从url上获取appid，初始化接口url
 * @return {{appid:string, sigApiUrl:string, wxUsrInfoUrl:string}}
 */
function initUrl() {
    // 如果是由第三方公众平台接入的公众号，则着陆页url上会传入appid
    const appid = getUrlParam('appid')
    let sigApiUrl = ''
    let wxUsrInfoUrl
    if (appid) {
        console.log('Got appid from url')
        sigApiUrl = `/wechat/open_platform/local/${appid}/jsapisig`
        wxUsrInfoUrl = `${httpRequestor.baseURL}/wechat/open_platform/${appid}/wx_info`
    } else {
        sigApiUrl = '/wechat/own_platform/jsapisig'
        wxUsrInfoUrl = `${httpRequestor.baseURL}/wechat/own_platform/wx_info`
    }
    return {appid, sigApiUrl, wxUsrInfoUrl}
}

/**
 * 微信sdk初始化失败后的回调方法
 * @param {WXSDKManager} instance WXSDKManager实例
 * @param {object} res 微信sdk返回的错误对象
 * @param {string} res.errMsg 错误描述
 */
function onInitError(instance, res) {
    let err = null;
    if (res.errMsg === 'config:invalid url domain') {
        // 当前页面所在域名与使用的appid没有绑定，请确认正确填写绑定的域名，仅支持80（http）和443（https）两个端口，因此不需要填写端口号（一个appid可以绑定三个有效域名）。
        console.error(`当前域名没有配置授权域名或安全域名${instance.signatureUrl}`)
        err = createError(WXSDKManager.ERR_INIT_FAILED, '域名授权失败')
    } else if (res.errMsg === 'config:invalid signature') {
        // 确认url或appid是否正确
        const currentUrl = getSignatureUrl()
        if (instance.signatureUrl !== currentUrl) {
            console.warn(`签名时的url ${instance.signatureUrl} 和当前url ${currentUrl} 不一致，重新签名`)
            // 不能在这立即重新初始化，否则就会先进入INITIALIZING状态，然后才收到error事件之后的ready事件，导致直接进入SUCCESS状态
            instance.needReinit = true
        } else if (instance.appidIsValidated) {
            // onMenuShareAppMessage等方法也是异步的，可能存在这样的签名错误：
            // 签名、配置完成->调用sdk方法->跳转->真正执行native的sdk方法->签名错误
            // 这种跳转之前的页面错误直接无视就好
            console.log('旧页面的异步sdk方法导致了一个签名错误，已忽略')
        } else {
            // appid配置错误只有开发调试时才会遇到，所以以下为测试代码
            instance.appidErrorTimes = (instance.appidErrorTimes || 0) + 1
            if (instance.appidErrorTimes >= 10) {
                console.error(`签名错误，请检查appid ${instance.appid} 是否正确`)
                err = createError(WXSDKManager.ERR_INIT_FAILED, '签名错误')
            } else {
                console.log('可能配错了appid，也可能是快速跳转时旧页面的异步sdk方法导致的签名错误。再观察一下', instance.appidErrorTimes)
            }
        }
    } else if (res.errMsg === 'config:permission denied') {
        console.error('该公众号没有权限使用这个JSAPI，部分接口需要认证之后才能使用')
        err = createError(WXSDKManager.ERR_INIT_FAILED, '获取权限失败')
    } else if (res.errMsg === 'config:function not exist') {
        console.error('当前客户端版本不支持该接口')
        err = createError(WXSDKManager.ERR_INIT_FAILED, '您的微信版本太低，请升级到新版体验')
    } else {
        console.error('wx sdk error', res)
        err = createError(WXSDKManager.ERR_INIT_FAILED, `微信接口初始化失败${res.errMsg}`)
    }

    if (err) {
        instance.status = SDKStatus.FAIL
        instance.onError(err)
    }
}

/**
 * 获取签名用的url。包含协议，不含hashtag
 * @returns {string}
 */
function getSignatureUrl() {
    return window.location.href.split('#')[0]
}

/**
 * 获取签名
 * @param {string} sigApiUrl 微信签名接口
 * @param {string} signatureUrl 要签名的url
 * @return {Promise}
 */
function requestSignature(sigApiUrl, signatureUrl) {
    return httpRequestor.get(`${sigApiUrl}?url=${encodeURIComponent(signatureUrl)}`)
        .catch(result => Promise.reject(createError(WXSDKManager.ERR_SIGNATURE_FAILED, result.status.message)))
}

/**
 * 调用微信sdk的初始化方法，不管成功失败都resolve，可根据status判断是否成功
 * @param {WXSDKManager} instance
 * @param {object} sigResult 微信签名接口返回的数据
 * @return {Promise}
 */
function setupConfig(instance, sigResult) {
    return new Promise((resolve) => {
        // 不管初始化成功还是失败都会回调。会在error之后调用。如果调用多次，则每个注册的回调函数都会被调用。但每个只调用一次
        wx.ready(() => {
            if (instance.needReinit) {
                instance.needReinit = false
                instance.init().then(resolve)
                return
            }
            if (instance.status === SDKStatus.INITIALIZING) {
                instance.status = SDKStatus.SUCCESS
                // 只要成功配置过一次，就验证了appid配置无误
                instance.appidIsValidated = true
            }
            resolve()
        })
        // 本地异步方法，不需要网络
        wx.config({
            // debug: window.devEnv, // 开启调试模式。在pc端会通过log打出传入的参数，而移动端会弹alert显示api返回值。
            appId: sigResult.appid, // 必填，公众号的唯一标识
            timestamp: sigResult.timeStamp, // 必填，生成签名的时间戳
            nonceStr: sigResult.noncestr, // 必填，生成签名的随机串
            signature: sigResult.signature, // 必填，签名，见附录1 https://mp.weixin.qq.com/wiki
            jsApiList: instance.apiList, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2 https://mp.weixin.qq.com/wiki
        })
    })
}

/**
 * 调用挂起中的方法
 * @param {WXSDKManager} instance
 */
function callPendingFuncs(instance) {
    if (instance.status === SDKStatus.SUCCESS) {
        const funcs = instance.penddingFuncs
        instance.penddingFuncs = []
        funcs.map(func => func())
    }
}

/**
 * 合并新旧分享配置信息
 * @param {string} oldSigUrl
 * @param {object} oldShareConfig
 * @param {object} newShareConfig
 * @param {string} defaultLogo
 * @param {string} appid
 * @return {{sigUrl: string, config: {}}}
 */
function mergeShareConfig(oldSigUrl, oldShareConfig, newShareConfig, defaultLogo, appid) {
    const newSigUrl = getSignatureUrl()
    const oldConfig = oldSigUrl === newSigUrl && oldShareConfig || {}
    const newConfig = Object.assign({}, oldConfig, newShareConfig)
    newConfig.title = newConfig.title || document.title
    newConfig.desc = newConfig.desc || getMetaDescription()
    newConfig.link = newConfig.link || window.location.href
    if (appid && !getUrlParam('appid', newConfig.link)) {
        newConfig.link = stringifyUrlParams(newConfig.link, {appid})
    }
    newConfig.imgUrl = newConfig.imgUrl || defaultLogo
    newConfig.fail = newConfig.fail || (res => console.error('share fail', res))
    return {sigUrl: newSigUrl, config: newConfig}
}

/**
 * 获取页面描述文字
 * @return {string}
 */
function getMetaDescription() {
    const descElement = document.querySelector('meta[name="descripton"]')
    return descElement ? descElement.content : document.title
}

/**
 * 统一的异常对象封装逻辑
 * @param {number} code 错误码，取值为WXSDKManager.ERR_NOT_INIT等
 * @param {string} errMsg 可以显示给用户的错误信息
 * @returns {Error}
 */
function createError(code, errMsg) {
    const err = new Error(errMsg)
    err.code = code
    // 必须是Error对象，否则vuex要报warning
    return err
}

// 还未初始化
WXSDKManager.ERR_NOT_INIT = 1
// 获取签名失败
WXSDKManager.ERR_SIGNATURE_FAILED = 2
// 初始化失败
WXSDKManager.ERR_INIT_FAILED = 3
// 用户点了取消
WXSDKManager.ERR_OP_CANCELED = 4
// 操作失败
WXSDKManager.ERR_OP_FAILED = 5

export default WXSDKManager
