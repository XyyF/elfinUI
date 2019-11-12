<template>
    <div class="test-component1-root">
        <p>test-component1</p>
        <p>dialogData: {{dialogData}}</p>
        <el-button @click.native="closeDialog">
            关闭弹窗
        </el-button>
    </div>
</template>

<script>
    export default {
        name: 'test-component1',
        props: {
            /* Notice: 写下props数据的描述、用途 */
            /* Notice: props 里面的定义，使用此结构，type、default */
            dialogData: {
                type: String,
                default: ''
            }
        },
        methods: {
            /* Notice: 复杂的方法，写下说明 */
            closeDialog() {
                this.$dialog.close('component1主动关闭传递的自定义参数')
            }
        }
    }
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
</style>
