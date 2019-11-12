import Vue from 'vue'
import 'highlight.js/styles/color-brewer.css'
import './plugins/element.js' // 600kb
import './plugins/external-lib-config.js' // 200kb
import './plugins/handle-error.js'
import App from './App.vue'
import router from './router'
import ComponentDemo from './components/component-demo.vue'

Vue.component('component-demo', ComponentDemo)
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
