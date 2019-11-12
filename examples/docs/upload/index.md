<script>
    import baseVue from './import.js'

    export default baseVue
</script>

### 标准用法
:::component 在slot中自定义上传样式
```html
<template>
    <upload :file-list="fileList" :show-file-list="showFileList" :size-limit="sizeLimit">
        <el-button size="medium">
            上传
        </el-button>
    </upload>
</template>

<script>
import Upload from 'packages/upload/index.vue'

export default {
    components: {
        Upload
    },
    data() {
        return {
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            sizeLimit: 1024 * 1024 * 1024,
            showFileList: true
        }
    }
}
</script>
```
:::

### Upload Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| fileList | 文件列表 | Array | — | [] |
| showFileList | 是否展示文件列表，也可以在slot中自定义列表样式 | Boolean | — | false |
| sizeLimit | 上传文件大小限制 | Number | — | 1024 * 1024 * 1024 * 2 |
| v-bind="$attrs"自定义prop | http://element-cn.eleme.io/#/zh-CN/component/upload#attribute | - | — | - |