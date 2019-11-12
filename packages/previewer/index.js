import Preview from './preview'

export default {
     install(Vue) {
        const preview = new Preview(Vue)
        // todo
        Vue.prototype.$previewImages =  (images, picIndex, options) => {
            // todo
            preview.show(images, picIndex, options)
        }
    },
}