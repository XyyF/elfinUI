import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '', redirect: {name: RouteNamesChain.ComplexRow}},
        {
            path: '/complexRow',
            name: RouteNamesChain.ComplexRow,
            component: () => import(/* webpackChunkName: "complexRow" */ './docs/complex-row/index.md'),
        },
    ],
})