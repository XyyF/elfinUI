/**
 * Created by gukong on 2018/4/15.
 */
import Render from './render'

export default class InputNumberRender extends Render {
    render() {
        return this.h('el-input-number', this.options)
    }
}