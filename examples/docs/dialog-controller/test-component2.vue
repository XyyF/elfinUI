<template>
    <div class="test-component2-root">
        <p>test-component2</p>
        <el-button @click.native="closeDialog">
            关闭弹窗
        </el-button>
        <el-button @click.native="show">
            打开新弹窗
        </el-button>
    </div>
</template>

<script>
    import TestComponent3 from './test-component3'

    export default {
        name: 'test-component2',
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
                this.$dialog.close('component2主动关闭传递的自定义参数')
            },
            show() {
                this.$dialog
                    .show(TestComponent3)
                    .onClose((params) => {
                        this.$message(`component3关闭回调，参数：${params}`)
                    })
            }
        }
    }
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
</style>
