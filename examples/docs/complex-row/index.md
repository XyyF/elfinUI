<script>
    import baseVue from './import.js'

    export default baseVue
</script>
## xjl-buttons  按钮控件
一共七种不同类型（1-7）的按钮控件,根据传入不同参数的type与其他属性使用 </br>
*每个组件的参数不一样，请参考案例*
### 标准用法 (所有用法)
可以一次配置多个或全部

### type 1 按钮用法
:::component
```html
<template>
    <div>
         1231
    </div>
</template>

<script>
</script>
```
:::
### xjl-buttons Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| buttonsConfig | 要使用的按钮数组 | Array | - | [] |
| searchable | 是否使用搜索栏 | Boolean | true/false | false |
| placeholder | 搜索框提示信息 | String | - | '请输入' |
| value | 下拉框相关值 | Object | - | {} |

