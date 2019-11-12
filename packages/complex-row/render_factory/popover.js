import Render from './_render'

export default class ButtonRender extends Render {
    render() {
        const {title, buttonConfig, popoverConfig} = this.config
        const {contentSlot, ...options} = popoverConfig
        buttonConfig.slot = 'reference'

        this.appendClass(options, Render.DefaultClassName)
        this.appendClass(options, 'render-popover')

        return this.h(
            'el-popover',
            {...options},
            [
                this.h(contentSlot.dom, contentSlot.options),
                this.h('el-button', {...buttonConfig}, title),
            ],
        )
    }
}