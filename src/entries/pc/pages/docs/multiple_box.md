<script>
  import ReMultipleBox from 'package/multiple_box_component/src/main.vue'
  
  export default {
    data() {
          return {
            states: ["Alabama", "Alaska", "Arizona",
               "Arkansas", "California", "Colorado",
               "Connecticut", "Delaware", "Florida",
               "Georgia", "Hawaii", "Idaho", "Illinois",
               "Indiana", "Iowa", "Kansas", "Kentucky",
               "Louisiana", "Maine", "Maryland",
               "Massachusetts", "Michigan", "Minnesota",
               "Mississippi", "Missouri", "Montana",
               "Nebraska", "Nevada", "New Hampshire",
               "New Jersey", "New Mexico", "New York",
               "North Carolina", "North Dakota", "Ohio",
               "Oklahoma", "Oregon", "Pennsylvania",
               "Rhode Island", "South Carolina",
               "South Dakota", "Tennessee", "Texas",
               "Utah", "Vermont", "Virginia",
               "Washington", "West Virginia", "Wisconsin",
                "Wyoming"],
            students: [],
            list: [],
            students2: [],
            list2: [],
            formData: {
                students1: [],
                students2: [],
            },
            loading1: false,
            loading2: false,
          };
    },
    methods: {
        remoteMethod1(query) {
            if (query !== '') {
                this.loading1 = true;
                setTimeout(() => {
                this.loading1 = false;
                this.students1 = this.list1.filter(item => {
                    return item.label.toLowerCase()
                         .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.students1 = [];
            }
        },
        remoteMethod2(query) {
            if (query !== '') {
                this.loading2 = true;
                setTimeout(() => {
                this.loading2 = false;
                this.students2 = this.list2.filter(item => {
                    return item.label.toLowerCase()
                         .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.students2 = [];
            }
        }
    },
    mounted() {
        this.list1 = this.states.map(item => {
            return { value: item, label: item };
        });
        this.list2 = this.states.map(item => {
            return { value: item, label: item };
        });
    },
    components: {
        ReMultipleBox,
    }
  }
</script>

## MultipleBox 远程搜索

### 基本用法

从服务器搜索数据，输入关键字进行查找

:::pc `v-model`绑定的是选中的值;`multipleOptions`是展示的选项;`remoteMethod`是筛选方法
```html
<template>
    <re-multiple-box
        v-model="formData.students1"
        :multiple-options="students1"
        filterable
        remote
        placeholder="请输入学员姓名"
        :remote-method="remoteMethod1"
        :loading="loading1">
    </re-multiple-box>
</template>

<script>
  export default {
    data() {
          return {
            states: ["Alabama", "Alaska", "Arizona",
               "Arkansas", "California", "Colorado",
               "Connecticut", "Delaware", "Florida",
               "Georgia", "Hawaii", "Idaho", "Illinois",
               "Indiana", "Iowa", "Kansas", "Kentucky",
               "Louisiana", "Maine", "Maryland",
               "Massachusetts", "Michigan", "Minnesota",
               "Mississippi", "Missouri", "Montana",
               "Nebraska", "Nevada", "New Hampshire",
               "New Jersey", "New Mexico", "New York",
               "North Carolina", "North Dakota", "Ohio",
               "Oklahoma", "Oregon", "Pennsylvania",
               "Rhode Island", "South Carolina",
               "South Dakota", "Tennessee", "Texas",
               "Utah", "Vermont", "Virginia",
               "Washington", "West Virginia", "Wisconsin",
                "Wyoming"],
            students1: [],
            list1: [],
            formData: {
                students1: [],
            },
            loading1: false,
          };
    },
    methods: {
        remoteMethod(query) {
            if (query !== '') {
                this.loading1 = true;
                setTimeout(() => {
                this.loading1 = false;
                this.students1 = this.list1.filter(item => {
                    return item.label.toLowerCase()
                         .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.students1 = [];
            }
        }
    },
    mounted() {
        this.list1 = this.states.map(item => {
            return { value: item, label: item };
        });
    }
  }
</script>
```
:::


### 修改选项信息

可以对`multipleOptions`显示的信息进行扩展

:::pc 通过`slot`+`slot-scope`进行扩展
```html
<template>
    <re-multiple-box
        v-model="formData.students2"
        :multiple-options="students2"
        filterable
        remote
        placeholder="请输入学员姓名"
        :remote-method="remoteMethod2"
        :loading="loading">
        <template slot="cell" slot-scope="props">
             <span style="float: left">{{ props.option.label }}</span>
             <span style="float: right; color: #8492a6; font-size: 13px">右侧信息</span>
        </template>
    </re-multiple-box>
</template>

<script>
  export default {
    data() {
          return {
            states: ["Alabama", "Alaska", "Arizona",
               "Arkansas", "California", "Colorado",
               "Connecticut", "Delaware", "Florida",
               "Georgia", "Hawaii", "Idaho", "Illinois",
               "Indiana", "Iowa", "Kansas", "Kentucky",
               "Louisiana", "Maine", "Maryland",
               "Massachusetts", "Michigan", "Minnesota",
               "Mississippi", "Missouri", "Montana",
               "Nebraska", "Nevada", "New Hampshire",
               "New Jersey", "New Mexico", "New York",
               "North Carolina", "North Dakota", "Ohio",
               "Oklahoma", "Oregon", "Pennsylvania",
               "Rhode Island", "South Carolina",
               "South Dakota", "Tennessee", "Texas",
               "Utah", "Vermont", "Virginia",
               "Washington", "West Virginia", "Wisconsin",
                "Wyoming"],
            students2: [],
            list2: [],
            formData2: {
                students: [],
            },
            loading2: false,
          };
    },
    methods: {
        remoteMethod(query) {
            if (query !== '') {
                this.loading2 = true;
                setTimeout(() => {
                this.loading2 = false;
                this.students2 = this.list2.filter(item => {
                    return item.label.toLowerCase()
                         .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.students2 = [];
            }
        }
    },
    mounted() {
        this.list2 = this.states.map(item => {
            return { value: item, label: item };
        });
    }
  }
</script>
```
:::

### MultipleBox Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| multipleOptions | 展示的选项 | Array | — | [{label: '', value: ''}] |
| isRequired | 必须项 | Boolean | — | true |
| warningText | 警告语句 | String | — | — |
| multiple | — | — | — | — |
| filterable | — | — | — | — |
| remote | — | — | — | — |
| remoteMethod | 筛选方法 | Function | — | — |
| loading | 加载中 | Boolean | — | — |
| placeholder | 为空时的提示语句 | String | — | — |
| value | 绑定的值(此处是v-model绑定) | Array | — | [] |

