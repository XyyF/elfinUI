<script>
  import RePopupBoard from 'package/popup_board_component/src/main.vue'
  
  export default {
    data() {
          return {
            title: '主标题',
            subtitle: '副标题',
            menuItems: [{
                id: '1', name: '侧边栏1'
            }, {
                id: '2', name: '侧边栏2'
            }],
            subPageId: '',
          };
    },
    methods: {
       switchSubPage(subPageId) {
          this.subPageId = subPageId
       },
       close() {
          this.$router.back()
       }
    },
    components: {
        RePopupBoard,
    }
  }
</script>

## PopupBoard 弹出板

用于弹出板的形式展示信息。

### 基本用法

由header + 侧边栏 + 主题内容构成

:::pc `@select`事件是侧边栏点击触发事件;`@close`关闭popup触发事件
```html
<template>
    <re-popup-board
        :title="title"
        :sub-title="subtitle"
        :menu-items="menuItems"
        :default-actived-id="menuItems[0].id"
        @select="switchSubPage"
        @close="close"
        class="teacher-detail"
    >
        <div class="teacher-detail-wrap">
            {{subPageId}}
        </div>
        <div slot="navButton">
            navButton
        </div>
    </re-popup-board>
</template>

<script>
  export default {
    data() {
          return {
            title: '主标题',
            subtitle: '副标题',
            menuItems: [{
                id: '1', name: '侧边栏1'
            }, {
                id: '2', name: '侧边栏2'
            }],
            subPageId: '',
          };
    },
    methods: {
       switchSubPage(subPageId) {
          this.subPageId = subPageId
       },
       close() {
          this.$router.back()
       }
    }
  }
</script>
```
:::


### PopupBoard Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| menuItems | 侧边栏选项 | Array | — | [] |
| title | 主标题 | String | — | — |
| subTitle | 副标题 | String | — | — |
| defaultActivedId | 默认选中侧边栏哪一项 | [String , Number] | — | — |

### calendar Events

| 事件名称          | 说明            | 回调参数
|------------- |---------------- |----------------
| select | 选中侧边栏触发的事件 | subPageId: 选中的侧边栏Id
| close | 关闭popupBoard调用事件 | — |
