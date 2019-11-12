import Controller from './controller.js'
import './style.css'

export default {
    install(Vue) {
        const controller = new Controller(Vue)
        /**
         * 显示全局通知
         * 不传入 notifyId，自动拉取最新可以显示的数据，显示出来
         * @param notifyId {string} 仅显示 notifyId 的数据，无论是否下架
         */
        Vue.prototype.$displayNotify = (notifyId) => {
            controller.displayNotifyView(notifyId)
        }
    },
}