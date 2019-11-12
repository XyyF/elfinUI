/**
 * Created by gukong on 2018/4/15.
 */
import Render from './render'

export default class PureTextRender extends Render {
    render() {
        return this.h('div', this.options, this.options.label)
    }
}