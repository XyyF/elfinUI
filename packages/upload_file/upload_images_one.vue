<template>
    <el-upload
        class="upload-demo"
        :httpRequest="handleUpload"
        drag
        :showFileList="false"
        action=""
        :onPreview="handlePictureCardPreview"
        :beforeUpload="handleBeforeUpload"
        :onRemove="handleRemove"
        :onExceed="handleExceed"
        :onSuccess="handleSuccessWindow">
        <i v-if="!imgUrl" class="el-icon-upload"></i>
        <div v-if="!imgUrl" class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
        </div>
        <img
            v-if="imgUrl"
            :src="imgUrl"
            class="avatar"
            alt="电脑端图片"/>
    </el-upload>
</template>

<script>
    import regValidator from '@external/edu-saas-utils/regex-validator'
    import UploadManager from '@external/edu-saas-utils/qiniu-uploader'

    export default {
        name: 'upload-images-one',
        data() {
            return {
                uploadManager: '',
                isUploading: false,
                imgUrl: '', // 电脑端图片地址
            }
        },
        props: {
            imgUrlProp: {
                type: String,
                default: '',
            },
        },
        methods: {

            // 超出限制时
            handleExceed() {
                this.showInfo = true
            },
            // 移除图片
            handleRemove(file) {
                this.$emit('onRemove', file.response)
            },
            // 预览图片
            handlePictureCardPreview(file) {
                this.$previewImages([file.url])
            },
            // 电脑端图片上传成功
            handleSuccessWindow(file) {
                this.imgUrl = file
                this.$emit('update:imgUrl', file)
            },

            // 文件上传之前的钩子
            handleBeforeUpload(file) {
                if (regValidator.isPic(file.type)) {
                    return true
                }
                this.$message.warning('请上传jpg和png格式的图片')
                return false
            },
            // http请求
            handleUpload(ops) {
                this.isUploading = true
                this.uploadManager.setOnProgress(ops.onProgress)
                this.uploadManager.uploadImage(ops.file, this.model)
                    .then(ops.onSuccess)
                    .catch(err => {
                        this.showErrorMessage(err)
                        ops.onError(err)
                    })
                    .finally(() => {
                        this.isUploading = false
                    })
            },
        },
        watch: {
            imgUrlProp: {
                immediate: true,
                handler(val) {
                    this.imgUrl = val
                },
            },
            imgUrl: {
                immediate: true,
                handler(val) {
                    this.$emit('update:imgUrl', val)
                },
            },
        },
        created() {
            this.uploadManager = new UploadManager({
                sizeLimit: this.sizeLimit,
            })
        },
    }
</script>

<style scoped>

</style>