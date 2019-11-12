import Vue from 'vue'
import Routers from './routers.json'

// eslint-disable-next-line no-unused-vars
Object.entries(Routers).forEach(([key, value]) => {
    Vue.component(
        value,
        () => import(`packages/${value}`)
    )
})