<script>
  import ReSlideContainer from 'package/slide_full_page_component/src/main.vue'
  import ReSlideSection from 'package/slide_full_page_component/src/slide_section.vue'
  
  export default {
    data() {
        return {}
    },
    components: {
        ReSlideContainer,
        ReSlideSection
    }
  }
</script>

<style>
.slide-full-page-root {
    height: 180px !important;
}
</style>

## SlideFullPage 全屏滚动

适用于整屏，或者固定大小的元素进行滚动。

### 基本用法

:::pc 在SlideFullPage组件中。
```html
<template>
  <re-slide-container>
    <re-slide-section>111</re-slide-section>
    <re-slide-section>222</re-slide-section>
    <re-slide-section>333</re-slide-section>
  </re-slide-container>
</template>
```
:::

### SlideFullPage Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
|  |  |  | — | — |
|  |  |  | — |  |
