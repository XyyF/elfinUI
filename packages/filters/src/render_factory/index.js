import ItemType from '../item-type'
import SelectRender from './select'
import dateRange from './date-range'
import date from './date'

const renderMap = {
    [ItemType.DATE]: date,
    [ItemType.SELECT]: SelectRender,
    [ItemType.DATE_RANGE]: dateRange,
}

// render工厂
function render(h, renderOptions, vmodel, row, itemType) {
    const Render = renderMap[itemType].render
    if (!Render) throw new Error(`不存在的类型: ${itemType}`)
    return Render(h, renderOptions, vmodel, row)
}

// 格式化方法
function formater(itemType) {
    const render = renderMap[itemType]
    if (!render) throw new Error(`不存在的类型: ${itemType}`)
    return render.formater
}

export default {
    render,
    formater,
}