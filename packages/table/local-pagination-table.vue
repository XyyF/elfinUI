<template>
    <xjl-table
        :columns="columns"
        :tableData="tableDataByPage"
        :paginationConfig="paginationConfig"
        @pagination-update="handlePaginationUpdate">
    </xjl-table>
</template>

<script>
    import XjlTable from './index'

    export default {
        name: 'local-pagination-table', // 显示梯度的表格
        directives: {},
        components: {
            XjlTable,
        },
        mixins: [],
        data() {
            return {
                pageSize: 10, // 显示多少数据
                currentPage: 1, // 当前页
            }
        },
        props: {
            // 表格数据
            tableData: {
                type: Array,
                default() {
                    return []
                },
            },
            // 列表的配置
            columns: {
                type: Array,
                default() {
                    return []
                },
            },
        },
        computed: {
            // 分页组件配置项
            paginationConfig() {
                // 此处不配置事件处理方法
                // 监听 xjl-table 的 pagination-update 事件
                return {
                    props: {
                        // 一页分页显示限制数量
                        pageSize: this.pageSize,
                        // 分页可点击的数量
                        pagerCount: 11,
                        // 当前页下表
                        currentPage: this.currentPage,
                        layout: 'total, prev, pager, next, sizes',
                        // 分页数据总数量
                        total: this.tableData.length,
                    },
                }
            },
            // 当前显示的分页数据
            tableDataByPage() {
                return this.tableData.filter((item, index) => {
                    const start = (this.currentPage - 1) * this.pageSize
                    const end = this.currentPage * this.pageSize
                    return index >= start && index < end
                })
            },
        },
        filters: {},
        methods: {
            handlePaginationUpdate({currentPage = 1, pageSize}) {
                this.currentPage = currentPage
                if (pageSize) this.pageSize = pageSize
            },
        },
        watch: {},
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        mounted() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        activated() {
        },
        deactivated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        errorCaptured() {
        },
    }
</script>

<style lang="scss" scoped>
</style>