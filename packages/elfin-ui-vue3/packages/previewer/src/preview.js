import { h, defineAsyncComponent, createApp } from 'vue';

export default class Preview {
    constructor() {
        this.preInstance = null;
    }

    async initView(app) {
        // 动态加载组件
        const PreviewerComponent = defineAsyncComponent(() =>
            import('./previewer.vue'/* webpackChunkName: "elfin_previewer" */)
        )
        // 构造器
        const Previewer = createApp({
            components: {
                PreviewerComponent
              },
            data() {
                return {
                    imageList: [],
                    options: {},
                };
            },
            mounted() {
                console.log(111, this.$refs, this)
            },
            methods: {
                show(picIndex) {
                    // 等待组件数据update后，再预览
                    this.$nextTick(() => {
                        this.$refs.previewer.show(picIndex);
                    });
                },
            },
            render() {
                return h(PreviewerComponent, {
                    ref: 'previewer',
                    list: this.imageList,
                    options: this.options,
                });
            },
        });
        // 实例化组件
        this.preInstance = Previewer.mount(document.createElement('div'));
    }

    async show(app, images = [], picIndex = 0, options) {
        // 只在第一次的时候去动态加载实例
        if (!this.preInstance) {
            // TODO: loading状态
            await this.initView(app);
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
