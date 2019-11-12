import LoadingManager from '@external/edu-saas-utils/loading_manager'

export default class Preview {
    constructor(Vue) {
        this.Vue = Vue
        this.preInstance = null
    }

    async initView() {
        // 动态加载组件
        const PreviewerComponent = await import('./previewer.vue'/* webpackChunkName: "pc_workbench_previewer" */)
        //         // 构造器
        const Previewer = this.Vue.extend({
            data() {
                return {
                    imageList: [],
                    options: {}
                }
            },
            methods: {
                show(picIndex) {
                    // 等待组件数据update后，再预览
                    this.$nextTick(() => {
                        this.$refs.previewer.show(picIndex)
                    })
                }
            },
            render(h) {
                return h(PreviewerComponent.default, {
                    ref: 'previewer',
                    props: {
                        list: this.imageList,
                        options: this.options,
                    }
                })
            }
        })
        // 实例化组件
        this.preInstance = new Previewer().$mount()
    }

    async show(images = [], picIndex = 0, options) {
        // 只在第一次的时候去动态加载实例
        if (!this.preInstance) {
            LoadingManager.showLoading('#app')
            await this.initView()
            // 挂载dom
            document.querySelector('body').appendChild(this.preInstance.$el)
            LoadingManager.hideLoading('#app')
        }
        // 图片列表
        this.preInstance.imageList = images
        // 配置参数
        if (options) {
            this.preInstance.options = options
        }
        // 展示图片
        this.preInstance.show(picIndex)
    }
}