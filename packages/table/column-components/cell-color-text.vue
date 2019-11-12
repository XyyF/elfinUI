<template>
    <span :style="{color: currentColor}">{{cellData}}</span>
</template>

<script>
    /**
     * 改变表格颜色显示组件，颜色必须配置到enums中 不接受外部传入的颜色
     */
    import columnMixin from 'components/pc/xjl-table/custom-column-mixin'
    import {colorConfig, Color} from 'utils/color-theme'

    export default {
        name: 'cell-color-text', // Notice: 写组件的时候需要给一个名字
        directives: {},
        components: {},
        mixins: [columnMixin],
        data() {
            return {}
        },
        props: {
            color: {
                type: Number,
                default: Color.black,
            },
        },
        computed: {
            currentColor() {
                return colorConfig[this.color] || colorConfig[Color.black]
            },
        },
        filters: {},
        methods: {},
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