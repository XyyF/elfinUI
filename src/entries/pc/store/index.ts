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
        routeName: 'avatarList'
    }],
    sideMenu: [{
        id: SideMenuEnum.PC,
        name: 'pc端',
        childItems: [{
            id: SideMenuEnum.AVATAR_LIST,
            name: '头像列表',
            routeName: 'avatarList',
        }, {
            id: SideMenuEnum.WATER_MARK,
            name: '水位标志',
            routeName: 'waterMark',
        }, {
            id: SideMenuEnum.FORM,
            name: '表单',
            routeName: 'form',
        }, {
            id: SideMenuEnum.MULTIPLE_BOX,
            name: '远程搜索',
            routeName: 'multipleBox',
        }],
    }, {
        id: SideMenuEnum.MOBILE,
        name: 'mobile端',
        childItems: [{
            id: SideMenuEnum.CALENDAR,
            name: '日历',
            routeName: 'calendar',
        }],
    }],
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {}
})


// todo 热更新同步
/* // 热更新
if (module.hot) {
    module.hot.accept([
        // state不支持热更新
        './getters.ts',
        './actions.ts',
        './mutations.ts',
    ], () => {
        store.hotUpdate({
            // 获取更新后的模块。因为 babel 6 的模块编译格式问题，这里需要加上 .default
            getters: require('./getters.ts').default,
            actions: require('./actions.ts').default,
            mutations: require('./mutations.ts').default
        })
    })
} */

export default store
