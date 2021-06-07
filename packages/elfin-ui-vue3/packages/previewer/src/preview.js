import { h, defineAsyncComponent, createVNode, ref, render } from 'vue';

export default class Preview {
    constructor() {
        this.preInstance = null;
    }

    initView(images, picIndex, options) {
        // 动态加载组件
        const PreviewerComponentAsync = defineAsyncComponent(() =>
            import('./previewer.vue'/* webpackChunkName: "elfin_previewer" */)
        )
        // 容器
        const container = document.createElement('div');
        container.className = `container_previewer`;

        // Vnode
        const PreviewerComponent = {
            components: {
                PreviewerComponentAsync,
            },
            setup() {
                const previewerRef = ref();
                // 等待异步组件初始化完成
                const onInit = () => {
                    showPreviewer(picIndex);
                };
                // 对外暴露的接口
                function showPreviewer(picIndex) {
                    previewerRef.value.show(picIndex);
                }

                return {
                    previewerRef,
                    onInit,
                    showPreviewer,
                };
            },
            render() {
                return h(PreviewerComponentAsync, {
                    ref: 'previewerRef',
                    list: images,
                    index: picIndex,
                    options,
                    onInit: this.onInit,
                });
            },
        };
        const vm = createVNode(PreviewerComponent);

        // 渲染真实节点
        render(vm, container);
        // 挂载dom TODO firstElementChild
        document.body.appendChild(container);
        this.preInstance = vm.component.proxy;
    }

    show(images = [], picIndex = 0, options) {
        // 只在第一次的时候去动态加载实例
        if (!this.preInstance) {
            // TODO: loading状态
            this.initView(images, picIndex, options);
            return;
        }
        // 图片列表
        this.preInstance.imageList = images;
        // 配置参数
        if (options) {
            this.preInstance.options = options;
        }
        // 展示图片
        this.preInstance.showPreviewer(picIndex);
    }
}
