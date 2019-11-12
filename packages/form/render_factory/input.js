/**
 * Created by gukong on 2018/4/15.
 */
import Render from './render'

export default class SwitchRender extends Render {
    render() {
        const defaultProps = {
            placeholder: '请输入内容',
        }
        // this.options 可能没有props
        const options = Object.assign({props:{}}, this.options)
        Object.assign(options.props, defaultProps)
        const slots = this.options.slots || (() => [])

        return this.h('el-input', options, slots(this.h))
    }
}