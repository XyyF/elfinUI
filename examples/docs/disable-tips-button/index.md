<script>
    import baseVue from './import.js'

    export default baseVue
</script>

## disable-tip-button 禁用提示按钮

### 标准用法
:::component 该组件只有在disabled为true时，有效
```html
<template>
    <disable-tips-button :disabled="true" tooltip="禁用原因">
        按钮
    </disable-tips-button>
</template>

<script>
import DisableTipsButton from 'packages/disable-tips-button/src/main'

export default {
    components: {DisableTipsButton}
}
</script>
```
:::

### tooltip对象用法
:::component
```html
<template>
    <disable-tips-button :disabled="true" :tooltip="tooltip">
        按钮
    </disable-tips-button>
</template>

<script>
import DisableTipsButton from 'packages/disable-tips-button/src/main'

export default {
    components: {DisableTipsButton}
    data() {
        return {
            tooltip: {
                content: '禁用原因'
            }
        }
    }
}
</script>
```
:::

### 启用按钮
:::component 按钮若是启用状态，tooltip不会生效
```html
<template>
    <disable-tips-button :disabled="false" tooltip="禁用原因">
        按钮
    </disable-tips-button>
</template>

<script>
import DisableTipsButton from 'packages/disable-tips-button/src/main'

export default {
    components: {DisableTipsButton}
}
</script>
```
:::

### disableTipsButton Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| disabled | 是否禁用按钮 | Boolean | — | false |
| ... | 按钮的配置项请参考https://element.eleme.io/#/zh-CN/component/button#attributes | - | - | - |
| tooltip | 弹出层的配置 | [String | Object] | — | '当前不可用' |
| tooltip-- | 对象形式的配置项请参考https://element.eleme.io/#/zh-CN/component/tooltip#attributes | - | - | - |