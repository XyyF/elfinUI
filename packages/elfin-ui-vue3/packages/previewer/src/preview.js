import { h, defineAsyncComponent, createVNode, ref, render } from 'vue';

export default class Preview {
    constructor() {
        this.preInstance = null;
    }

    initView(CImages, CPicIndex, COptions) {
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
                const images = ref(CImages);
                const picIndex = ref(CPicIndex);
                const options = ref(COptions);
                // 等待异步组件初始化完成
                const onInit = () => {
                    previewerRef.value.show(picIndex.value);
                };
                // 对外暴露的接口
                function showPreviewer(TImages = [], TPicIndex = 0, TOptions) {
                    images.value = TImages;
                    options.value = TOptions;
                    previewerRef.value.show(TPicIndex);
                }

                return {
                    images,
                    options,
                    picIndex,
                    previewerRef,
                    onInit,
                    showPreviewer,
                };
            },
            render() {
                return h(PreviewerComponentAsync, {
                    ref: 'previewerRef',
                    list: this.images,
                    index: this.picIndex,
                    options: this.options,
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
        // 展示图片
        this.preInstance.showPreviewer(images, picIndex, options);
    }
}
