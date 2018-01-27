<script>
  import ReAvatarList from 'package/avatar_list_component/src/main.vue'
  
  export default {
      data() {
          return {
              infoList: [{
                  avatar: '',
                  gender: 3,
                  name: 'rengar',
              }],
              infoList2: [{
                  avatar: '',
                  gender: 3,
                  name: 'rengar',
                  accountId: '1',
              },{
                  avatar: '',
                  gender: 2,
                  name: 'nate',
                  accountId: '2',
              },{
                  avatar: '',
                  gender: 1,
                  name: 'butters',
                  accountId: '3',
              }],
              showCheckedWrap: true,
              relation: [{
                  groupId: 'GUAN_XI_1',
                  name: '关系1',
              }, {
                  groupId: 'GUAN_XI_2',
                  name: '关系2',
              }, {
                  groupId: 'GUAN_XI_3',
                  name: '关系3',
              }],
              infoList3: [{
                  avatar: '',
                  gender: 3,
                  name: 'rengar',
                  accountId: '1',
                  groupIds: ['GUAN_XI_1'],
              },{
                  avatar: '',
                  gender: 1,
                  name: 'nate',
                  accountId: '2',
                  groupIds: ['GUAN_XI_2', 'GUAN_XI_3'],
              },{
                  avatar: '',
                  gender: 2,
                  name: 'butters',
                  accountId: '3',
                  groupIds: ['GUAN_XI_1', 'GUAN_XI_3'],
              }],
          }
      },
      components: {
          ReAvatarList
      }
  }
</script>

## AvatarList 头像列表显示框

用于展示头像列表。

### 基本用法

只是显示头像列表，没有操作

:::pc 定义`infoList`属性，接受`Array`类型，用于展示的列表。`avatar`属性是头像图片，没有会使用默认的；`gender`是性别，可选值有1、2、3；`name`是姓名
```html
<template>
  <re-avatar-list :info-list="infoList"></re-avatar-list>
</template>

<script>
  export default {
      data() {
          return {
              infoList: [{
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

### 角色筛选

对列表中的角色进行简单的筛选操作

:::pc `showCheckedWrap`属性控制显示筛选、全选按钮，此时需要唯一的`accountId`字段进行区分。
```html
<template>
  <re-avatar-list :show-checked-wrap="showCheckedWrap" :info-list="infoList2"></re-avatar-list>
</template>

<script>
  export default {
      data() {
          return {
              infoList2: [{
                  avatar: '',
                  gender: 3,
                  name: 'rengar',
                  accountId: '1',
              },{
                  avatar: '',
                  gender: 1,
                  name: 'nate',
                  accountId: '2',
              },{
                  avatar: '',
                  gender: 2,
                  name: 'butters',
                  accountId: '3',
              }],
              showCheckedWrap: true,
          }
      }
  }
</script>
```
:::

### 关系筛选

对列表中进行关系筛选操作

:::pc `relation`属性控制关系数组，此时角色需要`groupIds`来包含自己所拥有的关系。
```html
<template>
  <re-avatar-list
        :show-checked-wrap="showCheckedWrap"
        :relation="relation"
        :info-list="infoList3"></re-avatar-list>
</template>

<script>
  export default {
      data() {
          return {
              infoList3: [{
                  avatar: '',
                  gender: 3,
                  name: 'rengar',
                  accountId: '1',
                  groupIds: ['GUAN_XI_1'],
              },{
                  avatar: '',
                  gender: 1,
                  name: 'nate',
                  accountId: '2',
                  groupIds: ['GUAN_XI_2', 'GUAN_XI_3'],
              },{
                  avatar: '',
                  gender: 2,
                  name: 'butters',
                  accountId: '3',
                  groupIds: ['GUAN_XI_1', 'GUAN_XI_3'],
              }],
              showCheckedWrap: true,
              relation: [{
                  groupId: 'GUAN_XI_1',
                  name: '关系1',
              }, {
                  groupId: 'GUAN_XI_2',
                  name: '关系2',
              }, {
                  groupId: 'GUAN_XI_3',
                  name: '关系3',
              }],
          }
      }
  }
</script>
```
:::

### AvatarList Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| infoList | 列表数据         | Array           | —                     | []     |
| showCheckAll | 控制显示筛选     | Boolean         | —                      | false   |
| relation | 关系筛选         | Array           | —                     | []      |
