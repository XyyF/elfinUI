<template>
    <div class="test-component3-root">
        <p>test-component3</p>
        <el-button @click.native="closeDialog">
            关闭弹窗
        </el-button>
    </div>
</template>

<script>
    export default {
        name: 'test-component3',
        methods: {
            /* Notice: 复杂的方法，写下说明 */
            closeDialog() {
                this.$dialog.pop('component3主动关闭传递的自定义参数')
            }
        }
    }
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
</style>
