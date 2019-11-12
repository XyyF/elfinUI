import Render from './_render'

export default class BadgeRender extends Render {
    render() {
        const {contentSlot, ...options} = this.config

        this.appendClass(options, Render.DefaultClassName)
        this.appendClass(contentSlot.options, 'badge-slot')
        return this.h(
            'el-badge',
            {...options},
            [
                this.h(contentSlot.dom, {...contentSlot.options}),
            ],
        )
    }
}