# elfinUI

基于 StoryBook展示 + lerna管理 的UI库；

[在线demo](https://codesandbox.io/s/elfinui-yndtm)

## 运行
```bash
npm install --global lerna
lerna bootstrap
lerna add elfin-ui@1.0.0
```

## 组件设计形式
- 如果一个组件可以 **独立出业务组件的DOM结构，将组件挂载在body下使用**，可以考虑通过 <u>单例模式</u> 设计
    - 如果需要拿到组件的实例this，可以在 Vue.prototype 上挂载function
    - [单例模式](https://github.com/XyyF/elfinUI/blob/master/summary/singleton-mode.md)
    - [注册、解绑方案](https://github.com/XyyF/elfinUI/blob/master/summary/on-and-off-program.md)
- 如果一个组件有 **多种形态，由外部控制切换**，可以通过 <u>工厂模式</u> 设计
    - [工厂模式](https://github.com/XyyF/elfinUI/blob/master/summary/factory-mode.md)

## 设计原则
- 职责单一：针对功能块，组件的职责应该尽可能的单一，拆分出 Component + ComponentItem 形式拆分组件内部逻辑
- 最少知识：考虑props、$emit应该尽可能的方便使用者
- 组件隔离：组件内部的状态应该尽可能由自己来维护
    - [可控与不可控](https://github.com/XyyF/elfinUI/blob/master/summary/controllable.md)
- 通用性考虑：组件是小而可复用

## 组件实例

- elfinButtons 组件内部状态高度集中 + 工厂模式设计
- elfinFilters 通过组件拆分将内部状态解藕 + 工厂模式设计
- previewer 单例模式挂载function，优势：可以在function中获取组件实例this，JSAPI模式动态挂载组件
- actionSheet 单例模式挂载属性，优势：尽可能的降低对业务的干扰，JSAPI模式动态挂载组件

## 计划

1. 参照VSCODE 的插件动态注册功能 的实现demo
