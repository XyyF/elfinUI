import Render from './_render'

export default class ButtonRender extends Render {
    render() {
        const {title, ...options} = this.config

        this.appendClass(options, Render.DefaultClassName)
        this.appendClass(options, 'render-checkbox')

        return this.h('el-checkbox', {...options}, title)
    }
}