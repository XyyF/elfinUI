### ActionSheet Methods

| 方法名          | 说明            | 类型   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| $previewImages | 展示图片 | Function |
| $previewImages.urls | 图片url列表 | Array |
| $previewImages.idx | 默认展示图片的下标,默认0开始 | Number |
| $previewImages.options | [photoswipe配置](https://photoswipe.com/documentation/options.html) | Object |

注册:

```js
import {ElfinActionSheet} from '@packages/previewer'

Vue.use(ElfinActionSheet)
```

使用:

```js
this.$actionSheet.openSheet()
```