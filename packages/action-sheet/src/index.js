/**
 * Created by rengar on 2020/9/1.
 */
import Vue from 'vue'
import {ActionSheet} from 'vant'
import 'vant/lib/action-sheet/style'

export default {
    install(Vue) {
        let sheet = null
        // 添加实例上的引用
        Object.defineProperty(Vue.prototype, '$actionSheet', {
            get() {
                if (!sheet) {
                    // 在第一次调用时进行初始化
                    sheet = new ActionSheetClass()
                }
                return sheet.open.bind(sheet)
            },
            set() {
                throw new Error('disallow modify $create-contract')
            },
        })
    },
}

const actionSheetOptions = {
    name: 'action-sheet-wrapper',
    components: {
        VanActionSheet: ActionSheet,
    },
    template: `
        <van-action-sheet
            v-model="show"
            v-bind="config.props"
            v-on="config.on"
            style="outline: 1000px solid rgba(0,0,0,.7);">
        </van-action-sheet>
    `,
    data() {
        return {
            config: {},
            show: false,
        }
    },
    methods: {
        openSheet(options) {
            this.config = options
            this.show = true
        },
    },
}

class ActionSheetClass {
    constructor() {
        this.actionSheetRoot = this.init()
    }

    /**
     * 打开 actionSheet
     * @param options 传入配置
     */
    open(options) {
        this.actionSheetRoot.openSheet(options)
    }

    /**
     * 初始化 actionSheet实例对象
     * @return {*}
     */
    init() {
        // 创建 Vue的继承实例
        const InstanceRoot = Vue.extend(actionSheetOptions)
        // 初始化
        const root = new InstanceRoot().$mount()
        // 挂载
        document.querySelector('body').appendChild(root.$el)
        return root
    }
}