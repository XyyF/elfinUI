/**
 * Created by gukong on 2019/7/10.
 */
import Loading from './loading'
import {AnimationVueTransition, AnimationVueTransitionType} from 'vue-animation' // henry install vue-animation包
import './side-popup.css'

const ERROR_LAST_ONE = 'can not pop last one'

const SidePopupOptions = {
    components: {
        Loading,
    },
    data: function () {
        return {
            // 这里用两个变量来控制显示隐藏，是为了用时间差来显示动画效果
            activated: false, // 控制整个弹出层的显示隐藏
            sidePopupVisible: false, // 仅控制操作区域的显示隐藏
            /**
             * [{
             *	sceneId: 0,
             *	component: null, // create-contract 内容区域组件
             *	componentOptions: null, // 内容区域组件 的 options，详情：https://cn.vuejs.org/v2/guide/render-function.html#深入-data-对象
             *	onClose: Function, // 关闭sidePopup的回调
             *  onDisappear: Function, // component 被替换掉的回调
             *  extraToClose: Object,
             *  extraToDisappear: Object
             * }]
             */
            configs: [],
            extraToClose: null,
        }
    },
    props: {
        // top, bottom, left, right
        position: {
            type: String,
            default: 'bottom',
        },
    },
    computed: {
        currentConfig() {
            if (this.configs.length === 0) return null
            return this.configs[this.configs.length - 1]
        },
        styleForPosition() { // henry 更改左右方向 left right
            const styles = {
                top: {
                    top: 0,
                    left: 0,
                    right: 0,
                },
                bottom: {
                    left: 0,
                    bottom: 0,
                    right: 0,
                },
                left: {
                    bottom: 0,
                    left: 0,
                    top: 0,
                },
                right: {
                    right: 0,
                    bottom: 0,
                    top: 0,
                },
            }
            return styles[this.position] || {}
        },
    },
    methods: {
        _reset() {
            this.configs = []
            this.extraToClose = null
        },
        getConfig(sceneId) {
            let config = this.configs.find(item => item.sceneId === sceneId)
            // 没有旧的配置项，返回一个新的（拥有特定的sceneId)
            // 给定默认值，才能做到数据相应
            if (!config) {
                config = {
                    sceneId,
                    sidePopupOptions: null, // henry 添加config配置参数
                    component: null,
                    componentOptions: null,
                }
                this.configs.push(config)
            }
            return config
        },
        setCallbackOnDisappear(sceneId, onDisappear) {
            const config = this.getConfig(sceneId)
            config.onDisapear = onDisappear
        },
        setCallbackOnClose(sceneId, onClose) {
            const config = this.getConfig(sceneId)
            config.onClose = onClose
        },
        setSidePopupOptions(sceneId, options) {
            const config = this.getConfig(sceneId)
            config.sidePopupOptions = options
            if (options.position) { // henry 添加
                this.position = options.position
            }
        },
        setComponent(sceneId, component, options) {
            const config = this.getConfig(sceneId)
            if (typeof component === 'function') {
                config.component = 'my-component'
                config.componentOptions = options
            }
            else {
                config.component = component
                config.componentOptions = options
            }
        },
        setExtraToClose(sceneId, data) {
            const config = this.getConfig(sceneId)
            config.extraToClose = data
        },
        pop(extra) {
            if (this.configs.length === 1) {
                throw new Error(ERROR_LAST_ONE)
            }
            const lastConfig = this.configs[this.configs.length - 1]
            lastConfig.extraToDisappear = extra
            this.configs.pop()
        },
        close(extra) {
            this.extraToClose = extra
            this.sidePopupVisible = false
        },

        /**
         * 修改当前弹框的dialog options
         * @param config
         */
        overCurrentDialogOptions(config) { // henry 添加 overCurrentDialogOptions
            if (!this.currentConfig) throw new Error('当前有弹框时才能配置')
            this.currentConfig.sidePopupOptions = Object.assign({}, this.currentConfig.sidePopupOptions, config)
        },
    },
    render(h) {
        const {
            currentConfig,
            sidePopupVisible,
            styleForPosition
        } = this

        if (!currentConfig) return null

        // 合并 props
        const componentOptions = {...{...currentConfig.componentOptions}}
        componentOptions.props = Object.assign(
            {sceneId: currentConfig.sceneId},
            componentOptions.props,
        )
        componentOptions.style = Object.assign(
            {},
            componentOptions.style,
            styleForPosition,
        )

        return h(
            'div',
            {
                class: {
                    'full-modal-root': true,
                    visible: sidePopupVisible,
                },
                attrs: {
                    id: 'full-modal',
                }
            },
            [
                h(
                    AnimationVueTransition,
                    {
                        props: {
                            animationInType: AnimationVueTransitionType.SLIDEINUP,
                            animationOutType: AnimationVueTransitionType.SLIDEOUTDOWN,
                            speed: 'faster',
                        },
                    },
                    sidePopupVisible ? [h(currentConfig.component, componentOptions)] : [null],
                ),
            ],
        )
    },
    watch: {
        // currentComponent 变化，意味着弹框内容发生了变化，调用了 show || push
        // 旧的弹框内容组件需要回调 onDisappear
        currentConfig(val, oldVal) {
            if (!oldVal || !oldVal.onDisappear) return
            oldVal.onDisappear(oldVal.extraToDisappear || null)
        },
        activated(val) {

            if (val) {
                setTimeout(() => {
                    this.sidePopupVisible = val
                })
                return
            }
            // 弹框关闭了，所有的弹框内容都要回调 onClose

            this.configs.forEach(item => {
                if (!item.onClose) return
                item.onClose(item.extraToClose || this.extraToClose || null)
            })
            this._reset()
        },
        sidePopupVisible(val) {
            if (val) {
                this.activated = val
            }
            else {
                setTimeout(() => {
                    this.activated = val
                }, 400)
            }
        },
    },
}

