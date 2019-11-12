import Render from './render'

export default class SwitchRender extends Render {
    render() {
        return this.h('el-switch', this.options)
    }
}