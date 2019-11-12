<script>
    import baseVue from './import.js'

    export default baseVue
</script>
## xjl-tabs

### xjl-tabs  用法
:::component tag图标
```html
<template>
    <xjl-tabs 
    :tabs-options="tabsOptions"
    :placeholder="placeholder"
    :is-show-search="isShowSearch"
    :before-leave="beforeLeave"
    >

</xjl-tabs>
</template>

<script>
import xjlTabs from 'packages/xjl-tabs/index.vue'

export default {
    components: {
        xjlTabs
    },
    data() {
        return {
            tabsOptions: [{
                value: 't1',
                lable:'用户管理'
            }, {
                value: 't2',
                lable:'教室管理'
            }],
            placeholder: '我是默认值',
            isShowSearch: true,
            beforeLeave: () => {
                console.log('切换前可以阻止切换')
            }
        }  
    }
}
</script>
```
:::




### xjl-tabs Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| tabsOptions | tab列表 | Array | - | [] |
| placeholder | 搜索框提示信息 | String | - | - |
| isShowSearch | 是否显示搜索框 | Boolean | true/false | true |
| beforeLeave | tab切换前，可以阻止切换 | Function | - | null |

