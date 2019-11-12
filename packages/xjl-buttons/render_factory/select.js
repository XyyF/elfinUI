import Render from './_render'
import _ from 'lodash'

export default class ButtonRender extends Render {
    render() {
        const {...options} = this.config

        const key = _.get(this.options, 'props["value-key"]', '') || _.get(this.options, 'props.valueKey', '')
        const optionsDom = options.compOptions.options.map((item) => {

            return this.h('el-option',
                {
                    key: item.value || key,
                    props: {...item},
                })
        })

        return this.h('el-select', {
            ...options,
            props: {
                value: this.delegate.value[options.props],
                ...options.compOptions.props,
            },
            on: {
                input: (val) => {
                    this.delegate.updateSelection(options.props, val)
                },
            },
        }, optionsDom)
    }
}