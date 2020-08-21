# 注册、解绑方案

### 注册

可以通过挂载 Vue.prototype.$register 使用

- 这样可以拿到组件内部的状态，因为是在组件内 this.$register 调用
- 可以监听 this.$on('hook:beforeDestroy') 组件注销的事件

### 解绑

在 hook:beforeDestroy 事件中进行自动解绑

- 避免忘记解绑而导致的问题