<script>
    import baseVue from './import.js'

    export default baseVue
</script>
## tabRoutable
使用时可以tabOptions参数可以参考element-ui tabs参数
### tabRoutable 标准用法
:::component 
```html
<template>
    <tab-routable 
    :tab-format="tabFormat"
    :tab-options="tabOptions"></tab-routable>
</template>

<script>
import tabRoutable from 'packages/tab-routable/index.vue'

export default {
    components: {
        tabRoutable
    },
    data() {
        return {
                tabFormat: [{
                    route: 'upload', // 跳转路由
                    label: '跳转到upload',// 标题
                    closable: true, // 是否可关闭
                    disabled: false, // 是否禁用
                    lazy: false // 是否延迟渲染
                },{
                    route: 'form',
                    label: '跳转到form',
                    closable: false,
                    disabled: false,
                    lazy: true
                },{
                    route: 'previewer',
                    label: '跳转到previewer',
                    closable: false,
                    disabled: false,
                    lazy: true
                },
                ],
                tabOptions: {
                    props: {
                    },
                    on: {
                        tabClick(val) {
                            console.log(val)
                        }
                    }
                }
        }
    }
}
</script>
```
:::

### tabRoutable Attributes

| 参数          | 说明            | 类型            | 参数类型               | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| tabFormat | 单个面板参数配置 | Array | Object | [] |
| tabOptions | tabs参数配置| Object | Object | {} |

