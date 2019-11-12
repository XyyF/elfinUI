<script>
    import baseVue from './import.js'

    export default baseVue
</script>
## xjl_tag 图标
选择不同的样式、颜色、尺寸实现图标
### rect 图标用法
:::component tag图标
```html
<template>
    <xjl-tag :type="type" :theme="theme" :size="size">tag</xjl-tag>
</template>

<script>
import XjlTag from 'packages/xjl_tag/index.vue'

export default {
    components: {
        XjlTag
    },
    data() {
        return {
            type:'rect',
            theme: 'BLUE',
            size: 'SMALL'
        }
    }
}
</script>
```
:::

### arrow 图标用法
:::component tag图标
```html
<template>
    <xjl-tag :type="type1" :theme="theme1" :size="size1">tag</xjl-tag>
</template>

<script>
import XjlTag from 'packages/xjl_tag/index.vue'

export default {
    components: {
        XjlTag
    },
    data() {
        return {
            type1:'arrow',
            theme1: 'RED',
            size1: 'NORMAL'
        }
    }
}
</script>
```
:::

###  颜色 演示
:::component tag图标
```html
<template>
    <xjl-tag :type="type1" :theme="theme1" :size="size1">tag</xjl-tag>
    <xjl-tag :type="type2" :theme="theme2" :size="size2">tag</xjl-tag>
    <xjl-tag :type="type3" :theme="theme3" :size="size3">tag</xjl-tag>
    <xjl-tag :type="type4" :theme="theme4" :size="size4">tag</xjl-tag>
    <xjl-tag :type="type5" :theme="theme5" :size="size5">tag</xjl-tag>
    <xjl-tag :type="type6" :theme="theme6" :size="size6">tag</xjl-tag>
</template>

<script>
import XjlTag from 'packages/xjl_tag/index.vue'

export default {
    components: {
        XjlTag
    },
    data() {
        return {
            type1:'arrow',
            theme1: 'RED',
            size1: 'SMALL',
            type2:'arrow',
            theme2: 'PURPLE',
            size2: 'SMALL',
            type3:'arrow',
            theme3: 'YELLOW',
            size3: 'SMALL',
            type4:'arrow',
            theme4: 'GREEN',
            size4: 'SMALL',
            type5:'arrow',
            theme5: 'PINK',
            size5: 'SMALL',
            type6:'arrow',
            theme6: 'PINK',
            size6: 'SMALL',
        }
    }
}
</script>
```
:::

### xjl_tag Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| type | 样式类型 | String | rect/arrow | arrow |
| theme | 主题模板 | String | RED/PURPLE/YELLOW/GREEN/PINK/BLUE | BLUE |
| size | 图标尺寸 | String | SMALL/NORMAL | NORMAL |
