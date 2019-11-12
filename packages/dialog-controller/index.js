/**
 * Created by gukong on 2019/1/11.
 */

import Dialog from './dialog'

export default {
    /**
	 * 注册dialog
     * @param Vue Vue实例
     * @param options 注入new Dialog()实例的配置项
     * @param instanceOptions 实例化dialog的选项，如router
     */
	install(Vue, options, instanceOptions) {
		const dialog = new Dialog(Vue, options, instanceOptions)
		Object.defineProperty(Vue.prototype, '$dialog', {
			get() {
				dialog.sceneId++
				return dialog
			},
			set() {
                throw new Error('disallow modify $create-contract')
			}
		})
	}
}