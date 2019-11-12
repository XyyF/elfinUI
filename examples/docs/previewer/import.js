import Vue from 'vue'
import Previewer from 'packages/previewer/index.js'
import assets1 from './assets/assets1.jpg'
import assets2 from './assets/assets2.jpg'
import assets3 from './assets/assets3.jpg'

Vue.use(Previewer)

export default {
    methods: {
        previewerImages() {
            this.$previewImages([assets1, assets2, assets3], 0)
        }
    }
}