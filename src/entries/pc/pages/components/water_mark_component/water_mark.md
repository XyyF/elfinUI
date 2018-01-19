<script>
  import waterMark from './water_mark.vue'
  
  export default {
    data() {
          return {
            msg: '自定义文字',
          };
    },
    components: {
        waterMark,
    }
  }
</script>

<style>
.profile-water-mark {
    position: relative !important;
}
</style>

## waterMark 水位标志-占位符

用于页面中没有信息时的展示。

### 基本用法

由图片和文字组成。

:::demo 在waterMark组件中，如果不设置props，那么会使用默认的图片和文字。
```html
<template>
  <water-mark></water-mark>
</template>
```
:::

### 自定义内容

可自定义图片和文字。

:::demo 定义`img`属性、`msg`属性，接受`String`类型。
```html
<template>
  <water-mark :msg="msg"></water-mark>
</template>

<script>
  import waterMark from './water_mark.vue'
  
  export default {
    data() {
          return {
            msg: '自定义文字',
          };
    },
    components: {
        waterMark,
    }
  }
</script>
```
:::
