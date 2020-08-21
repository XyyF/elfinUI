# 单例模式

> 业务场景：适用于全局只有一个实例对象

### 实例

vue-router

### 单例模式下的Vue组件设计艺术

思路：运用 Vue.extend() 动态的挂载组件

- 实现单例面向 使用者 的入口

```js
let sheet = null
Object.defineProperty(Vue.prototype, '$actionSheet', {
    get() {
        if (!sheet) {
            sheet = new ActionSheetClass()
        }
        return sheet
    },
    set() {
        throw new Error('disallow modify $create-contract')
    },
})
```

- 面向 使用者 的入口功能实现

```js
class ActionSheetClass {
    constructor() {
        // actionSheetInstance 用来实现在Class中与Options进行交互
        this.actionSheetInstance = this.init()
    }

    init() {
        // 初始化组件 & 挂载组件
        const instanceRoot = Vue.extend(actionSheetOptions)
        const root = new InstanceRoot().$mount()
        document.querySelector('body').appendChild(root.$el)
        return root
    }
}
```

- 面向 组件 的功能实现

```js
// 可以通过实例 actionSheetInstance 进行交互
const actionSheetOptions = {
    name: 'action-sheet-wrapper',
    render() {},
}
```