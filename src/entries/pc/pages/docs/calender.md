<script>
  import moment from 'moment'
  import calendar from 'package/calendar_component/src/main.vue'
  
  export default {
      data() {
          return {
              showBottomCircle: [moment('2018-01-19').valueOf()],
              defaultSelectDay: moment('2018-01-19').valueOf() + 12,
              selectDay: Date.now(),
              selectOldDay: Date.now(),
          }
      },
      methods: {
          clickCalendar(v, oldV) {
              this.selectDay = moment(v).format('YYYY-MM-DD')
              this.selectOldDay = oldV
          }
      },
      components: {
          calendar
      }
  }
</script>

## calendar 日历

用于显示日历，以及一些基本的交互；除特殊，这里选中的时间都代表前一天的0点。

### 基本用法，选中默认日期

显示日历列表

:::mobile 基本使用，`defaultSelectDay`接受任意时间戳，表示第一次打开时，选中时间戳对应的日期，不传入默认选中今天
```html
<template>
  <calendar :default-select-day="defaultSelectDay"></calendar>
</template>

<script>
  export default {
      data() {
          return {
              defaultSelectDay: moment('2018-01-19').valueOf() + 12,
          }
      }
  }
</script>
```
:::

### 标记特殊日期

对特定的日期进行标记

:::mobile `showBottomCircle`接受Array类型，包含时间戳。
```html
<template>
  <calendar :show-bottom-circle="showBottomCircle"></calendar>
</template>

<script>
  export default {
      data() {
          return {
            showBottomCircle: [moment('2018-01-19').valueOf()],
          }
      }
  }
</script>
```
:::

### 选中日期的点击事件

点击事件的交互

:::mobile 接受`click-calendar`事件，用于执行点击日历中任一天触发的事件，返回的是时间戳。
```html
<template>
  <calendar @click-calendar="clickCalendar"></calendar>
  <div>{{selectDay}}</div>
  <div>{{new Date(selectOldDay)}}</div>
</template>

<script>
  export default {
      data() {
          return {
              selectDay: Date.now(),
              selectOldDay: Date.now(),
          }
      },
      methods: {
          clickCalendar(v, oldV) {
             this.selectDay = moment(v).format('YYYY-MM-DD')
              this.selectOldDay = oldV
          }
      }
  }
</script>
```
:::

### calendar Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| showBottomCircle | 需要特殊标记的日期，接受时间戳数组         | Array           | —                     | []     |
| defaultSelectDay | 默认选中哪一天,接受时间戳     | Number         | —                      | Date.now()   |

### calendar Events

| 事件名称          | 说明            | 回调参数
|------------- |---------------- |----------------
| click-calendar | 选中某一天时触发的事件         | v：当前选中的日期时间戳；oldV：上一个选中的日期时间戳
