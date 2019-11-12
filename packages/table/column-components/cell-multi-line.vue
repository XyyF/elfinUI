<template>
    <ul class="cell-multi-line-root">
        <template v-for="(line, index) in lines">
            <li
                :key="line.value + index"
                :style="{
                    'height': `${CellHeight * line.count}px`,
                    'color': line.color,
                }">
                <text-auto-tooltip :line="2" :class="{warning: !!line.warning}">
                    {{ line.value }}
                </text-auto-tooltip>
                <tooltip-tag :config="line"></tooltip-tag>
            </li>
        </template>
    </ul>
</template>

<script>
    /**
     * 单元格数据
     * {string[]} cellData tag列表
     *
     * 事件
     */
    import columnMixin from '../custom-column-mixin'
    import TooltipTag from '../../tooltip-tag/index'
    import TextAutoTooltip from '../../text-auto-tooltip/src/main'

    const CellHeight = 58

    export default {
        components: {
            TooltipTag,
            TextAutoTooltip
        },
        mixins: [columnMixin],
        data() {
            return {
                CellHeight
            }
        },
        props: {
            // 当前列的点击事件
            onClickFn: {
                type: Function,
                default: () => {
                },
            },
            multi: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            lines() {
                const data = this.cellData || []
                if (data.length === 0) return [{
                    count: 1,
                    value: '--',
                }]
                const isObject = typeof data[0] === 'object'
                if (!isObject) {
                    return data.map(item => ({
                        count: 1,
                        value: item,
                    }))
                }
                return data
            },
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .cell-multi-line-root {
        padding: 0;
        margin: -10px;
        li {
            overflow: hidden;
            text-overflow: ellipsis;
            min-height: 58px; // 当内容为空时，也应该有高度，这样才可以对齐
            border-bottom: 1px solid $--border-color-lighter;
            display: flex;
            align-items: center;
            padding: 0 12px;
        }
        li:last-of-type {
            border-bottom: none
        }
    }

    .warning {
        color: $--color-warning;
    }

    /deep/ .el-tag {
        margin-left: 5px;
    }
</style>
