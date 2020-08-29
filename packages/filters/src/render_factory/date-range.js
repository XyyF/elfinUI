import './styles/date-range.css'
/**
 * 使用示例
 {
        prop: 'category',
        label: '类型:',
        render: ElfinItemType.DATE_RANGE,
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
        class: 'elfin-filters__date-range',
    }
    const pickerOptions = {
        shortcuts: [{
            text: '最近一周',
            onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
            },
        }, {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
            },
        }, {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
            },
        }],
    }
    options.props = Object.assign({
        type: 'daterange',
        clearable: true,
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
    }, vmodel.props, renderOptions.props, {
        pickerOptions: Object.assign(pickerOptions, renderOptions.props && renderOptions.props.pickerOptions),
    })
    options.on = Object.assign({}, renderOptions.on, vmodel.on)

    return h(
        'el-date-picker',
        options,
    )
}

/**
 * 格式化summary上显示的数据
 * @param val
 * @param extra
 */
export function formater(val, {extra}) {
    if (!val | val.length !== 2) {
        return ''
    }
    // TODO 转化时间
    return val
}

export default {
    render,
    formater,
}