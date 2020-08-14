import Render from './_render'

export default class ButtonRender extends Render {
    render() {
        const {itemOptions = {}} = this.config
        // 获取 defaultSlot
        // tips: el-button未实现 作用域插槽ScopedSlots
        const defaultSlot = this.getRenderSlot()

        return this.h('el-button', {...itemOptions}, defaultSlot(this.h))
    }
}