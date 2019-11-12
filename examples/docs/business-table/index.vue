<script>
    import BaseTable from 'packages/business-table/index-full-el'

    export default {
        extends: BaseTable,
        data() {
            return {
                // table 配置
                tableOptions: {
                    // 参考http://element-cn.eleme.io/#/zh-CN/component/table#table-attributes
                    props: {
                        stripe: false, // 取消斑纹
                    },
                    // 参考http://element-cn.eleme.io/#/zh-CN/component/table#table-methods
                    on: {}
                },

                // 初始化的下拉项数据
                initFilterData: {},
                canDisplayEmpty: false,
                isShowScrollBar: false,

                // 每页显示个数选择器的选项设置
                limit: 10,
                pageSizes: [50, 100],
            }
        },
        computed: {
            /* Notice: 写下computed数据的描述 */
            // 传递给table组件的数据，用来显示
            tableDataForDisplay() {
                return [{
                    name: 'nate',
                    date: '2019-02-14',
                    address: '天府软件园'
                }, {
                    name: 'arvin',
                    date: '2019-02-14',
                    address: '天府软件园'
                }, {
                    name: 'rengar',
                    date: '2019-02-14',
                    address: '天府软件园'
                }]
            },
            // 表格 列 的配置
            // 参考http://element-cn.eleme.io/#/zh-CN/component/table#table-column-attributes
            columns() {
                return [
                    {
                        type: 'index',
                        label: '序号',
                        headerAlign: 'center',
                        align: 'center',
                        width: 55,
                    },
                    {
                        prop: 'date',
                        label: '日期',
                    },
                    {
                        prop: 'name',
                        label: '姓名',
                    },
                    {
                        prop: 'address',
                        label: '地址',
                    }
                ]
            }
        },
        methods: {
            // 获取所有的机构数据
            fetchTableData() {
                console.log('fetch')
            }
        },
    }
</script>