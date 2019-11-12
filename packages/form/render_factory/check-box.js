import Render from './render'

export default class CheckBoxRender extends Render {
    render() {
        return this.h('el-checkbox', this.options)
    }
}