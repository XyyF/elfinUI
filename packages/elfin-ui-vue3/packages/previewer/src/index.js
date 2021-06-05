import Preview from './preview';

export default {
    install(app, options) {
        // 添加实例上的引用
        Object.defineProperty(app.config.globalProperties, '$previewImages', {
            get() {
                const preview = new Preview();
                return preview.show.bind(preview, app);
            },
            set() {
                throw new Error('disallow modify $create-contract');
            },
        });
    },
};
