import formItemType from '../item-type'
import ButtonRender from './button'
import PopoverRender from './popover'
import DatePicker from './date-picker'
import Checkbox from './checkbox'
import Link from './link'
import Badge from './badge'
import Select from './select'
import Component from './component'

const renderMap = {
    [formItemType.BUTTON]: ButtonRender,
    [formItemType.POPOVER]: PopoverRender,
    [formItemType.DATE_PICKER]: DatePicker,
    [formItemType.CHECKBOX]: Checkbox,
    [formItemType.LINK]: Link,
    [formItemType.BADGE]: Badge,
    [formItemType.SELECT]: Select,
    [formItemType.COMPONENT]: Component,
}

// 渲染render
function render(h, formItemConfig) {
    const Render = renderMap[formItemConfig.type]
    if (!Render) throw new Error(`不存在的类型: ${formItemConfig.type}`)
    return new Render(h, formItemConfig).render()
}

export default {
    render,
}