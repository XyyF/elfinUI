/**
 * Created by gukong on 2018/4/15.
 */
import _ from 'lodash'
import Render from './render'

export default class SelectRender extends Render {
    render() {
        const sectionOptions = this.options.options
        if (!sectionOptions) return null
        const key = _.get(this.options, 'props["value-key"]', '') || _.get(this.options, 'props.valueKey', '')

        const optionDoms = sectionOptions.map(item => this.h('el-option', {
            key: (key && item.value[key]) || item.value,
            props: {...item},
        }))
        return this.h('el-select', this.options, optionDoms)
    }
}