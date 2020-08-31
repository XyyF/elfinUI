/**
 * Created by rengar on 2020/08/29.
 */
import './styles/select.css'

/**
 * 使用示例
 {
        prop: 'category',
        label: '类型:',
        render: ElfinItemType.SELECT,
        renderOptions: {
            props: {
                placeholder: '请选择物品类型',
                clearable: true,
            },
        },
        extra: {
            options: [],
        },
    }
 * @param h
 * @param renderOptions
 * @param vmodel
 * @param row
 */
export function renderSelect(h, renderOptions, vmodel, {extra}) {
    const selectOptions = {
        class: 'elfin-filters__select',
        props: Object.assign(
            {clearable: true},
            // 覆盖clearable
            renderOptions.props,
            // 覆盖 value
            vmodel.props,
        ),
        on: Object.assign(
            {},
            renderOptions.on,
            // 覆盖 input事件
            vmodel.on,
        )
    }

    const options = extra.options || []

    return h(
        'el-select',
        selectOptions,
        options.map((option, idx) => h(
            'el-option',
            {
                props: {
                    label: option.label,
                    value: option.value,
                    disabled: option.disabled,
                },
                key: option.value + idx,
            },
        )),
    )
}

/**
 * 格式化summary上显示的数据
 * @param val
 * @param extra
 */
export function formater(val, {extra}) {
    const item = extra.options.find(item => item.value === val)
    return item ? item.label : val
}

export default {
    render: renderSelect,
    formater,
}