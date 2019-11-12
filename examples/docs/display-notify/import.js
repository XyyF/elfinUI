import Vue from 'vue'
import DisplayNotify from 'packages/display-notify/index.js'

Vue.use(DisplayNotify)

export default {
    methods: {
        displayNotify() {
            this.$displayNotify()
        }
    }
}