export default class SidePopup {
    constructor(Vue, vueOptions) {
        // 使用 get/set 方法识别 this.$create-contract 的调用
        // 设置一个sceneId，后续方法调用携带sceneId，归为同一场景
        // 连续弹框时有用
        this.sceneId = 0
        this.Vue = Vue
        this.vueOptions = vueOptions
        this.sidePopupRoot = this.initSidePopup() // henry 增加参数传递

        this.listenRouterBeforeEach()
    }

    /**
     * 嵌套弹框的场景
     * @return {SidePopup}
     */
    new() {
        return new SidePopup(this.Vue, this.vueOptions)
    }

    /**
     * 显示弹框，与 push 一样的作用
     * @param component 内容组件
     * @param options 内容组件的选项 options
     * @param sceneId {int?} 场景id，用于区分连续弹框时场景划分
     * @returns {SidePopup}
     */
    show(component, options, sceneId) {
        return this.push(component, options, sceneId)
    }

    /**
     * 显示弹框
     * 多次调用 push，会依次压入弹框内容组件，仅显示最后一个组件
     * @param component
     * @param options
     * @param sceneId {int?} 场景id，用于区分连续弹框时场景划分
     * @returns {SidePopup}
     */
    push(component, options, sceneId) {
        this.Vue.component(
            'my-component',
            () => ({
                // 需要加载的组件 (应该是一个 `Promise` 对象)
                component: component(),
                // 异步组件加载时使用的组件
                loading: Loading,
                // 加载失败时使用的组件
                error: null,
                // 展示加载时组件的延时时间。默认值是 200 (毫秒)
                delay: 0,
                // 如果提供了超时时间且组件加载也超时了，
                // 则使用加载失败时使用的组件。默认值是：`Infinity`
                timeout: 3000,
            }),
        )
        this.sidePopupRoot.setComponent(sceneId || this.sceneId, component, options)
        this.sidePopupRoot.activated = true
        return this
    }

    pop(extra) {
        this.sidePopupRoot.pop(extra)
        return this
    }

    close(extra) {
        this.sidePopupRoot.close(extra)
        return this
    }

    /**
     * 设置 component 被替换掉的回调
     * @param callback
     * @param sceneId {int?} 场景id，用于区分连续弹框时场景划分
     * @return {SidePopup}
     */
    onDisappear(callback, sceneId) {

        this.sidePopupRoot.setCallbackOnDisappear(sceneId || this.sceneId, callback)
        return this
    }

    /**
     * 设置sidePopup关闭的回调
     * @param callback
     * @param sceneId {int?} 场景id，用于区分连续弹框时场景划分
     * @return {SidePopup}
     */
    onClose(callback, sceneId) {

        this.sidePopupRoot.setCallbackOnClose(sceneId || this.sceneId, callback)
        return this
    }
    /**
     * 设置 sidePopup 的选项
     * @param config
     * @param sceneId {int?} 场景id，用于区分连续弹框时场景划分
     * @return {sidePopup}
     */
    config(config, sceneId) { // henry 添加
        this.sidePopupRoot.setSidePopupOptions(sceneId || this.sceneId, config)
        return this
    }
    /**
     * 设置关闭回调时传入的数据
     * @param data
     * @param sceneId {int?} 场景id，用于区分连续弹框时场景划分
     */
    extraToClose(data, sceneId) {
        this.sidePopupRoot.setExtraToClose(sceneId || this.sceneId, data)
        return this
    }
    /**
     * 修改当前弹框的dialog options
     * @param config
     */
    overCurrentSidePopupOptions(config) { // henry 添加overCurrentSidePopupOptions
        this.sidePopupRoot.overCurrentSidePopupOptions(config)
        return this
    }

    initSidePopup(vueOptions) {
        // 创建实例，并挂载到一个元素上。
        const SidePopupRoot = this.Vue.extend(SidePopupOptions)

        const root = new SidePopupRoot({
            ...vueOptions,
            propsData: {
                router: this.vueOptions.router
            },
        }).$mount()
        document.querySelector('body').appendChild(root.$el)

        return root
    }

    listenRouterBeforeEach() {
        if (!this.vueOptions.router) return
        this.vueOptions.router.beforeEach((to, from, next) => {
            if (this.sidePopupRoot.activated) {
                const data = {systemBack: true}
                try {
                    this.pop(data)
                }
                catch (err) {
                    if (err.message === ERROR_LAST_ONE) {
                        this.close(data)
                    }
                }
                next(false)
            }
            else {
                next()
            }
        })
    }
}