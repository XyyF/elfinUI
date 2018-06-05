<script>
  import xjlSelectByPaged from 'package/select_by_paged/src/main.vue'
  
  export default {
    data() {
        return {
            value: '',
            options: [{
                value: '1', label: '第一条数据'
            }, {
                value: '2', label: '第二条数据'
            }],
            allOptions: [{
                value: '1', label: '第一条数据'
            }, {
                value: '2', label: '第二条数据'
            }, {
                value: '3', label: '第三条数据'
            }, {
                value: '4', label: '第四条数据'
            }, {
                value: '5', label: '第五条数据'
            }, {
                value: '6', label: '第六条数据'
            },{
                value: '7', label: '第七条数据'
            },{
                value: '8', label: '第八条数据'
            },{
                value: '9', label: '第九条数据'
            }, {
                value: '10', label: '第十条数据'
            }],
            sum: 10,
        }
    },
    components: {
        xjlSelectByPaged
    },
    methods: {
        async fetchOptions() {
            return this.vxGetList({
                index: this.$refs.selectPage.getRowStartIndex(),
                limit: 2,
            }).catch((err) => {
                console.log(err)
            })
        },
        async vxGetList({index, limit}) {
            const getOptions = this.allOptions.slice(index + 1, index + limit + 1)
            this.options = this.options.concat(getOptions) 
        }
    }
  }
</script>

<style>
.select-by-paged-root {
    max-width: 500px;
}
</style>

## selectByPaged 分页筛选框

适用于选项过多的筛选框

### 基本用法

:::pc 在selectByPaged组件中。fetchOptions必须是异步方法
```html
<template>
  <xjl-select-by-paged
    ref="selectPage"
    :options-sum="sum"
    :select-options="options"
    v-model="value"
    :fetch-select-options="fetchOptions">
   </xjl-select-by-paged>
</template>

<script>
  export default {
    data() {
        return {
            value: '',
            options: [{
                value: '1', label: '第一条数据'
            }, {
                value: '2', label: '第二条数据'
            }],
            sum: 10,
        }
    },
    methods: {
        async fetchOptions() {
            return this.vxGetList({
                index: this.$refs.selectPage.getRowStartIndex(),
                limit: 2,
            }).catch((err) => {
                console.log(err)
            })
        }
    }
  }
</script>
```
:::

### SlideFullPage Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| optionsSum | 选项的总数 | Number | — | 0 |
| selectOptions | 当前显示的筛选框列表 | Array | — | [] |
| value | 当前筛选框选定的值,对应selectOptions中的value,使用v-model绑定 | String | — | '' |

### calendar Events

| 事件名称          | 说明            | 回调参数
|------------- |---------------- |----------------
| fetchSelectOptions | 加载更多的筛选框列表项 |
