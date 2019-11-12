import Render from './_render'

export default class ButtonRender extends Render {
    render() {
        const {title, ...options} = this.config
        this.appendClass(options, Render.DefaultClassName)
        return this.h('el-button', {...options}, title)
    }
}