### XjlButtons Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------------- |---------------- |---------------- |---------------------- |-------- |
| buttonsConfig | 按钮组配置信息 | Array | -- | [] |
| buttonsConfig.type | 按钮类型 | Number | -- | -- |
| buttonsConfig.hidden | 是否隐藏当前item | Boolean | -- | false |
| buttonsConfig.right | 当前item是否靠右展示 | Boolean | -- | false |
| buttonsConfig.label | 当前item的标题 | String | -- | -- |

```js
import ItemTypes from '@packages/xjl-buttons/item-type'

const buttonsConfig = [
    {
        type: ItemTypes.BUTTON,
        hidden: false,
        right: false,
        label: 'item标题',
    },
]
```