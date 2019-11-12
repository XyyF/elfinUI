<template>
    <div class="upload-images-root">
        <div class="images__wrap">
            <upload-file
                ref="fileUploader"
                multiple
                :onSuccess="uploadSuccess"
                :onExceed="onExceed"
                :limit="lackCount"
                accept="image/*"
                @update:loading="val => $emit('update:loading', val)">
                <div class="new-item" :style="itemSizeStyle">
                    <i class="el-icon-plus"></i>
                </div>
            </upload-file>
            <div
                v-for="(imgUrl, index) in imgList"
                :key="`${imgUrl}${index}`"
                class="img-item"
                :style="Object.assign({backgroundImage: `url(${imgUrl})`}, itemSizeStyle)">
                <i class="el-icon-circle-close" @click="removeImg(imgUrl)"></i>
            </div>
        </div>
        <p class="upload-images__tips">
            支持jpg、png格式，最多9张
        </p>
    </div>
</template>

/*********************************************/

<script>
    import UploadFile from './upload-file.vue'

    /**
     * 此组件不能使用 v-mode 更新数据
     * 因为上传多张图片的时候，uploadSuccess 回调异常频繁
     * 在 input 事件同步数据之前，uploadSuccess 就再次回调了
     * 造成了数据的覆盖
     */
    /**
     * 内部抛出 update:loading 事件，代表是否正在上传图片ing
     */
    export default {
        name: 'upload-images',
        components: {
            UploadFile,
        },
        data() {
            return {
                drag: false,
                imgList: Array.from(this.historyList),
            }
        },
        props: {
            historyList: {
                type: Array,
                default: () => [],
            },
            itemSize: {
                type: [Number, Array],
                default: 60,
            },
            maxCount: {
                type: Number,
                default: 9,
            },
        },
        computed: {
            itemSizeStyle() {
                return {
                    width: `${this.itemSize}px`,
                    height: `${this.itemSize}px`,
                }
            },
            // 还可以上传的数量
            lackCount() {
                return this.maxCount - this.imgList.length || -1
            },
        },
        methods: {
            uploadSuccess(url) {
                this.$refs.fileUploader.refGetUploader().clearFiles()
                this.imgList.push(url)
            },
            onExceed() {
                this.$message.warning(`最多上传 ${this.maxCount} 张图片`)
            },
            removeImg(url) {
                const index = this.imgList.findIndex(item => item === url)
                if (index >= 0) {
                    this.imgList.splice(index, 1)
                }
            },
            getImgList() {
                return this.imgList
            },
        },
        watch: {
            historyList(val) {
                this.imgList = Array.from(val)
            },
        },
    }
</script>

/*********************************************/

<style lang="scss" rel="stylesheet/scss" scoped>
    .images__wrap {
        display: flex;
        flex-wrap: wrap;

        & > * {
            margin-right: 10px;
            margin-bottom: 10px;
        }

        .new-item {
            border: 1px solid #E9E9E9;
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .img-item {
            background: no-repeat center;
            background-size: cover;
            border: 1px solid #E9E9E9;
            border-radius: 2px;
            position: relative;

            .el-icon-circle-close {
                z-index: 1;
                color: red;
                font-size: 20px;
                position: absolute;
                right: -10px;;
                top: -10px;
                background: white;
                border-radius: 50%;
                cursor: pointer;
            }
        }
    }

    .upload-images__tips {
        color: #B4C1CA;
        font-size: 12px;
        line-height: initial;
        font-weight: 300;
    }
</style>
