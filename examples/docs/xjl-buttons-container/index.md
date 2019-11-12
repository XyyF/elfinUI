<script>
    import baseVue from './import.js'

    export default baseVue
</script>
## xjl-buttons-container
searchable参数格式为:
```js
{
    value: 'one',
    label: '选项一'
}
```
### xjl-buttons-container 用法
该组件有一个默认插槽以及一个name为filter的插槽
:::component xjl-buttons-container
```html
<template>
    <xjl-buttons-container 
    :searchable="searchable" 
    :search-options="searchOptions"
    :search-type-prop.sync="searchTypeProp"
    >
        <p>默认插槽</p>
        <p slot="filter">name为filter的插槽</p>
</xjl-buttons-container>
</template>

<script>
import xjlButtonsContainer from 'packages/xjl-buttons-container/index.vue'

export default {
    components: {
        xjlButtonsContainer
    },
    data() {
      return {
            searchable: true,
            searchOptions: [{
                value: 'one',
                label: '选项一'
            },{
                value: 'two',
                label: '选项二'
            },{
                value: 'three',
                label: '选项三'
            }],
            searchTypeProp: '默认搜索值'
        }
    }
}
</script>
```
:::


### xjl-buttons-container Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| searchable | 是否使用搜索栏  | Boolean | true/false | false |
| searchOptions | 搜索选项 | Array | - | [] |
| searchTypeProp | 默认搜索值 | String/Number | - | 1 |
