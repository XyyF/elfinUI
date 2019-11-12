<template>
    <span :style="{color: currentColor}">
        {{ cellText }}
    </span>
</template>

<script>
    /**
     * 改变表格颜色显示组件，颜色必须配置到enums中 不接受外部传入的颜色
     * {
     *  text: '文本'
     *  color: Color.black, // 颜色
     * }
     */
    import {colorConfig, Color} from '@external/edu-saas-utils/color-theme'
    import columnMixin from '../custom-column-mixin'

    export default {
        name: 'cell-text-color', // Notice: 写组件的时候需要给一个名字
        directives: {},
        components: {},
        mixins: [columnMixin],
        data() {
            return {}
        },
        props: {
            // 默认的颜色
            defaultColor: {
                type: Number,
                default: Color.black,
            },
        },
        computed: {
            cellText() {
                if (!this.cellData) return ''
                if (Object.prototype.toString.call(this.cellData) === '[object String]') {
                    return this.cellData
                }
                return this.cellData.text
            },
            currentColor() {
                // 如果没有自定义颜色，就采用默认的颜色
                if (!this.cellData.color) return colorConfig[this.defaultColor]
                return colorConfig[this.cellData.color]
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>