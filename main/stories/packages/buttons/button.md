### XjlButtons Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------------- |---------------- |---------------- |---------------------- |-------- |
| buttonsConfig | 按钮组配置信息 | Array | -- | [] |
| buttonsConfig.title | 按钮slot文本 | String | -- | '' |
| buttonsConfig.props | 传递给按钮的props | Object | -- | '' |
| buttonsConfig.on | 传递给按钮的on | Object | -- | '' |

```js
import ItemTypes from '@packages/xjl-buttons/item-type'

const buttonsConfig = [
    {
        type: ItemTypes.BUTTON,
        title: '按钮slot文本',
        // 以下配置会当作jsx语法传入 el-button
        // https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
        props: {
            // 传递给 el-button 的props选项，参考地址：
            // https://element.eleme.cn/#/zh-CN/component/button#attributes
            type: 'primary',
            icon: 'el-icon-plus',
        },
        on: {
            // 传递给 el-button 的on选项，参考地址：
            // https://element.eleme.cn/#/zh-CN/component/button
        },
    },
]
```