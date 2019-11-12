import Vue from 'vue'
import RouteLoading from 'packages/route-loading/index.js'

Vue.use(RouteLoading)

export default {
    methods: {
        showRouteLoading() {
            Vue.showRouteLoading()
        },
        closeRouteLoading() {
            Vue.closeRouteLoading()
        },
    }
}