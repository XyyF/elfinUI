/**
 * Created by gukong on 2019/1/11.
 */
import Loading from './loading'
import transitionHeight from '../../src/directives/transition-height.js'

/**
 * 设置 title 有三种方式
 * 1. 组件选项当中写 title
 * 2. $create-contract.config({title: ''})
 * 3. 组件业务代码中 $create-contract.overCurrentDialogOptions({title})
 */
const DialogOptions = {
    components: {
        Loading,
    },
    directives: {
        transitionHeight,
    },
    data: function () {
        return {
            dialogVisible: false, // create-contract 是否可见
            /**
             * [title]
             * [{
			 *	sceneId: 0,
             *	component: null, // create-contract 内容区域组件
			 *	componentOptions: null, // 内容区域组件 的 options，详情：https://cn.vuejs.org/v2/guide/render-function.html#深入-data-对象
			 *	onClose: Function, // 关闭dialog的回调
			 *  onDisappear: Function, // component 被替换掉的回调
             *	dialogOptions: { // el-create-contract 组件的选项，详情：http://element-cn.eleme.io/#/zh-CN/component/dialog#attributes
			 *		title: '',
			 *  },
			 *  extraToClose: Object,
			 *  extraToDisappear: Object
			 * }]
             */
            configs: [],
            extraToClose: null,
        }
    },
    props: {
        // 注册全局 create-contract 的时候，传入的配置项
        pluginOptions: {
            default: {
                width: '30%',
            },
        },
    },
    computed: {
        currentConfig() {
            if (this.configs.length === 0) return null
            return this.configs[this.configs.length - 1]
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
                    dialogOptions: null,
                    component: null,
                    componentOptions: null,
                }
                this.configs.push(config)
            }
            return config
        },
        handleVisibleChanged(val) {
            this.dialogVisible = val
        },
        setCallbackOnDisappear(sceneId, onDisappear) {
            const config = this.getConfig(sceneId)
            config.onDisapear = onDisappear
        },
        setCallbackOnClose(sceneId, onClose) {
            const config = this.getConfig(sceneId)
            config.onClose = onClose
        },
        setDialogOptions(sceneId, options) {
            const config = this.getConfig(sceneId)
            config.dialogOptions = options
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
                throw new Error('不能 pop 最后一个弹框')
            }
            const lastConfig = this.configs[this.configs.length - 1]
            lastConfig.extraToDisappear = extra
            this.configs.pop()
        },
        close(extra) {
            this.extraToClose = extra
            this.dialogVisible = false
        },
        /**
         * 修改当前弹框的dialog options
         * @param config
         */
        overCurrentDialogOptions(config) {
            if (!this.currentConfig) throw new Error('当前有弹框时才能配置')
            this.currentConfig.dialogOptions = Object.assign({}, this.currentConfig.dialogOptions, config)
        },
    },
    render(h) {
        const {
            pluginOptions,
            currentConfig,
            dialogVisible,
            handleVisibleChanged,
        } = this
        if (!currentConfig) return null
        /**
         * 处理 create-contract options
         */
        const dialogOptions = {...currentConfig.dialogOptions}

        // 合并 props
        dialogOptions.props = Object.assign(
            {},
            pluginOptions,
            {
                visible: dialogVisible,
                title: currentConfig.component.title,
            },
            dialogOptions.props,
        )
        dialogOptions.directives = [{
            name: 'transition-height',
            value: '.el-dialog',
        }]

        // 合并 on
        dialogOptions.on = Object.assign(
            {'update:visible': handleVisibleChanged},
            dialogOptions.on,
        )

        // 合并 props
        const componentOptions = {...{...currentConfig.componentOptions}}
        componentOptions.props = Object.assign(
            {sceneId: currentConfig.sceneId},
            componentOptions.props,
        )

        return h(
            'el-dialog',
            {...dialogOptions},
            [
                h(
                    currentConfig.component,
                    componentOptions,
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
        dialogVisible(val) {
            if (val) return
            // 弹框关闭了，所有的弹框内容都要回调 onClose
            this.configs.forEach(item => {
                if (!item.onClose) return
                item.onClose(item.extraToClose || this.extraToClose || null)
            })
            this._reset()
        },
    },
}

export default class Dialog {
    constructor(Vue, options, instanceOptions) {
        // 使用 get/set 方法识别 this.$create-contract 的调用
        // 设置一个sceneId，后续方法调用携带sceneId，归为同一场景
        // 连续弹框时有用
        this.sceneId = 0
        this.Vue = Vue
        this.pluginOptions = options
        this.dialogRoot = this.initDialog(instanceOptions)
    }

    /**
     * 嵌套弹框的场景
     * @return {Dialog}
     */
    new() {
        return new Dialog(this.Vue, this.pluginOptions)
    }

    /**
     * 显示弹框，与 push 一样的作用
     * @param component 内容组件
     * @param options 内容组件的选项 options
     * @param sceneId {int?} 场景id，用于区分连续弹框时场景划分
     * @returns {Dialog}
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
     * @returns {Dialog}
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
        this.dialogRoot.setComponent(sceneId || this.sceneId, component, options)
        this.dialogRoot.dialogVisible = true
        return this
    }

    pop(extra) {
        this.dialogRoot.pop(extra)
        return this
    }

    close(extra) {
        this.dialogRoot.close(extra)
        return this
    }

    /**
     * 设置 component 被替换掉的回调
     * @param callback
     * @param sceneId {int?} 场景id，用于区分连续弹框时场景划分
     * @return {Dialog}
     */
    onDisappear(callback, sceneId) {
        this.dialogRoot.setCallbackOnDisappear(sceneId || this.sceneId, callback)
        return this
    }

    /**
     * 设置dialog关闭的回调
     * @param callback
     * @param sceneId {int?} 场景id，用于区分连续弹框时场景划分
     * @return {Dialog}
     */
    onClose(callback, sceneId) {
        this.dialogRoot.setCallbackOnClose(sceneId || this.sceneId, callback)
        return this
    }

    /**
     * 设置 el-create-contract 的选项
     * @param config
     * @param sceneId {int?} 场景id，用于区分连续弹框时场景划分
     * @return {Dialog}
     */
    config(config, sceneId) {
        this.dialogRoot.setDialogOptions(sceneId || this.sceneId, config)
        return this
    }

    /**
     * 设置关闭回调时传入的数据
     * @param data
     * @param sceneId {int?} 场景id，用于区分连续弹框时场景划分
     */
    extraToClose(data, sceneId) {
        this.dialogRoot.setExtraToClose(sceneId || this.sceneId, data)
        return this
    }


    /**
     * 修改当前弹框的dialog options
     * @param config
     */
    overCurrentDialogOptions(config) {
        this.dialogRoot.overCurrentDialogOptions(config)
        return this
    }

    initDialog(instanceOptions) {
        // 创建实例，并挂载到一个元素上。
        const DialogRoot = this.Vue.extend(DialogOptions)
        const root = new DialogRoot({
            ...instanceOptions,
            propsData: {
                pluginOptions: this.pluginOptions,
            },
        }).$mount()
        document.querySelector('body').appendChild(root.$el)

        return root
    }
}