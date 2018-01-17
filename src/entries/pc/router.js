import VueRouter from 'vue-router';

/**
 * 深度链接query参数说明：
 * {string} tab_section 进入页面后让header_tab切换到指定页面。取值为utils/enums中的各xxxSectionEnum值
 * {string} page 页面中表格的页码，从1开始
 * {string} search 进入页面后立即搜索该字符串
 * {string} dlg 进入页面后立即弹出窗口。取值为dialog_type
 * {string} data_id 进入页面后立即展开表格的某一行数据。具体解析方式由对应页面的index.vue文件决定
 * {string} sub_page 进入页面后立即展开表格的某一行数据后要进入的子页面。取值为utils/enums中的各xxxSubPage值
 * {string} filter_xxx 进入页面后对表格的xxx列设置筛选项。具体解析方式由对应页面的index.vue文件决定
 * {string} op 进入页面后立即执行点击某按钮的行为。取值由对应页面的index.vue文件决定
 */

// 注释里的是分块js名，加workbench_前缀是为避免和某个入口或chunk同名，否则会无法运行
const page404 = r => import(/* webpackChunkName: "workbench_404" */'./pages/404.vue').then(r)
const indexPage = r => import(/* webpackChunkName: "workbench_index" */'./pages/main/index.vue').then(r)
const workbench = r => import(/* webpackChunkName: "workbench_index" */'./pages/workbench/index.vue').then(r)
const components = r => import(/* webpackChunkName: "workbench_index" */'./pages/components/index.vue').then(r)
const calendar = r => import(/* webpackChunkName: "workbench_index" */'./pages/components/calendar/index.vue').then(r)
const avatarList = r => import(/* webpackChunkName: "workbench_index" */'./pages/components/avatar_list/index.vue').then(r)

// 定义路由映射。 其中"component" 可以是通过 Vue.extend() 创建的组件构造器，或者组件配置对象
const routes = [
    {path: '', redirect: {name: 'components'}},
    {
        path: '/admin',
        component: indexPage,
        name: 'index',
        children: [
            // topMenu的走向
            {path: '', redirect: {name: 'components'}},
            {
                path: 'components',
                name: 'components',
                component: components,
                children: [
                    // sideMenu的走向
                    {path: '', redirect: {name: 'avatarList'}},
                    {path: 'avatarList', name: 'avatarList', component: avatarList},
                    {path: 'calendar', name: 'calendar', component: calendar},
                ],
            },
            {path: 'workbench', component: workbench, name: 'workbench'},
        ]
    },
    // 必须放最后
    {path: '/admin/*', component: page404, meta: {}},
]

// 创建 router 实例
const router = new VueRouter({
    // 不使用hash模式，用/连接各级路径，需要在服务端进行相关配置
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return {x: 0, y: 0}
    },
})

router.beforeEach((to, from, next) => {
    console.log(`${from.fullPath} -> ${to.fullPath}`);
    if (to.path.endsWith('/') && to.path !== '/') {
        // /admin/room 和 /admin/room/ 都指向同一个页面
        next({
            path: to.path.substring(0, to.path.length - 1),
            query: to.query
        })
    }
    next();
});

export default router;
