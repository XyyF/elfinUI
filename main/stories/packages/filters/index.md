### ElfinFilters Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------------- |---------------- |---------------- |---------------------- |-------- |
| value | 绑定的值 | Object | — | {} |
| visible | 是否展开低频筛选区 | Boolean | — | false |

### ElfinFilters Events

| 事件名 | 说明 | 回调参数 |
|------------- |---------------- |---------------- |
| input | 在 value 值改变时触发 | (value: object) |
| update:visible | 在 低频筛选时展开状态 改变时触发 | (value: boolean) |