<script>
    import baseVue from './import.js'

    export default baseVue
</script>

## tooltip-tag 结合tooltip和tag的控件

tag中有默认的配置：
```js
{
    size: 'small'
}
```
tooltip中有默认的配置：
```js
{
    effect: 'dark',
    placement: 'top-start'
}
```

### 标准用法
:::component 默认设置
```html
<template>
    <tooltip-tag :config="defaultConfig"></tooltip-tag>
</template>

<script>
import TooltipTag from 'packages/tooltip-tag/index'

export default {
    components: {TooltipTag},
    data() {
        return {
            defaultConfig: {
                tag: {
                    label: 'tag',
                },
                tooltip: {
                    content: '这个是tooltip内容'
                }
            }
        }
    }
}
</script>
```
:::

### 禁用tooltip
:::component 不设置tooltip
```html
<template>
    <tooltip-tag :config="onlyTagConfig"></tooltip-tag>
</template>

<script>
import TooltipTag from 'packages/tooltip-tag/index'

export default {
    components: {TooltipTag},
    data() {
        return {
            onlyTagConfig: {
                tag: {
                    label: 'tag',
                },
                tooltip: {
                    disabled: true
                }
            }
        }
    }
}
</script>
```
:::

### TooltipTag Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| tag | tag的配置项 | Object | — | - |
| tag.size | tag大小 | String | medium / small / mini | small |
| tag.label | tag的内容 | String | - | - |
| tag-- | 更多的配置项请参考https://element.eleme.io/#/zh-CN/component/tag#attributes | - | - | - |
| tooltip | tag的配置项 | Object | — | - |
| tooltip.effect | 默认提供的主题 | String | dark/light | dark |
| tooltip.placement | Tooltip 的出现位置 | String | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | top-start |
| tooltip.content | tooltip的内容 | String | - | - |
| tooltip.disabled | 是否禁用tooltip | Boolean | - | false |
| tooltip-- | 更多的配置项请参考https://element.eleme.io/#/zh-CN/component/tooltip#attributes | - | - | - |
