<script>
    import XjlTable from '../table/index-scoped-el'
    import BaseTable from './base-table'

    export default {
        name: 'xjl-business-table',
        components: {
            [XjlTable.name]: XjlTable,
        },
        extends: BaseTable,
    }
</script>

<style scoped>

</style>