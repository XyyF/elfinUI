### ActionSheet Attributes

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

### Actions 数据结构

`actions`属性为一个对象数组，数组中的每个对象配置一列，对象可以包含以下值：

| 键名 | 说明 | 类型 |
|------|------|------|
| name | 标题 | *string* |
| subname | 二级标题 | *string* |
| color | 选项文字颜色 | *string* |
| className | 为对应列添加额外的 class | *any* |
| loading | 是否为加载状态 | *boolean* |
| disabled | 是否为禁用状态 | *boolean* |

### Events

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| select | 选中选项时触发，禁用或加载状态下不会触发 | *action: Action, index: number* |
| cancel | 取消按钮点击时触发 | - |
| open | 打开菜单时触发 | - |
| close | 关闭菜单时触发 | - |
| opened | 打开菜单且动画结束后触发 | - |
| closed | 关闭菜单且动画结束后触发 | - |
| click-overlay | 点击遮罩层时触发 | - |

注册:

```js
import {ElfinActionSheet} from '@packages/previewer'

Vue.use(ElfinActionSheet)
```

使用:

```js
this.$actionSheet()
```