<script>
    import baseVue from './import.js'

    export default baseVue
</script>

## previewer 图片预览

注册插件的形式使用，会在Vue.prototype上定义$previewImages方法

因为是动态加载组件的形式，所以如果300ms以上未将资源加载完，将会在#app元素上设置loading状态(测试可设置 控制台 -> Network -> Slow 3G)

### 标准用法
:::component 通过组件this调用$previewImages
```html
<template>
    <el-button size="medium" @click.native="previewerImages">
        打开previewer
    </el-button>
</template>

<script>
import Vue from 'vue'
import Previewer from 'packages/previewer/index.js'
import assets1 from './assets/assets1.jpg'
import assets2 from './assets/assets2.jpg'
import assets3 from './assets/assets3.jpg'

Vue.use(Previewer)

export default {
    methods: {
        previewerImages() {
            this.$previewImages([assets1, assets2, assets3], 0)
        }
    }
}
</script>
```
:::

### Previewer Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| urls | 预览的图片列表 | Array | — | [] |
| index | 打开第一张图片下标 | Number | — | 0 |
| options | 全局配置：https://photoswipe.com/documentation/options.html | Object | — | - |