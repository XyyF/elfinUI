import ItemType from '../item-type'
import ButtonRender from './button'

const renderMap = {
    [ItemType.BUTTON]: ButtonRender,
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