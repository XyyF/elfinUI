import Render from './_render'

export default class ButtonRender extends Render {
    render() {
        const {...options} = this.config
        this.appendClass(options, Render.DefaultClassName)
        this.appendClass(options, 'render-date')

        return this.h('el-date-picker', {...options})
    }
}