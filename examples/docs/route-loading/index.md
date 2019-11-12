<script>
    import baseVue from './import.js'

    export default baseVue
</script>

## route-loading 路由加载loading

注册插件的形式使用，会在Vue上定义打开、关闭loading的方法

### 标准用法
:::component 通过Vue调用showRouteLoading和closeRouteLoading
```html
<template>
    <el-button size="medium" @click.native="showRouteLoading">
        打开loading
    </el-button>
    <el-button size="medium" @click.native="closeRouteLoading">
        取消loading
    </el-button>
</template>

<script>
import Vue from 'vue'
import RouteLoading from 'packages/route-loading/index.js'

Vue.use(RouteLoading)

export default {
    methods: {
        showRouteLoading() {
            Vue.showRouteLoading()
        },
        closeRouteLoading() {
            Vue.closeRouteLoading()
        },
    }
}
</script>
```
:::

### routeLoading Methods

| 方法名          | 说明            | 参数   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| showRouteLoading | 打开route-loading | - |
| closeRouteLoading | 关闭route-loading | - |