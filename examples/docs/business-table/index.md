<script>
    import baseVue from './import.js'

    export default baseVue
</script>

## business-table 表格

使用extends继承语法

### 标准用法
:::component 在slot中自定义上传样式
```html
<template>
    <base-table></base-table>
</template>

<script>
import BaseTable from 'packages/business-table/index-full-el'

export default {
    extends: BaseTable,
    data() {}
}
</script>
```
:::

### businessTable Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |