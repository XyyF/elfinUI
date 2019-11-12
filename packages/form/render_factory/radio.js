import Render from './render'

export default class RadioRender extends Render {
    render() {
        const radios = this.options.options // [{type: 'button', label: '', value: ''}]
        if (!radios) return null

        const optionDoms = radios.map(item => {
            let radioDom = 'el-radio'
            if (item.type === 'button') {
                radioDom = 'el-radio-button'
            }
            return this.h(radioDom, {
                props: {
                    label: item.value,
                    disabled: item.disabled,
                },
            }, item.label)
        })
        return this.h('el-radio-group', this.options, optionDoms)
    }
}