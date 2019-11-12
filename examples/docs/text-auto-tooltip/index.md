<script>
    import baseVue from './import.js'

    export default baseVue
</script>

## text-auto-tooltip 文本超出自动设置移入鼠标展示tooltip

使用前，请在package.json加入相关的配置：
```js
"browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
]
```

### 标准用法 - 单行文本
:::component 默认设置
```html
<template>
    <div style="width: 200px;">
        <text-auto-tooltip>
            这是一段文本;这是一段文本;这是一段文本;这是一段文本;这是一段文本;
        </text-auto-tooltip>
    </div>
</template>

<script>
import TextAutoTooltip from 'packages/text-auto-tooltip/index'

export default {
    components: {TextAutoTooltip},
}
</script>
```
:::

### 多行文本
:::component 设置line为2
```html
<template>
    <div style="width: 200px;">
        <text-auto-tooltip :line="2">
            这是一段文本;这是一段文本;这是一段文本;这是一段文本;这是一段文本;
        </text-auto-tooltip>
    </div>
</template>

<script>
import TextAutoTooltip from 'packages/text-auto-tooltip/index'

export default {
    components: {TextAutoTooltip},
}
</script>
```
:::

### TextAutoTooltip Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| line | 指定文本在第几行换行的时候设置tooltip | Number | — | 1 |