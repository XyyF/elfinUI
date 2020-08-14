import Render from './_render'

export default class BadgeRender extends Render {
    render() {
        const {itemOptions = {}} = this.config
        // 获取 defaultSlot
        const defaultSlot = this.getRenderSlot()

        return this.h('el-badge', {...itemOptions}, defaultSlot(this.h))
    }
}