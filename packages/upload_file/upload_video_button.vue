<template>
    <div class="upload-content">
        <div
            v-show="!isUploading"
            id="videoContainer">
            <el-button
                :type="buttonType"
                @click="handleShowFileSelector">
                {{ buttonText }}
            </el-button>
            <input
                ref="fileInput"
                type="file"
                class="hidden"
                @change="handleSelectVideo"/>
        </div>
        <div v-show="isUploading" class="uploading-operate">
            <el-progress
                class="upload-progress"
                :textInside="true"
                :strokeWidth="18"
                :percentage="uploadPercentage">
            </el-progress>
            <el-button
                type="text"
                class="stop-button"
                @click="stopUpload">
                <i class="el-icon-error"></i>
            </el-button>
        </div>
    </div>
</template>


<script>
    import UploadManager from '@utils/qiniu-uploader'

    export default {
        name: 'upload-video-button',
        data() {
            return {
                uploadPercentage: 0,
                isUploading: false,

                // 上传管理器
                uploadManager: null,
            }
        },
        props: {
            uploadSuccess: {
                type: Function,
                default() {
                },
            },
            uploadOption: {
                type: Object,
                default() {
                    return {}
                },
            },
            changeOption: {
                type: Object,
                default() {
                    return {}
                },
            },
            buttonText: {
                type: String,
                default: '本地上传',
            },
            buttonType: {
                type: String,
                default: 'text',
            },
            buttonIndex: {
                type: [Number, String],
                default: 0,
            },
            mustVideo: {
                type: Boolean,
                default: true,
            },
            // 上传文件的大小限制
            sizeLimit: {
                type: Number,
                default: 1024 * 1024 * 1024 * 2, // 单位 byte，大小限制/2G,
            },
        },
        methods: {
            handleShowFileSelector() {
                if (this.$refs.fileInput) {
                    this.$refs.fileInput.value = null
                    this.$refs.fileInput.click()
                }
            },
            async handleSelectVideo(e) {
                try {
                    this.isUploading = true
                    this.uploadManager.setOnProgress((percent) => {
                        this.uploadPercentage = percent
                        this.$emit('uploadProgress')
                    })
                    const file = e.target.files[0]
                    let sourceLink = ''
                    if (/.*\.[mM][pP]3/.test(file.name)) {
                        sourceLink = await this.uploadManager.uploadVoice(file)
                    }
                    else {
                        sourceLink = await this.uploadManager.uploadVideo(file)
                    }
                    this.isUploading = false
                    this.uploadSuccess(sourceLink, this.changeOption)
                }
                catch (err) {
                    this.isUploading = false
                    if (err.code === UploadManager.ErrorCode.NOT_SUPPORTED_TYPE
                        || err.code === UploadManager.ErrorCode.TOO_LARGE) {
                        this.$message(err.message)
                    }
                    else {
                        throw err
                    }
                }
            },
            stopUpload() {
                this.uploadManager.cancelUpload()
                this.isUploading = false
                this.$message.error('已停止上传视频，请重新选择')
            },
        },
        async mounted() {
            this.uploadManager = new UploadManager({
                sizeLimit: this.sizeLimit,
            })
        },
    }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .upload-progress {
        width: 70px;
    }

    .uploading-operate {
        display: flex;
        align-items: center;

        .el-button {
            margin-left: 8px;
            color: #fa533b;
        }

        .stop-button {
            border-color: transparent;
        }
    }

    .hidden {
        visibility: hidden;
        opacity: 0;
    }
</style>