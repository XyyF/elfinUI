/**
 * Created by gukong on 2019/1/11.
 */

import SidePopup from './side-popup'

export default {
    /**
	 * 注册sidePopup
     * @param Vue Vue实例
     * @param options 注入new SidePopup()实例的配置项
     * @param instanceOptions 实例化sidePopup的选项，如router
     */
	install(Vue, options, instanceOptions) {
		const sidePopup = new SidePopup(Vue, options, instanceOptions)
		Object.defineProperty(Vue.prototype, '$sidePopup', {
			get() {
				sidePopup.sceneId++
				return sidePopup
			},
			set() {
                throw new Error('disallow modify $create-contract')
			}
		})
	}
}