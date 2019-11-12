import formItemType from '../item-type'
import SwitchRender from './switch'
import InputRender from './input'
import IextareaRender from './textarea'
import InputNumberRender from './input-number'
import SelectRender from './select'
import DateRender from './date'
import RadioRender from './radio'
import UploadImageRender from './upload-image'
import ComponentRender from './component'
import CheckBoxRender from './check-box'
import TextareaPlus from './textarea-plus'
import PureTextRender from './pure-text'

const renderMap = {
    [formItemType.SWITCH]: SwitchRender,
    [formItemType.INPUT]: InputRender,
    [formItemType.SELECTION]: SelectRender,
    [formItemType.DATE]: DateRender,
    [formItemType.NUMBER]: InputNumberRender,
    [formItemType.TEXTAREA]: IextareaRender,
    [formItemType.RADIO]: RadioRender,
    [formItemType.UPLOAD_IMAGE]: UploadImageRender,
    [formItemType.COMPONENT]: ComponentRender,
    [formItemType.CHECKBOX]: CheckBoxRender,
    [formItemType.TEXTAREA_PLUS]: TextareaPlus,
    // 纯文本
    [formItemType.PURE_TEXT]: PureTextRender,
}

function render(h, delegate, formItemConfig) {
    const Render = renderMap[formItemConfig.type]
    return new Render(h, delegate, formItemConfig).render()
}

export default {
    render,
}