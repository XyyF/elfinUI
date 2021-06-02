import Preview from './preview';

export default {
    install(Vue) {
        // 添加实例上的引用
        Object.defineProperty(Vue.prototype, '$previewImages', {
            get() {
                const preview = new Preview();
                return preview.show.bind(preview, Vue);
            },
            set() {
                throw new Error('disallow modify $create-contract');
            },
        });
    },
};
