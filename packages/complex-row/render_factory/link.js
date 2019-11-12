import Render from './_render'

export default class ButtonRender extends Render {
    render() {
        const {title, ...options} = this.config
        return this.h(
            'router-link',
            {...options},
            [this.h('el-button', {props: {type: 'text'}}, title)],
        )
    }
}