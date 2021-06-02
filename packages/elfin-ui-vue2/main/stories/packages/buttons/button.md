### ElfinButtons Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------------- |---------------- |---------------- |---------------------- |-------- |
| buttonsConfig | 按钮组配置信息 | Array | -- | [] |
| buttonsConfig.type | 按钮渲染类型 | Number | -- | ElfinButtonsItemType.BUTTON |
| buttonsConfig.label | 按钮前缀说明 | string | -- | '' |
| buttonsConfig.hidden | 按钮是否隐藏 | Boolean | -- | false |
| buttonsConfig.itemOptions | 传递给底层按钮组件的配置项 | Object | -- | {} |
| buttonsConfig.itemOptions.props | 传递给底层按钮的props | Object | -- | null |
| buttonsConfig.itemOptions.on | 传递给底层按钮的on | Object | -- | null |
| buttonsConfig.itemOptions.renderSlot | 底层按钮的静态插槽 | Object | -- | null |

```js
import {ElfinButtons, ElfinButtonsItemType} from '@packages/buttons'

const buttonsConfig = [
    {
        type: ElfinButtonsItemType.BUTTON,
        label: 'label',
        hidden: true,
        itemOptions: {
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
            // 通过作用域插槽来渲染静态插槽
            scopedSlots: {
                default(h) {},
            },
        },
    },
]
```