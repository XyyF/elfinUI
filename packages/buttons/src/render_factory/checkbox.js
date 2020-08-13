import Render from './_render'

export default class CheckBoxRender extends Render {
    render() {
        const {itemOptions = {}} = this.config
        // 获取 defaultSlot
        const defaultSlot = this.getScopedSlotsByName()

        return this.h('el-checkbox', {...itemOptions}, defaultSlot(this.h))
    }
}