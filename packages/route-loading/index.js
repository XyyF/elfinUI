import Loading from './loading'
import './style.css'

export default {
    install(Vue) {
        const loading = new Loading(Vue)
        Vue.showRouteLoading = () => {
            loading.show()
        }
        Vue.closeRouteLoading = () => {
            loading.close()
        }
    },
}