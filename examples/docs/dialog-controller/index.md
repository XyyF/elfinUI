<script>
    import baseVue from './import.js'

    export default baseVue
</script>

## dialog-controller 弹窗控制器

注册插件的形式使用，会在Vue.prototype上定义dialog的实例

### 标准用法
:::component 通过this.$dialog调用弹窗相关的config、show、onClose方法
```html
<template>
    <el-button size="medium" @click.native="show1">
        打开dialog
    </el-button>
</template>

<script>
import Vue from 'vue'
import Dialog from 'packages/dialog-controller/index.js'

import TestComponent1 from './test-component1'

Vue.use(Dialog, {
    width: '600px'
})

export default {
    methods: {
        show1() {
            this.$dialog
                .config({
                    props: {
                        width: '450px',
                        title: '新建弹窗'
                    }
                })
                .show(TestComponent1, {
                    props: {
                        dialogData: '外部传入弹窗内部的自定义参数'
                    }
                })
                .onClose((params) => {
                    this.$message(`component1关闭回调，参数：${params}`)
                })
        }
    }
}
</script>
```
:::

### 弹窗内嵌套弹窗场景
:::component 满足一个弹窗内部再次调用一个弹窗的场景
```html
<template>
    <el-button size="medium" @click.native="show2">
        打开dialog
    </el-button>
</template>

<script>
import Vue from 'vue'
import Dialog from 'packages/dialog-controller/index.js'

import TestComponent2 from './test-component2'

Vue.use(Dialog, {
    width: '600px'
})

export default {
    methods: {
        show2() {
            this.$dialog
                .show(TestComponent2, {
                    props: {
                        dialogData: '外部传入弹窗内部的自定义参数'
                    }
                })
                .onClose((params) => {
                    this.$message(`component2关闭回调，参数：${params}`)
                })
        }
    }
}
</script>
```
:::

### dialogController Methods

| 方法名          | 说明            | 参数   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| config | 设置dialog配置,如宽度等 | Function(Object) |
| show | 打开一个执行的dialog | Function(HTMLDom, Object) |
| onClose | 设置dialog关闭回调 | Function(callback) |
| close | 关闭当前的dialog实例 & 设置onClose回调参数 | Function(params) |