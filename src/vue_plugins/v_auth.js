import authority from 'common/authority'

/**
 * 权限校验用的工具。初始化后会让每个Vue实例带上一个$checkAuth方法，传入权限返回boolean
 * 另外带有一个v-auth指令，可以在具备某权限时才显示指令所在的元素
 *
 * 初始化方法如下:
 * import VueWX from 'vue_plugins/v_auth'
 * Vue.use(vAuth, {store, authoritiesGetterPath:'account/myAuthorities'});
 * {object} store Vuex实例，需要在它上面获取权限列表
 * {string} authoritiesGetterPath 获取权限列表时的getters路径
 */
export default {
    install(Vue, options) {
        if (!options.store || !options.authoritiesGetterPath) {
            console.error('没有设置权限列表')
        }

        /**
         * 校验是否具有指定权限用的指令，若没有权限则向所在元素添加一个v-no-auth属性。支持传入权限码、权限名或权限信息对象
         * 注意v-no-auth标签的样式需要自己实现
         * 注意需要在vuex的account模块中写一个名为checkAuth的getter，值为检查是否具有指定权限的方法
         *
         * @example
         * <div v-auth="20003"></div>
         * <div v-auth="'COURSE_EDIT'"></div>
         */
        Vue.directive('auth', (el, binding) => {
            const authCode = binding.value
            if (checkAuth(authCode)) {
                el.removeAttribute('v-no-auth')
            } else {
                // 没有权限
                el.setAttribute('v-no-auth', authCode)
            }
        })

        // 添加静态引用
        Vue.checkAuth = checkAuth

        // 添加实例上的引用
        Vue.prototype.$checkAuth = checkAuth

        /**
         * 检查当前账号是否具有某权限的方法
         *
         * @param {number|string|object|array} authCode 权限码、权限名或权限信息对象。若传进来的是数组，则具有其中之前就返回true
         * @return {boolean} 是否具有该权限
         */
        function checkAuth(authCode) {
            // 用的时候再取值
            const authorities = options.store.getters[options.authoritiesGetterPath]
            return checkAuthFunction(authorities, authCode)
        }
    }
}

/**
 * 检查是否具有指定权限
 * @param {[number]} authorities 权限code列表
 * @param {number|string|object|array} authCode 权限码、权限名或权限信息对象。若传进来的是数组，则具有其中之一就返回true
 * @return {boolean} 是否具有该权限
 */
function checkAuthFunction(authorities, authCode) {
    if (!authCode) {
        // 没有权限码，表示不需要权限
        return true
    } else if (Array.isArray(authCode)) {
        return authCode.some(item => checkAuthFunction(authorities, item))
    } else if (typeof authCode === 'string') {
        if (!(authCode in authority.detail)) {
            console.error('Unknown authority code:', authCode)
            return false
        }
        authCode = authority.detail[authCode].code
    } else if (typeof authCode === 'object') {
        if (!authCode.code) {
            console.error('Unknown authority code:', authCode)
            return false
        }
        authCode = authCode.code
    }
    return authorities.includes(authCode)
}
