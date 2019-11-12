<script>
    import baseVue from './import.js'

    export default baseVue
</script>
## 城市选择
### 标准用法
使用地址code 默认等级3 是否全部任意 等级小于3时,不能输入详细地址
:::component 
```html
<template>
    <area-select :value="value" :is-show-all="isShowAll" :level="level" :address-detail-prop="addressDetailProp"></area-select>
</template>

<script>
import areaSelect from 'packages/area-select/index.vue'

export default {
    components: {
        areaSelect
    },
    data() {
        return {
            value2: '',
            isShowAll2: false,
            level2: 4,
            addressDetailProp2: ''
        }
    }
}
</script>
```
:::

### 完全用法
使用地址code 等级4(大于3)且不允许全部时 可以输入最大长度为50的默认地址并使用
:::component 
```html
<template>
    <area-select :value="value1" :is-show-all="isShowAll1" :level="level1" :address-detail-prop="addressDetailProp1"></area-select>
</template>

<script>
import areaSelect from 'packages/area-select/index.vue'

export default {
    components: {
        areaSelect
    },
    data() {
        return {
            value1: '110101',
            isShowAll1: true,
            level1: 4,
            addressDetailProp1: '重庆市荣昌县昌元镇新公安局'
        }
    }
}
</script>
```
:::

### 选择全部
不使用地址code level等级任意 允许全部时 选项中可出现选择全部
:::component 
```html
<template>
    <area-select :value="value2" :is-show-all="isShowAll2" :level="level2" :address-detail-prop="addressDetailProp2"></area-select>
</template>

<script>
import areaSelect from 'packages/area-select/index.vue'

export default {
    components: {
        areaSelect
    },
    data() {
        return {
            value1: '110101',
            isShowAll1: true,
            level1: 4,
            addressDetailProp1: '重庆市荣昌县昌元镇新公安局'
        }
    }
}
</script>
```
:::

### areaSelect Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| value | 地址code码 | String | 使用code码展示默认地址数据，参考area.js文件 | - |
| isShowAll | 是否允许选择'全部'选项 | Boolean | true/false | false |
| level | 联动级别 1->省，2->省市联动，3->省市区联动  | Number | 1\2\3\大于等于4 | 3 |
| addressDetailProp | 输入地址时的默认地址 | String | - | 空 |
