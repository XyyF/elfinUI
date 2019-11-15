import Render from './_render'

export default class ButtonRender extends Render {
    // 渲染slot
    renderSlot(scopedSlots) {
        if (scopedSlots && scopedSlots.default) {
            return [scopedSlots.default(this.h, this.config)]
        }
        return null
    }

    render() {
        const {scopedSlots, ...options} = this.config.itemOptions || {}
        // 添加指定的class
        this.appendClass(options, 'complex-row__button')

        return this.h('el-button', {...options}, this.renderSlot(scopedSlots))
    }
}