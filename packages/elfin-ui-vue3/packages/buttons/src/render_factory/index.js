import ItemType from '../item-type';
import ButtonRender from './button';
import CheckboxRender from './checkbox';
import BadgeRender from './badge';

const renderMap = {
    [ItemType.BUTTON]: ButtonRender,
    [ItemType.CHECKBOX]: CheckboxRender,
    [ItemType.BADGE]: BadgeRender,
};

// 渲染render
function render(formItemConfig) {
    const Render = renderMap[formItemConfig.type];
    if (!Render) throw new Error(`不存在的类型: ${formItemConfig.type}`);
    return new Render(formItemConfig).render();
}

export default {
    render,
};
