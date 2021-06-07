import Preview from './preview';

export default {
    install(app) {
        let preview = null;
        // 添加实例上的引用
        Object.defineProperty(app.config.globalProperties, '$previewImages', {
            get() {
                if (!preview) {
                    preview = new Preview();
                }
                return preview.show.bind(preview);
            },
            set() {
                throw new Error('disallow modify $create-contract');
            },
        });
    },
};
