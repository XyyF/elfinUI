/**
 * Created by gukong on 2018/4/16.
 */
import {getPropByPath} from '../utils'

export default class Render {
    constructor(h, delegate, config) {
        const props = {
            value: getPropByPath(delegate.value, config.prop).v
        }
        const on = {
            input: (val) => {
                delegate.updateValue(config.prop, val)
            }
        }
        const compOptions = config.compOptions || {}
        this.component = config.component
        this.options = {
            ...compOptions,
            props: Object.assign({}, compOptions.props, props),
            on: Object.assign({}, compOptions.on, on),
        }
        this.h = h
        this.component = config.component
    }
    render() {
        console.log('need override')
    }
}