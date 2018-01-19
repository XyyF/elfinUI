<script>
  import avatarList from './avatar_list.vue'
  
  export default {
      data() {
          return {
              propInfoList: [{
                  avatar: '',
                  gender: 3,
                  name: 'rengar',
              }],
              propInfoList2: [{
                  avatar: '',
                  gender: 3,
                  name: 'rengar',
              },{
                  avatar: '',
                  gender: 2,
                  name: 'nate',
              },{
                  avatar: '',
                  gender: 1,
                  name: 'butters',
              }],
              showCheckedWrap: true,
          }
      },
      components: {
          avatarList
      }
  }
</script>

## avatarList 头像列表显示框

用于展示头像列表。

### 基本用法

页面中的非浮层元素，不会自动消失。

:::demo 定义`propInfoList`属性，接受`Array`类型，用于展示的列表。avatar属性是头像图片；gender是性别，可选值有1、2、3；name是姓名
```html
<template>
  <avatar-list :prop-info-list="propInfoList"></avatar-list>
</template>

<script>
  export default {
      data() {
          return {
              propInfoList: [{
                  avatar: '',
                  gender: 3,
                  name: 'rengar',
              }]
          }
      }
  }
</script>
```
:::

### 可筛选

页面中的非浮层元素，不会自动消失。

:::demo
```html
<template>
  <avatar-list :showCheckedWrap="true" :prop-info-list="propInfoList2"></avatar-list>
</template>

<script>
  export default {
      data() {
          return {
              propInfoList2: [{
                  avatar: '',
                  gender: 3,
                  name: 'rengar',
              },{
                  avatar: '',
                  gender: 1,
                  name: 'nate',
              },{
                  avatar: '',
                  gender: 2,
                  name: 'butters',
              }],
              showCheckedWrap: true,
          }
      }
  }
</script>
```
:::
