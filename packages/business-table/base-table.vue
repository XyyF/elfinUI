<!-- 代码导读
提供 table 基础的数据和方法

1. render 函数渲染 xjl-table 组件
2. 预定义 xjl-table 组件需要的数据
    index、limit、dataSum、filterData、tableOptions、scrollbarReference
   自动处理 xjl-table 的事件，调用 fetch data 的方法
3. 提供 fetchTableData 方法，子类实现此方法，以供基类调用
4. 提供 tableDataForDisplay 、columns 计算属性，子类返回数据，以供基类使用（传递给 xjl-table 组件）
5. 维护 url 当中的参数，将 url 中的参数提取到 filterData中，或将 filterData 应用到 url 中
6. 监听 filterData 变化，自动调用拉取数据的方法
-->

<script>
    import {setUrlQuery} from '@external/edu-saas-utils/common_utils'
    import {debounce, cloneDeep, get, forEach, pick} from 'lodash'

    import tableQueryMap from '../table/helper/table-query-map.js'

    const DEFAULT_PAGE_INDEX = 1
    const DEFAULT_LIMIT = 10

    export default {
        name: 'xjl-base-table',
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {
                // 分页数据
                // 当前第几页
                pageIndex: Number(this.$route.query.pageIndex) || DEFAULT_PAGE_INDEX,
                // 当前fetch数量
                limit: Number(this.$route.query.limit) || DEFAULT_LIMIT,
                /**
                 * need to update
                 */
                dataSum: 0,

                // 表头过滤数据
                filterData: {},

                // table 配置
                tableOptions: {},
                /* **************** */
                // 存放从服务器拉取的原始数据
                originTableData: [],

                /* **************** */
                debouncedFetchTableData: debounce(this.fetchTableData, 300, {leading: true, trailing: true}),

                // 根节点的类名
                rootDomClassName: '',

                // 滚动条对应的容器 selector
                scrollbarReference: '',

                // 是否不将参数设置到url - 某些组件不需要设置参数到url
                cancelSetParamsToUrl: false,

                /**
                 * need to update 选填
                 * 这里主要是为了应对表格初始化时，某一些筛选项是默认有选中值的情况
                 */
                initFilterData: {},

                /**
                 * need to update 选填
                 * 是否渲染分页组件
                 */
                isShowPagination: true,
                /**
                 * need to update 选填
                 * 是否使用前端分页
                 */
                isUseLocalPagination: false,

                /**
                 * need to update 选填
                 * 是否可以显示空状态
                 */
                canDisplayEmpty: true,

                // 是否渲染底部自定义滚动条
                isShowScrollBar: true,

                // 每页显示个数选择器的选项设置
                pageSizes: [10, 20, 30, 40, 50, 100],

                /**
                 * need to update 选填
                 * 空状态显示的文本
                 */
                emptyMsg: '没有任何记录哦',
            }
        },
        props: {
            /* Notice: 写下props数据的描述、用途 */
            /* Notice: props 里面的定义，使用此结构，type、default */
        },
        computed: {
            /* Notice: 写下computed数据的描述 */
            // 传递给table组件的数据，用来显示
            index() {
                let index = this.pageIndex - 1
                index = index >= 0 ? index : 0
                return index * this.limit
            },
            /**
             * need to override
             */
            tableDataForDisplay() {
                return []
            },
            // 表格 列 的配置
            /**
             * need to override
             */
            columns() {
                return []
            },

            // 分页组件配置项
            paginationConfig() {
                // 此处不配置事件处理方法
                // 监听 xjl-table 的 pagination-update 事件
                let currentPage = 0
                if (this.dataSum || this.isUseLocalPagination) {
                    // paging 组件bug
                    // 没有 dataSum 情况下率先初始化 currentPage， 实际 paging 内部的index 仍然为 1
                    // dataSum 变化后，paging 组件的 index !== currentPage
                    if (this.tableDataForDisplay.length > 0) {
                        if (this.isUseLocalPagination) {
                            /* eslint vue/no-side-effects-in-computed-properties: 0 */
                            this.dataSum = this.tableDataForDisplay.length
                        }
                        currentPage = this.pageIndex
                    }
                }
                return {
                    props: {
                        pageSize: this.limit,
                        pageSizes: this.pageSizes,
                        pagerCount: 11,
                        currentPage,
                        layout: 'total, prev, pager, next, sizes',
                        total: this.dataSum,
                    },
                }
            },

            /**
             * 从列表中找到拥有下拉选择的列的prop项
             */
            filterColumn() {
                let hasCustomizedField = false
                const fields = this.columns
                    .filter(item => {
                        if (item.isCustomized) hasCustomizedField = true
                        return !!get(item, 'filterConfig.options') && !item.isCustomized
                    })
                    .map(item => item.prop)
                if (hasCustomizedField) fields.push('customFields')
                return fields
            },
            refTable() {
                return get(this.$refs, 'xjlTable.$refs.elTable')
            },
        },
        methods: {
            // 拉取班级列表
            // 建议使用 debounced
            /**
             * need to override
             */
            fetchTableData() {
            },

            // 翻页组件的事件
            handlePaginationUpdateEvent(val) {
                this.limit = val.pageSize || this.limit
                this.pageIndex = val.currentPage || this.pageIndex
                // 本地分页
                if (this.isUseLocalPagination) {
                    this.dataSum = this.tableDataForDisplay.length
                }
                if (!this.cancelSetParamsToUrl) {
                    this.setPaginationToUrl()
                }

                // 拉取班级列表
                this.debouncedFetchTableData()
            },

            // 处理表头过滤事件
            handleHeaderFilterChange() {
                // 已经自动更新了 filterData， 直接重新拉取数据
                // 当进行表头fetch时，应该需要重置index和limit的限制，并保存到url
                this.pageIndex = DEFAULT_PAGE_INDEX
                this.debouncedFetchTableData()
                // 将pageIndex和limit保存到url
                if (!this.cancelSetParamsToUrl) {
                    this.setPaginationToUrl()
                }
                // 将filterData保存到url
                this.setFilterDataToUrl()
            },

            // 从 url 初始化 filterData,根据column和query进行
            /**
             * 这里将所有可筛选项整合到filterData中是为了应对setFilterDataToUrl()的情况
             * @params {Object} validQuery {name: 'query', age: 12} query中的值，筛选后会保存在url
             * @params {Object} initFilterData {name: 'init'} 初始化值，如班级列表中默认fetch未分班的班级
             * @params {Object} filterData {name: 'query', age: 12, sum: null} 最终的值
             */
            initFilterDataFromUrl() {
                // 获取query中的参数
                const query = this.$route.query
                const validQuery = pick(query, this.filterColumn)
                // 对query中的部分参数进行矫正，譬如{isEnabled: '0'}，需要矫正为Number类型
                forEach(validQuery, (value, key) => {
                    const queryMap = tableQueryMap[key]
                    if (queryMap) {
                        validQuery[key] = queryMap.correctFun(value)
                    }
                })
                // 整合到filterData，watch监听fetch数据
                // 优先级：url参数 > 初始化initFilterData
                if (validQuery.customFields) {
                    validQuery.customFields = JSON.parse(decodeURIComponent(validQuery.customFields))
                }
                const newData = Object.assign({}, this.initFilterData, validQuery)

                const entries = Object.entries(newData)
                entries.forEach(([key, value]) => {
                    this.$set(this.filterData, key, value)
                })

                // url 上没有参数
                // 不会触发 filterData 变化，就不会触发拉取数据
                // 所以主动拉取数据
                if (entries.length === 0) {
                    this.debouncedFetchTableData()
                }
            },

            // filterData 的过滤数据放到url query里面
            setFilterDataToUrl() {
                const filterData = cloneDeep(this.filterData)
                if (filterData.customFields) {
                    filterData.customFields = encodeURIComponent(JSON.stringify(filterData.customFields))
                }
                setUrlQuery(this.$router, filterData)
            },

            // 移除 url query 中 filterData 的字段
            removeFilterDataFromUrl() {
                // 赋值为 null，url 上会移除
                const query = {} // Object.assign({}, this.filterData)
                this.filterColumn.forEach(key => {
                    query[key] = null
                })
                setUrlQuery(this.$router, query)
            },

            updateFilterData(val) {
                this.filterData = val
            },

            // 把翻页信息放到url上
            setPaginationToUrl() {
                setUrlQuery(this.$router, {
                    pageIndex: this.pageIndex,
                    limit: this.limit,
                })
            },

            // 从url上移除翻页信息，避免影响其他table的数据拉取
            removePaginationFromUrl() {
                setUrlQuery(this.$router, {
                    pageIndex: null,
                    limit: null,
                })
            },
            // 刷新数据，比如新建数据、跟新数据状态
            // 刷新列表数据，从头拉取数据
            // @isInitPageIndex 是否回到第一页
            exRefresh(isInitPageIndex = false) {
                this.exClearSelection()
                if (isInitPageIndex) {
                    this.pageIndex = 1
                }
                this.debouncedFetchTableData()
            },
            exClearSelection() {
                // this             ---- this
                //  -> xjl-table    ---- this.$children[0]
                //      -> table    ---- table
                const table = this.$refs.xjlTable.$refs.elTable
                if (table) {
                    table.clearSelection()
                }
            },
            // 可以展开的表格，切换展开状态
            exToggleRowExpansion(row, expanded) {
                // this             ---- this
                //  -> xjl-table    ---- this.$children[0]
                //      -> table    ---- table
                const table = this.$refs.xjlTable.$refs.elTable
                if (table) {
                    table.toggleRowExpansion(row, expanded)
                }
            },
            /**
             * need to override
             * 返回拉取table data需要的过滤数据
             * 导出表格时，需要用到当前table的过滤项
             */
            refFilterFields() {
                return {}
            },
        },
        watch: {
            filterData: {
                // 这里不要设置immediate，否则会fetch两次
                deep: true,
                handler() {
                    this.handleHeaderFilterChange()
                },
            },
            filterColumn: {
                deep: true,
                handler(val, old) {
                    if (val.sort().join('') === old.sort().join('')) return
                    this.initFilterDataFromUrl()
                },
            },
        },
        render(h) {
            const {
                rootDomClassName,
                tableDataForDisplay,
                filterData,
                columns,
                tableOptions,
                paginationConfig,
                isShowPagination,
                isUseLocalPagination,
                handlePaginationUpdateEvent,
                updateFilterData,
                scrollbarReference,
                canDisplayEmpty,
                isShowScrollBar,
                emptyMsg,
            } = this

            const options = {
                class: `table-data-root ${rootDomClassName}`,
                props: {
                    tableData: tableDataForDisplay,
                    filterData,
                    columns,
                    tableOptions,
                    paginationConfig,
                    scrollbarReference,
                    isShowPagination,
                    isUseLocalPagination,
                    canDisplayEmpty,
                    isShowScrollBar,
                    emptyMsg,
                },
                on: {
                    'pagination-update': handlePaginationUpdateEvent,
                    'update:filterData': updateFilterData,
                },
                ref: 'xjlTable',
            }
            return h('xjl-table', options)
        },
        beforeCreate() {
        },
        created() {
        },
        mounted() {
            // 从 url 初始化 filterData
            // 会触发数据拉取方法
            this.initFilterDataFromUrl()
        },
        deactivated() {
            // 这个暂时放到watch监听tab切换中去了，如有问题，再还原
            // this.removeFilterDataFromUrl()

            // 不在这里调用 removePaginationFromUrl 的原因
            // table1 -> table2
            // table2.data() => table1.deactivated()
            // table2.data() 会从url初始化 index、limit 数据
            // 所以在这里调用 removePaginationFromUrl 太晚了
            // 调用时机：父组件切换table时，调用 $refs.xjlTable.removePaginationFromUrl
        },
        activated() {
            // this.setFilterDataToUrl()
            // this.setPaginationToUrl()
        },
    }
</script>
