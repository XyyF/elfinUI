<template>
    <el-tooltip
        v-if="config.tag && config.tag.label"
        v-bind="tooltipConfig"
        class="tooltip-tag-root">
        <el-tag v-bind="tagConfig">
            {{ config.tag.label }}
        </el-tag>
    </el-tooltip>
</template>

<script>
    export default {
        name: 'tooltip-tag',
        directives: {},
        components: {},
        mixins: [],
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {}
        },
        props: {
            /* Notice: 写下props数据的描述、用途 */
            /* Notice: props 里面的定义，使用此结构，type、default */
            config: {
                type: Object,
                default: () => ({})
            }
        },
        computed: {
            /* Notice: 写下computed数据的描述 */
            tooltipConfig() {
                return Object.assign({}, {
                    effect: 'dark',
                    placement: 'top-start'
                }, this.config.tooltip)
            },
            tagConfig() {
                return Object.assign({}, {
                    size: 'small'
                }, this.config.tag)
            }
        }
    }
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
    .tooltip-tag-root.el-tag {
        cursor: pointer;
        margin-left: 5px;
    }
</style>
