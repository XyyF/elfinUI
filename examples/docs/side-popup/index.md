<script>
    import baseVue from './import.js'

    export default baseVue
</script>
## sidePopup
注册插件的形式使用， 在Vue.prototype上定义sidePopup的实例
### sidePopup 标准用法
:::component 
```html
<template>
    <el-button @click.native="show">
    上方弹出sidePopup
    </el-button>
</template>

<script>
import sidePopup from 'packages/side-popup/index.js'
import Vue from 'vue'
import TestComponent1 from './test-component1'

Vue.use(sidePopup,{})
export default {

    data() {
        return {

        }
    },
    methods: {
     show() {
            this.$sidePopup.config({
                    position: 'top'
            }).show(TestComponent1, {
                props: {
                    sidePopupData: '外部传入弹窗内部的自定义参数',
                }
            }).onClose((params) => {
                this.$message(`component1关闭回调，参数：${params}`)
            })
        } 
    }
}
</script>
```
:::

### 弹窗内嵌套弹窗场景
:::component 
```html
<template>
    <el-button @click.native="show2">
    嵌套弹出sidePopup
    </el-button>
</template>

<script>
import sidePopup from 'packages/side-popup/index.js'

import TestComponent2 from './test-component2'

Vue.use(sidePopup,{
})
export default {

    data() {
        return {

        }
    },
    methods: {
        show2() {
            this.$sidePopup.config({
                        position:'left'
                })
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
### sidePopup Attributes

| 方法名          | 说明            |        参数   |
|------------- |---------------- |---------------- |
| config | 传入定位方向参数(position) | Object(params) |
| show | 打开执行一个sidePopup | Function(HTMLDom, Object) |
| onClose | 设置sidePopup关闭回调 | Function(callback) |
| close | 关闭当前sidePopup | Function(params) |

