<template>
    <div class="cell-switch-root">
        <el-switch :value="cellData" @change="handleChange"></el-switch>
    </div>
</template>

<script>
    import columnMixin from '@components/xjl-table/custom-column-mixin'

    export default {
        name: 'cell-switch', // Notice: 写组件的时候需要给一个名字
        directives: {},
        mixins: [columnMixin],
        data() {
            return {}
        },
        methods: {
            handleChange(val) {
                this.$emit('update:changeEmit', val, this.row)
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>