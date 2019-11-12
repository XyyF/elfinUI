/**
 * Created by gukong on 2018/4/15.
 */
import Render from './render'

export default class TextareaRender extends Render {
    render() {
        Object.assign(this.options.props, {type: 'textarea', resize: 'none'})
        return this.h('el-input', this.options)
    }
}