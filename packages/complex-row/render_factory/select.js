import Render from './_render'
import _ from 'lodash'

export default class SelectRender extends Render {
    // 渲染el-select
    renderSelect() {
        const {props, on, ...options} = this.config
        return this.h('el-select', {
            ...options,
            props,
            on,
        }, this.renderOptions())
    }

    // 渲染el-option
    renderOptions() {
        const config = this.config
        const key = _.get(config, 'props["value-key"]', '') || _.get(config, 'props.valueKey', '')

        return config.compOptions.options.map((item) => {
            return this.h('el-option',
                {
                    // 如果指定了value-key的话，需要取对应的值作为key
                    key: key ? item.value[key] : item.value,
                    props: {...item},
                })
        })
    }

    render() {
        return this.renderSelect()
    }
}