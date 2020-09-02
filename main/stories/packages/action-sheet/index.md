### ActionSheet Methods

| 方法名          | 说明            | 类型   | 默认值 |
|------------- |---------------- |---------------- |---------------------- |-------- | ---- |
| options | jsx渲染选项 | Object | - |
| options.props | 传入组件的选项 | Object | - |
| options.props.actions | 菜单选项 | *Action[]* | `[]` |
| options.props.title | 顶部标题 | *string* | - |
| options.props.cancel-text | 取消按钮文字 | *string* | - |
| options.props.description | 选项上方的描述信息 | *string* | - |
| options.props.close-icon | 关闭[图标名称](#/zh-CN/icon)或图片链接 | *string* | `cross` |
| options.props.duration | 动画时长，单位秒 | *number \| string* | `0.3` |
| options.props.round | 是否显示圆角 | *boolean* | `true` |
| options.props.overlay | 是否显示遮罩层 | *boolean* | `true` |
| options.props.lock-scroll | 是否锁定背景滚动 | *boolean* | `true` |
| options.props.lazy-render | 是否在显示弹层时才渲染节点 | *boolean* | `true` |
| options.props.close-on-click-action | 是否在点击选项后关闭 | *boolean* | `false` |
| options.props.close-on-click-overlay | 是否在点击遮罩层后关闭 | *boolean* | `true` |
| options.props.safe-area-inset-bottom | 是否开启[底部安全区适配](#/zh-CN/quickstart#di-bu-an-quan-qu-gua-pei) | *boolean* | `true` |
| get-container | 指定挂载的节点，[用法示例](#/zh-CN/popup#zhi-ding-gua-zai-wei-zhi) | *string \| () => Element* | - |
| options.on | 监听组件抛出的事件 | Object | - |

注册:

```js
import {ElfinActionSheet} from '@packages/previewer'

Vue.use(ElfinActionSheet)
```

使用:

```js
this.$actionSheet()
```