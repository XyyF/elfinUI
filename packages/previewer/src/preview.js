export default class Preview {
    constructor() {
        this.preInstance = null;
    }

    async initView(Vue) {
        // 动态加载组件
        const PreviewerComponent = await import('./previewer.vue'/* webpackChunkName: "elfin_previewer" */);
        // 构造器
        const Previewer = Vue.extend({
            data() {
                return {
                    imageList: [],
                    options: {},
                };
            },
            methods: {
                show(picIndex) {
                    // 等待组件数据update后，再预览
                    this.$nextTick(() => {
                        this.$refs.previewer.show(picIndex);
                    });
                },
            },
            render(h) {
                return h(PreviewerComponent.default, {
                    ref: 'previewer',
                    props: {
                        list: this.imageList,
                        options: this.options,
                    },
                });
            },
        });
        // 实例化组件
        this.preInstance = new Previewer().$mount();
    }

    async show(Vue, images = [], picIndex = 0, options) {
        // 只在第一次的时候去动态加载实例
        if (!this.preInstance) {
            // TODO: loading状态
            await this.initView(Vue);
            // 挂载dom
            document.querySelector('body').appendChild(this.preInstance.$el);
        }
        // 图片列表
        this.preInstance.imageList = images;
        // 配置参数
        if (options) {
            this.preInstance.options = options;
        }
        // 展示图片
        this.preInstance.show(picIndex);
    }
}
