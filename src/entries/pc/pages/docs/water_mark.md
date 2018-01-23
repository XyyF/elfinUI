<script>
  import ReWaterMark from 'package/water_mark_component/src/main.vue'
  
  export default {
    data() {
          return {
            msg: '自定义文字',
          };
    },
    components: {
        ReWaterMark,
    }
  }
</script>

<style>
.profile-water-mark {
    position: relative !important;
}
</style>

## WaterMark 水位标志-占位符

用于页面中没有信息时的展示。

### 基本用法

由图片和文字组成。

:::pc 在waterMark组件中，如果不设置props，那么会使用默认的图片和文字。
```html
<template>
  <re-water-mark></re-water-mark>
</template>
```
:::

### 自定义内容

可自定义图片和文字。

:::pc 定义`img`属性、`msg`属性，接受`String`类型。
```html
<template>
  <re-water-mark :msg="msg"></re-water-mark>
</template>

<script>
  export default {
    data() {
          return {
            msg: '自定义文字',
          };
    },
  }
</script>
```
:::

### WaterMark Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| img | 图片路径 | String | — | — |
| msg | 文字 | String | — | 没有任何记录哦 |
