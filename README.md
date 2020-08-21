# elfinUI

[在线demo](https://codesandbox.io/s/elfinui-yndtm)

## 组件设计形式
- 如果一个组件可以 **独立出业务组件的DOM结构，将组件挂载在body下使用**，可以考虑通过 <u>单例模式</u> 设计
    - 如果需要拿到组件的实例this，可以在 Vue.prototype 上挂载function
- 如果一个组件有 **多种形态，由外部控制切换**，可以通过 <u>工厂模式</u> 设计

## 设计原则
- 职责单一：针对功能块，组件的职责应该尽可能的单一，拆分出 Component + ComponentItem 形式拆分组件内部逻辑
- 最少知识：考虑props、$emit应该尽可能的方便使用者
- 组件隔离：组件内部的状态应该尽可能由自己来维护
- 通用性考虑：组件是小而可复用

## 组件实例

- elfinButtons 工厂模式设计
- previewer 单例模式挂载function，优势：可以在function中获取组件实例this