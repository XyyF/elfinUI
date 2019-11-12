<script>
    import Vue from 'vue'
    import {Table, TableColumn, Pagination, Dropdown, DropdownItem, DropdownMenu, Scrollbar} from 'meetin-sass-ui'
    import index from './index-full-el'

    // reader header 用到的组件
    // table 表头中的组件，只能放到全局
    Vue.component(Dropdown.name, Dropdown)
    Vue.component(DropdownItem.name, DropdownItem)
    Vue.component(DropdownMenu.name, DropdownMenu)

    export default {
        name: 'xjl-table',
        components: {
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Pagination.name]: Pagination,
            [Scrollbar.name]: Scrollbar
        },
        extends: index,
    }
</script>

<style scoped>

</style>