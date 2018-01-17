import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import { SideMenuEnum } from '../js/enums'

Vue.use(Vuex)

// initial state
const state = {
    topMenu: [{
        id: SideMenuEnum.COMPONENTS,
        name: '组件',
        routeName: 'components'
    }],
    sideMenu: [{
        id: SideMenuEnum.PC,
        name: 'pc端',
        childItems: [{
            id: SideMenuEnum.AVATAR_LIST,
            name: '头像列表',
            routeName: 'avatarList',
            unread: 0,
        }],
    }, {
        id: SideMenuEnum.MOBILE,
        name: 'mobile端',
        childItems: [{
            id: SideMenuEnum.CALENDAR,
            name: '日历',
            routeName: 'calendar',
            unread: 0,
        }],
    }],
}

const store = new Vuex.Store({
    strict: window.devEnv,
    state,
    getters,
    actions,
    mutations,
    modules: {}
})

// 热更新
if (module.hot) {
    module.hot.accept([
        // state不支持热更新
        './getters',
        './actions',
        './mutations',
    ], () => {
        store.hotUpdate({
            // 获取更新后的模块。因为 babel 6 的模块编译格式问题，这里需要加上 .default
            getters: require('./getters').default,
            actions: require('./actions').default,
            mutations: require('./mutations').default
        })
    })
}

export default store
