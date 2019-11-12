<script>
    import baseVue from './import.js'

    export default baseVue
</script>
## water-mark 水印

特别说明: 使用该组件需要父组件使用相对定位(relative)和拥有高度(height)
### 标准用法
:::component 自定义图片路径和配字
```html
<template>
    <div style="position: relative;height: 100px;">
        <water-mark-component :msg="msg" :img="img"></water-mark-component>
    </div>

</template>

<script>
import waterMarkComponent from 'packages/water-mark/src/main.vue'

export default {
    components: {
        waterMarkComponent
    },
    data() {
        return {
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563361275588&di=2a51e9cb4d9ab72a582a503b107f2a74&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201508%2F30%2F20150830162311_4QVPw.thumb.700_0.jpeg',
             msg: '校精灵水印',
        }
    }
}
</script>
```
:::

### water-mark Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| img | 图片URL地址 | String | - | - |
| msg | 水印配字 | String | - | - |
