<template>
    <div class="cell-tooltips-root">
        <el-popover
            v-for="(cell, index) in cellData"
            :key="index"
            placement="bottom"
            width="400"
            trigger="click"
            :content="cell.tip"
            :disabled="cell.disabled">
            <span
                slot="reference"
                class="tooltips__text"
                :class="{'tooltips__text--hover': !cell.disabled}">
                {{ cell.text }}
            </span>
        </el-popover>
    </div>
</template>

<script>
    /**
     *
     Notice: 用法说明，写下你的组件使用用例
     cellData: [{
        text: '', // 文本
        tip: '' // tooltip文本
     }]
     */
    import {Popover} from 'meetin-sass-ui'
    import columnMixin from '../custom-column-mixin'

    export default {
        name: 'cell-tooltips',
        components: {
            ElPopover: Popover
        },
        mixins: [columnMixin],
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {}
        }
    }
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
    .tooltips__text--hover {
        cursor: pointer;
        &:hover {
            color: #36B459;
        }
    }
</style>
