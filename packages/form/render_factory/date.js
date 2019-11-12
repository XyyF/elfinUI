/**
 * Created by gukong on 2018/4/15.
 */
import Render from './render'

export default class DateRender extends Render {
    render() {
        return this.h('el-date-picker', this.options)
    }
}