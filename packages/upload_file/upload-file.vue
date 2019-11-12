<template>
    <el-upload
        ref="uploader"
        v-bind="$attrs"
        action=""
        :showFileList="showFileList"
        :fileList="fileList"
        :httpRequest="handleUpload">
        <div v-loading="isUploading">
            <slot></slot>
        </div>
        <template slot="trigger">
            <slot name="trigger"></slot>
        </template>
        <template slot="tip">
            <slot name="tip"></slot>
        </template>
    </el-upload>
</template>

<script>
    import UploadManager from '@external/edu-saas-utils/qiniu-uploader'

    export default {
        name: 'upload-file',
        inheritAttrs: false,
        directives: {},
        mixins: [],
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {
                isUploading: false,
                uploadManager: '',
            }
        },
        props: {
            /* Notice: 写下props数据的描述、用途 */
            /* Notice: props 里面的定义，使用此结构，type、default */
            showFileList: {
                type: Boolean,
                default: false,
            },
            fileList: {
                type: Array,
                default: () => ([]),
            },
            // 上传文件的大小限制
            sizeLimit: {
                type: Number,
                default: 1024 * 1024 * 1024 * 2, // 单位 byte，大小限制/2G,
            },
        },
        methods: {
            /* Notice: 复杂的方法，写下说明 */
            handleUpload(ops) {
                this.isUploading = true
                this.$emit('update:loading', true)
                this.uploadManager.setOnProgress(ops.onProgress)
                this.uploadManager.uploadImage(ops.file)
                    .then(ops.onSuccess)
                    .catch(err => {
                        this.showErrorMessage(err)
                        ops.onError(err)
                    })
                    .finally(() => {
                        this.isUploading = false
                        this.$emit('update:loading', false)
                    })
            },
            refGetUploader() {
                return this.$refs.uploader
            },
            showErrorMessage(err) {
                if (err.message) {
                    this.$message({
                        message: `${err.message}`,
                        type: 'error',
                    })
                }
            },
        },
        created() {
            this.uploadManager = new UploadManager({
                sizeLimit: this.sizeLimit,
            })
        },
    }
</script>

<style lang="scss" scoped>
</style>