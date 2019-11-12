<script type="text/jsx">
    /**
     * 代码导读
     *
     * 解析配置数据，渲染 表格（table） 组件
     *
     * 使用 render() 函数渲染 html 代码
     * render()
     *  -> renderTable() 渲染表格
     *      -> renderTableHeader() 渲染表头，涉及到下拉选项、选中数据、选中高亮、更新选中数据
     *  -> renderPagination() 渲染分页组件
     *  -> renderScrollBar() 渲染滚动条
     */
    import {getValueByPath} from 'meetin-sass-ui/lib/utils/util'
    import {merge as _merge, get as _get, debounce} from 'lodash'
    import ScrollBar from './scroll-bar'
    import defaultImg from './assets/default_water_mark.png'

    export default {
        name: 'xjl-table',
        directives: {},
        components: {},
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {
                scrollBarUtils: null,
                // 表头变化后，更新此数值
                // 不然，调整表头顺序，UI 上不会更新
                columnVersion: 1,
                // 前端分页，表格数据
                localPagedTableData: [],
                tableFixedHeight: null,
                debouncedOnWindowSizeChange: debounce(this.windowResizeHandler, 300, {leading: true, trailing: true}),
            }
        },
        props: {
            /* Notice: 写下props数据的描述、用途 */
            /* Notice: props 里面的定义，使用此结构，type、default */
            columns: {
                type: Array,
                default: () => {
                    return []
                },
            },
            filterData: {
                type: Object,
                default: () => {
                    return {}
                },
            },
            tableOptions: {
                type: Object,
                default: () => {
                    return {}
                },
            },
            tableData: {
                type: Array,
                default: () => {
                    return []
                },
            },
            paginationConfig: {
                type: Object,
                default: () => {
                    return {}
                },
            },
            // 滚动条参照物
            scrollbarReference: {
                type: String,
                default: '',
            },
            emptyImage: {type: String, default: defaultImg},
            emptyMsg: {type: String, default: '没有任何记录哦'},
            canDisplayEmpty: {type: Boolean, default: true}, // 是否可以显示空状态
            // 是否渲染分页组件，默认渲染
            isShowPagination: {
                type: Boolean,
                default: true,
            },
            // 是否渲染底部滚动组件，默认渲染
            isShowScrollBar: {
                type: Boolean,
                default: true,
            },
            // 是否启用前端分页
            isUseLocalPagination: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            /* Notice: 写下computed数据的描述 */
            defaultTaleOptions() {
                return {
                    props: {
                        stripe: true, //  设置 斑马纹
                        data: this.isUseLocalPagination ? this.localPagedTableData : this.tableData, // 设置 table data 映射
                        border: true,
                        emptyText: ' ', // 隐藏掉 empty text, 设置成 '' 空字符串 不管用
                        height: this.tableFixedHeight,
                    },
                    on: {
                        'header-dragend': this.calculateScrollbarWidth,
                    },
                    ref: 'elTable',
                }
            },
            defaultColumnOptions() {
                return {
                    resizable: true,
                }
            },
            elTable() {
                return this.$refs.elTable
            },
        },
        filters: {},
        methods: {
            /* Notice: 复杂的方法，写下说明 */
            /** 杂项 */
            calculateScrollbarWidth() {
                setTimeout(() => {
                    this.scrollBarUtils && this.scrollBarUtils.calculateScrollbarWidth()
                }, 300)
            },
            // 更新过滤数据项
            updateFilterData(key, value, isCustomized) {
                // 过滤用户自定义的数据项
                // isCustomized 携带在列配置项中

                // 更新自定义过滤数组
                const updateCustomeFields = () => {
                    const customFields = new Array(...this.filterData.customFields || [])
                    /**
                     * keyForNumber 传入后端的fieldId类型是Number
                     */
                    const keyForNumber = parseInt(key, 10)
                    const foundIndex = customFields.findIndex(item => item.fieldId === keyForNumber)
                    if (foundIndex < 0) {
                        // 新增过滤数据
                        customFields.push({
                            fieldId: keyForNumber, // 自定义字段id
                            fieldValue: value,// 自定义字段value
                        })
                    }
                    else if (value) {
                        // 更新老的过滤数据
                        customFields.splice(foundIndex, 1, {
                            fieldId: keyForNumber, // 自定义字段id
                            fieldValue: value,// 自定义字段value
                        })
                    }
                    else {
                        // 找到了老数据，并且选择了【取消】（!value）
                        // 删掉老数据
                        customFields.splice(foundIndex, 1)
                    }
                    return Object.assign({}, this.filterData, {customFields})
                }

                let newVal = null
                if (isCustomized) {
                    newVal = updateCustomeFields()
                    if (newVal.customFields.length === 0) newVal.customFields = null
                }
                else {
                    // 复制并得到最新的过滤数据
                    newVal = Object.assign({}, this.filterData, {[key]: value})
                    // 最新选择的是【取消】(!value)
                    if (value === null) newVal[key] = null
                }
                this.$emit('update:filterData', newVal)
            },

            /** 业务逻辑 */
            dropdownHandler(columnConfig) {
                return (command) => {
                    // 筛选的配置信息
                    const filterConfig = columnConfig.filterConfig

                    let value = null
                    let selection = null
                    if (command !== 'cancel') {
                        selection = filterConfig.options.find(item => item.value === command)

                        if (!selection) value = null
                        else value = selection.value
                    }

                    // 更新 filterData
                    this.updateFilterData(columnConfig.prop, value, columnConfig.isCustomized)

                    // 触发事件回调
                    if (filterConfig.handler) {
                        filterConfig.handler(selection)
                    }
                }
            },

            // 计算前端分页数据
            calcLocalPagedTableData(config = {}) {
                const pageSize = config.pageSize || _get(this.paginationConfig, 'props.pageSize') || 10
                // 当currentPage为0的时候，需要处理
                const currentPage = config.currentPage || _get(this.paginationConfig, 'props.currentPage') || 1
                const start = pageSize * (currentPage - 1)
                const end = pageSize * currentPage
                this.localPagedTableData = this.tableData.slice(start, end)
            },

            // 分页组件 pageSize 改变时会触发
            paginationSizeChangeHandler(pageSize) {
                this.calcLocalPagedTableData({pageSize})
                this.$emit('pagination-update', {
                    pageSize,
                })
            },
            // 分页组件 currentPage 改变时会触发
            paginationIndexChangeHandler(currentPage) {
                this.calcLocalPagedTableData({currentPage})
                this.$emit('pagination-update', {
                    currentPage,
                })
            },
            onCellClick(row, column, cell, event) {
                const columnConfig = this.getColumnConfig(column.property)
                if (!columnConfig || !columnConfig.onClick) return
                columnConfig.onClick(row, column, cell, event)
            },

            /**
             * 获取数据
             * 增加对多级表头的支持
             */
            // 返回表格-列的配置
            getColumnConfig(prop, cloumns = this.columns) {
                let result = null
                cloumns.some(item => {
                    if (item.columns) {
                        result = this.getColumnConfig(prop, item.columns)
                        return !!result
                    }
                    else if (item.prop === prop) {
                        result = item
                        return true
                    }
                    else {
                        return false
                    }
                })
                return result
                // let result = null
                // data.forEach(item => {
                //     // 多级表头
                //     if (item.columns) {
                //         const config = this.getColumnConfig(prop, item.columns)
                //         // 如果有重复属性，则获取最后一个
                //         if (config) {
                //             result = config
                //         }
                //     } else if (item.prop === prop) {
                //         result = item
                //     }
                // })
                // return result
            },
            getFilterData(prop) {
                const column = this.getColumnConfig(prop)
                if (column.isCustomized) {
                    // 自定义列，从 customFields 中获取数据
                    const customFields = (this.filterData && this.filterData.customFields) || []
                    const keyForNumber = parseInt(prop, 10)
                    const item = customFields.find(item => item.fieldId === keyForNumber)

                    if (item) return item.fieldValue
                    return undefined
                }
                return this.filterData[prop]
            },
            // 返回是否应该渲染包含过滤功能的表头
            shouldRenderHeader(prop) {
                const column = this.getColumnConfig(prop)
                const options = _get(column, 'filterConfig.options', [])
                return options.length > 0
            },
            // 返回过滤表头的title，跟过滤选项有关
            getFilterHeaderTitle(prop) {
                const columnConfig = this.getColumnConfig(prop)
                const filterValue = this.getFilterData(prop)
                const options = (columnConfig.filterConfig ? columnConfig.filterConfig.options : null) || []
                if (typeof filterValue === 'undefined' || options.length === 0) {
                    return columnConfig.label
                }

                // url 中取到的query数值，都是string
                // 转换成 string 之后对比数值是否相等
                const selection = options.find(item => String(item.value) === String(filterValue))
                if (!selection) return columnConfig.label

                return selection.label
            },
            // 返回 prop 对应的表头是否正在进行筛选
            isFilteringWithProp(prop) {
                const filterValue = this.getFilterData(prop)
                return typeof filterValue !== 'undefined' && filterValue !== null && filterValue !== ''
            },

            /** 渲染函数 */
            // 渲染表格
            renderTable(h) {
                const {
                    columns,
                    tableOptions,
                    defaultTaleOptions,
                    columnVersion,
                    defaultColumnOptions,

                    // methods
                    renderTableHeader,
                    shouldRenderHeader,
                    onCellClick,
                } = this

                // 递归渲染列 el-table-column
                function tableColumns(tcolumns) {
                    // 渲染表格-列
                    // 处理表头渲染你
                    // 处理可点击列的高亮态
                    function renderDom(options, children) {
                        const prop = options.props.prop
                        if (shouldRenderHeader(prop)) {
                            options.props.renderHeader = renderTableHeader
                            options.props.sortable = false
                        }
                        if (options.props.onClick) {
                            // 定义了cell的点击事件
                            // 添加 class name
                            // 用于处理hover 高亮
                            const className = options.props['class-name']
                            if (className) {
                                options.props['class-name'] = `${className} column--highlight`
                            }
                            else {
                                options.props['class-name'] = 'column--highlight'
                            }
                        }
                        // 必须设置 key
                        // 不然表头变化后，会出错
                        options.key = `${options.props.label}-${options.props.prop}-${columnVersion}`
                        // 组合默认值
                        Object.assign({}, defaultColumnOptions, options.props)
                        return h('el-table-column', options, children)
                    }

                    // 渲染表格-列
                    // 处理多级表头渲染
                    // 处理自定义组件渲染
                    // 处理常规渲染
                    return tcolumns.map((columnProps, index) => {
                        if (columnProps.columns) {
                            // 多表头
                            const {columns} = columnProps
                            const props = columnProps
                            return renderDom({props}, tableColumns(columns))
                        }
                        else {
                            const {component} = columnProps
                            const props = columnProps
                            if (component) {
                                // 使用了自定义组件
                                const scopedSlots = {
                                    default: props => {
                                        const comOptions = Object.assign({}, component.options)
                                        comOptions.props = Object.assign(
                                            {},
                                            {rowIndex: props.$index},
                                            comOptions.props,
                                            {prop: columnProps.prop},
                                            props,
                                        )
                                        comOptions.key = props.row.key || index
                                        return h(component.dom, Object.assign({}, comOptions))
                                    },
                                }
                                return renderDom({props, scopedSlots})
                            }
                            else {
                                return renderDom({props})
                            }
                        }
                    })
                }

                const options = _merge({}, defaultTaleOptions, tableOptions)

                // 定义了 onClick 事件处理方法
                const hasClickHandler = columns.some(item => item.onClick)
                if (hasClickHandler) {
                    options.on = Object.assign({}, options.on, {'cell-click': onCellClick})
                }
                return h('el-table', Object.assign({}, options), tableColumns(columns))
            },
            // 渲染表头 - 下拉菜单
            renderTableHeader(h, {column}) {
                const {
                    dropdownHandler,
                    isFilteringWithProp,
                    getFilterHeaderTitle,
                    getFilterData,
                } = this

                const columnConfig = this.getColumnConfig(column.property)
                if (!columnConfig) return null
                const options = (columnConfig.filterConfig && columnConfig.filterConfig.options) || []

                const dropdownOptions = {
                    // 处理过滤生效时的高亮逻辑
                    class: {
                        'header-dropdown': true,
                        'header-dropdown--highlight': isFilteringWithProp(column.property),
                    },
                    on: {
                        command: dropdownHandler(columnConfig),
                    },
                    props: {
                        trigger: 'click',
                        placement: 'bottom-start',
                    },
                }

                function renderOptions() {
                    if (!options || options.length === 0) return []
                    const itemRenders = options.map(option => {
                        // 处理选中高亮逻辑
                        // 过滤的数值，没有过滤时，返回 undefined
                        const filterValue = getFilterData(column.property)
                        const selected = option.value === filterValue
                        const itemOptions = {
                            props: {command: option.value},
                            class: {
                                'xjl-table-dropdown-item--highlight': selected,
                            },
                        }
                        return h('el-dropdown-item', itemOptions, option.label)
                    })

                    // 包含取消操作的条目
                    const cancelItemOptions = {
                        props: {command: 'cancel'},
                        class: 'xjl-table-dropdown--cancel',
                    }
                    const cancelItem = h('el-dropdown-item', cancelItemOptions, [h('span', '全部')])
                    itemRenders.unshift(cancelItem)

                    return itemRenders
                }

                return h('el-dropdown', dropdownOptions, [
                    h('span', {class: 'el-dropdown-link'}, [
                        getFilterHeaderTitle(column.property),
                        h('i', {class: 'el-icon-arrow-down el-icon--right'}),
                    ]),
                    h('el-dropdown-menu', {slot: 'dropdown'}, [
                        h('el-scrollbar', {
                            class: 'xjl-table-dropdown-item-container',
                            props: {
                                tag: 'div',
                            },
                        }, renderOptions()),
                    ]),
                ])
            },
            // 渲染分页组件
            renderPagination(h) {
                const {
                    paginationConfig,
                    paginationSizeChangeHandler,
                    paginationIndexChangeHandler,
                } = this

                const paginationOptions = Object.assign({}, paginationConfig)

                if (!paginationConfig.props) {
                    // 不是本地分页
                    if (!this.isUseLocalPagination) {
                        return null
                    }
                    paginationOptions.props = {
                        total: this.tableData.length,
                        pageSize: 10,
                        pageSizes: [10],
                        pagerCount: 11,
                        currentPage: 1,
                        layout: 'total, prev, pager, next, sizes',
                    }
                }


                // 如果没有配置 分页数据变化事件 的处理方法
                // 补充上自动处理方法
                const eventProps = ['on.size-change', 'on.sizeChange', 'on.current-change', 'on.currentChange']
                const hasEventHandler = eventProps.some(path => !!getValueByPath(paginationOptions, path))
                if (!hasEventHandler) {
                    const eventHandlers = Object.assign({}, paginationOptions.on, {
                        'size-change': paginationSizeChangeHandler,
                        'current-change': paginationIndexChangeHandler,
                    })
                    paginationOptions.on = eventHandlers
                }

                return h('el-pagination', Object.assign({}, paginationOptions))
            },
            // 渲染滚动条
            renderScrollBar(h) {
                return h('div', {class: 'scroll-bar-root'}, [
                    h('div', {class: 'content'}),
                ])
            },
            // 渲染空状态 view
            renderEmptyTips(h) {
                if (!this.canDisplayEmpty) return null
                const {
                    emptyImage,
                    emptyMsg,
                } = this
                if (this.tableData.length > 0) return null
                return h('div', {class: 'water-mark'}, [
                    h('img', {domProps: {src: emptyImage}}),
                    h('span', {class: 'empty-tips'}, emptyMsg),
                ])
            },
            windowResizeHandler() {
                if (this.isShowScrollBar) return
                this.tableFixedHeight = this.$el.clientHeight - 54
            },
        },
        watch: {
            /* Notice: 写下说明 */
            columns() {
                this.columnVersion++
            },
            tableData: {
                immediate: true,
                handler(val) {
                    if (this.isUseLocalPagination) {
                        if (this.paginationConfig.props && val.length > 0) {
                            this.paginationConfig.props.total = val.length
                        }
                        this.calcLocalPagedTableData()
                    }
                },
            },
        },
        render(h) {
            return h(
                'div',
                {
                    class: {
                        'xjl-table-root': true,
                        'hidden-scrollbar': this.isShowScrollBar,
                        'empty': this.tableData.length === 0,
                    },
                },
                [
                    this.renderTable(h),
                    this.isShowPagination ? this.renderPagination(h) : null,
                    this.renderEmptyTips(h),
                    this.isShowScrollBar ? this.renderScrollBar(h) : null,
                ])
        },
        // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子
        updated() {
            // 回调 deactivated 触发了 updated，回到activated不会触发updated
            // 已经回调了deactivated，处于不活动状态
            // 不能进行后续的操作，不然滚动条显示有问题
            if (this._inactive) return
            // 更新滚动条的宽度
            this.$nextTick(() => {
                const params = [
                    this.$el.querySelector('.el-table'),
                    this.$el.querySelector('.scroll-bar-root'),
                    this.scrollbarReference ? document.querySelector(this.scrollbarReference) : null,
                ]
                this.scrollBarUtils.configureDom(...params)
            })
            this.debouncedOnWindowSizeChange()
        },
        mounted() {
            // 滚动条事件处理
            this.scrollBarUtils = new ScrollBar()
            window.addEventListener('resize', this.debouncedOnWindowSizeChange)
        },
        beforeDestroy() {
            this.scrollBarUtils.destructor()
        },
    }
