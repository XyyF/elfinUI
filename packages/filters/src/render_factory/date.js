import './styles/date.css';
/**
 * 使用示例
 {
        prop: 'category',
        label: '类型:',
        render: ElfinItemType.DATE,
        renderOptions: {
            props: {
                placeholder: '请选择物品类型',
                clearable: true,
            },
        },
        extra: {
            options: this.vxGoodsTypeOptions,
        },
    }
 * @param h
 * @param renderOptions
 * @param vmodel
 */
export function render(h, renderOptions, vmodel) {
    const options = {
        class: 'elfin-filters__date-picker',
    };
    options.props = Object.assign({
        type: 'date',
        clearable: true,
        placeholder: '请选择时间',
    }, vmodel.props, renderOptions.props);
    options.on = Object.assign({}, options.on, vmodel.on);

    return h(
        'el-date-picker',
        options,
    );
}

/**
 * 格式化summary上显示的数据
 * @param val
 * @param extra
 */
export function formater(val) {
    if (!val) {
        return '';
    }
    // TODO 转化时间
    return val;
}

export default {
    render,
    formater,
};
