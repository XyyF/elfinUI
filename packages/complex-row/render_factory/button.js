import Render from './_render'

export default class ButtonRender extends Render {
    renderSlot(scopedSlots) {
        if (scopedSlots && scopedSlots.default) {
            return [scopedSlots.default(this.h, this.config)]
        }
        return null
    }

    render() {
        const {scopedSlots, ...options} = this.config.itemOptions || {}

        this.appendClass(options, Render.DefaultClassName)

        return this.h('el-button', {...options}, this.renderSlot(scopedSlots))
    }
}