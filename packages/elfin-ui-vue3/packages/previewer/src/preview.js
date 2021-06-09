import { h, defineAsyncComponent, createVNode, ref, render, nextTick } from 'vue';

export default class Preview {
    constructor() {
        this.preInstance = null;
    }

    initView() {
        // 动态加载异步组件
        // TODO: loading状态
        const PreviewerComponentAsync = defineAsyncComponent(() =>
            import('./previewer.vue'/* webpackChunkName: "elfin_previewer" */)
        )
        // 容器
        const container = document.createElement('div');
        container.className = 'container_previewer';

        // Vnode
        const PreviewerComponent = {
            components: {
                PreviewerComponentAsync,
            },
            setup() {
                const isShow = ref(false); // 是否显示
                const images = ref([]); // 图片列表
                const picIndex = ref(0); // 下标
                const options = ref({}); // 选项
                const onClose = () => {
                    isShow.value = false;
                };
                // 对外暴露的接口
                function showPreviewer(TImages = [], TPicIndex = 0, TOptions) {
                    images.value = TImages;
                    picIndex.value = TPicIndex;
                    options.value = TOptions;
                    // 等待参数更新
                    nextTick(() => {
                        isShow.value = true;
                    });
                }

                return {
                    isShow,
                    images,
                    picIndex,
                    options,
                    onClose,
                    showPreviewer,
                };
            },
            render() {
                return h(PreviewerComponentAsync, {
                    isShow: this.isShow,
                    list: this.images,
                    index: this.picIndex,
                    options: this.options,
                    onClose: this.onClose,
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
            this.initView();
        }
        // 在初始化是后续，展示图片
        this.preInstance.showPreviewer(images, picIndex, options);
    }
}
