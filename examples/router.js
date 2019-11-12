import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/complexRow',
            name: 'complexRow',
            component: () => import(/* webpackChunkName: "complexRow" */ './docs/complex-row/index.md'),
        },
    ]
});
