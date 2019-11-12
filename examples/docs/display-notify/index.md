<script>
    import baseVue from './import.js'

    export default baseVue
</script>

## display-notify 通知

注册插件的形式使用，会在Vue.prototype上定义打开displayNotify的方法

### 标准用法
:::component 通过组件this调用$displayNotify
```html
<template>
    <el-button size="medium" @click.native="displayNotify">
        打开displayNotify
    </el-button>
</template>

<script>
import Vue from 'vue'
import DisplayNotify from 'packages/display-notify/index.js'

Vue.use(DisplayNotify)

export default {
    methods: {
        displayNotify() {
            this.$displayNotify()
        }
    }
}
</script>
```
:::

### DisplayNotify Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| notifyId | notify对应的ID值 | String | — | - |