</script>

<style lang="scss" scoped>
    // 必须比系统滚动条多一个像素，否则显示出滚动条后子元素就不可见了，导致下次重绘时滚动条会消失掉。现象是修改元素上的任意属性，滚动条会 消失->出现->消失 交替变化
    $scrollbar-height: 17px + 1px;
    $sideMenuWidth: 140px;

    .xjl-table-root {
        width: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    /* scroll-bar */
    .scroll-bar-root {
        position: fixed;
        bottom: 0;
        left: $sideMenuWidth;
        right: 0;
        z-index: 1000;
        height: $scrollbar-height;
        overflow-x: auto;
        background-color: transparent;
    }

    .content {
        height: 100%;
        background-color: rgba(255, 255, 255, 0.1);
    }

    /* 表头 */
    .xjl-table-root /deep/ .header-dropdown {
        line-height: 20px;
        cursor: pointer;
        color: inherit;
        padding: 0;
        /*高度出现偏差*/
        margin-top: 4px;
    }

    /*/deep/ .el-table__header th {*/
    /*background-color: #f3f6f7;*/
    /*font-weight: normal;*/
    /*}*/

    /*/deep/ .el-table__header th > .cell {*/
    /*white-space: nowrap;*/
    /*}*/

    /*/deep/ .header-dropdown--highlight {*/
    /*color: #36b459;*/
    /*}*/

    /*/deep/ th, td {*/
    /*border-color: #fff;*/
    /*}*/

    /*/deep/ td {*/
    /*border: none !important;*/
    /*}*/

    /deep/ .el-table {
        border: 1px solid #ebeef5;
        min-height: 330px;
        flex-shrink: 0;
    }

    /* 分页 */
    /deep/ .el-pagination {
        margin-top: 20px;
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    /* 滚动条 */
    /* 隐藏滚动条 */
    .hidden-scrollbar {
        /deep/ .el-table__body-wrapper {
            -ms-overflow-style: none; // IE 10+
            overflow: -moz-scrollbars-none; // Firefox
        }

        /deep/ .el-table__body-wrapper::-webkit-scrollbar {
            display: none; // Safari and Chrome
        }

        /* 固定列高度撑满所有高度 */
        /* 因为隐藏了滚动条，空出来一个滚动条的高度 */
        /deep/ .el-table__fixed,
        /deep/ .el-table__fixed-right {
            height: 100% !important;
        }
    }

    .empty {
        /deep/ .el-table__body-wrapper {
            visibility: hidden;
        }
    }

    /* 设置了点击事件的column，需要hover态高亮 */
    /deep/ .el-table__row .column--highlight {
        &:hover {
            color: #36b459;
            cursor: pointer;
        }
    }

    .water-mark {
        position: absolute;
        /*扣除表头的高度*/
        padding-top: 60px;
        left: 0;
        right: 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        pointer-events: none;
    }

    .empty-tips {
        color: #ccc;
        margin-top: 10px;
    }
</style>

<style lang="scss">
    .xjl-table-dropdown--cancel {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 36px;
    }

    .xjl-table-dropdown--cancel > span {
        /*color: #ff5702;*/
        display: inline-block;
        /*background-color: mix(#ff5702, white, 15%);*/
        line-height: 1;
        border-radius: 4px;
    }

    .xjl-table-dropdown-item--highlight {
        background-color: #ebf8ee;
        color: #5ec37a;
    }

    .xjl-table-dropdown-item-container {
        max-height: 200px;
    }

    .xjl-table-dropdown-item-container .el-scrollbar__wrap {
        max-height: 200px;
    }

    /*.xjl-table-dropdown-item-container .el-dropdown-menu__item {*/
    /*max-width: 120px;*/
    /*}*/
</style>