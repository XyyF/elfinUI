<script>
    import baseVue from './import.js'

    export default baseVue
</script>
## transition-auto-height  高度变化动画
屏幕改变时, 高度自动变化，可设置高度变化动画的效果

### 标准用法
接收由slot传出的transStyle 并应用于Style样式 且需要改变高度触发动画,如例
:::component 
```html
<template>
<div >
       <transition-auto-height :item-count="itemCount" :single-duration="singleDuration">
         <p  class="el-dialog" :style="{'height': size +'px', 'transition':  transStyle.transStyle.transition}" slot-scope="transStyle" >
         {{changeText}}
</p>
       </transition-auto-height>
       <el-button @click.native="handleChangeHeight">点击我高度增加</el-button>
</div>
    
</template>

<script>
import transitionAutoHeight from 'packages/transition-auto-height/src/main.vue'

export default {
    components: {
        transitionAutoHeight
    },
    data() {
        return {
            changeText: '当我高度改变时,会根据传入的参数使用动画改变高度哦',
            size: 50,
            itemCount: 40,
            singleDuration: 10
        }
    },
    methods: {
        handleChangeHeight() {
            this.size += this.size
        }
    }
}
</script>
```
:::

### transition-auto-height Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| itemCount | 单个 item 动画时间/ms | Number | - | 0 |
| singleDuration | 如果设置了singleDuration，动画时间将是 item 数量乘以 singleDuration | Number | - | 0 |

