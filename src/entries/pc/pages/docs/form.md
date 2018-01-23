<script>
  import ReForm from 'package/form_component/src/main.vue'
 
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
              list: [],
              options: [],
              value: [],
              loading: false,
              form: {
                input: '',
                selection: 1,
                date: Date.now(),
                textarea: '',
                radio: 1,
                date_year: Date.now(),
                file_list: '',
                password: '',
                selection_remote: [],
                component: '',
                switch: 1,
              }
          }
      },
      computed: {
          format() {
            return [{
                prop: 'this.form.input',
                label: '输入框',
                type: 1,
                validator: {type: 'string', required: true, message: '请输入input', trigger: 'change'},     // validator 更多用法请参照饿了么 表单组件 文档
            }, {
                prop: 'this.form.selection',
                label: '选择框',
                type: 2,
                options: [{label: '选项1', value: 1}, {label: '选项2', value: 2}],
                validator: {type: 'numebr', required: true, message: '请选择selection', trigger: 'change'},
            }, {
                prop: 'this.form.date',
                label: '日期选择',
                type: 3,
                placeholder: '请选择日期',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - (1000 * 60 * 60 * 24)
                    }
                },
                validator: {type: 'date', required: true, message: '请选择date', trigger: 'change'},
            }, {
                prop: 'this.form.textarea',
                label: '文本区',
                type: 4,
                maxlength: 100,
                placeholder: '请输入文本区',
                validator: {type: 'string', required: true, message: '请输入textarea', trigger: 'change'},
            }, {
                prop: 'this.form.radio',
                label: '单选框',
                type: 5,
                options: [{label: '单选1', value: 1}, {label: '单选2', value: 2}, {label: '单选3', value: 3, disabled: true,}],
                validator: {type: 'number', required: true, message: '请选择radio', trigger: 'change'},
            }, {
                prop: 'this.form.date_year',
                label: '年选择器',
                type: 6,
                placeholder: '请选择年',
                validator: {type: 'date', required: true, message: '请选择data_year', trigger: 'change'},
            }, {
                prop: 'this.form.file_list',
                label: '文件列表',
                type: 7,
                placeholder: '',
                validator: {type: 'date', required: true, message: '请输入file_list', trigger: 'change'},
            }, {
                prop: 'this.form.password',
                label: '密码',
                type: 8,
                validator: {type: 'date', required: true, message: '请输入password', trigger: 'change'},
            }, {
                prop: 'this.form.selection_remote',
                label: '远程搜索',
                loading: this.loading,
                remoteMethod: this.remoteMethod.bind(this),
                options: this.options,
                type: 9,
                validator: {type: 'date', required: true, message: '请选择selection_remote', trigger: 'change'},
            }, {
                prop: 'this.form.component',
                label: '自定义组件',
                type: 10,
            }, {
                prop: 'this.form.switch',
                label: '开关',
                type: 11,
                activeText: 'active-text',
                inactiveText: 'inactive-text',
                activeColor: '',
                inactiveColor: '',
                activeValue: 1,
                inactiveValue: 2,
                disabled: false,
                validator: {type: 'number', required: true, message: '请选择switch', trigger: 'change'},
            }]
          }
      },
      methods: {
          remoteMethod(query) {
              if (query !== '') {
                  this.loading = true;
                  setTimeout(() => {
                  this.loading = false;
                  this.options = this.list.filter(item => {
                      return item.label.toLowerCase()
                          .indexOf(query.toLowerCase()) > -1;
                      });
                  }, 200);
              } else {
                  this.options = [];
              }
          }
      },
      mounted() {
          this.list = this.states.map(item => {
              return { value: item, label: item };
          });
      },
      components: {
          ReForm
      }
  }
</script>

<style>
    .el-form-item__content {
        width: 340px;
    }
</style>

## Form 表单

由单选、输入框、多选、日期选择等构成

### 基本表单

包含了各种表单项

:::pc 只需关注`formFormatData`的值即可
```html
<template>
  <re-form :form-format-data="format" :label-width="'100px'"></re-form>
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
              list: [],
              options: [],
              value: [],
              loading: false,
              form: {
                input: '',
                selection: 1,
                date: Date.now(),
                textarea: '',
                radio: 1,
                date_year: Date.now(),
                file_list: '',
                password: '',
                selection_remote: [],
                component: '',
                switch: 1,
              }
          }
      },
      computed: {
          format() {
            return [{
                prop: 'this.form.input',
                label: '输入框',
                type: 1,
                validator: {type: 'string', required: true, message: '请输入input', trigger: 'change'},     // validator 更多用法请参照饿了么 表单组件 文档
            }, {
                prop: 'this.form.selection',
                label: '选择框',
                type: 2,
                options: [{label: '选项1', value: 1}, {label: '选项2', value: 2}],
                validator: {type: 'numebr', required: true, message: '请选择selection', trigger: 'change'},
            }, {
                prop: 'this.form.date',
                label: '日期选择',
                type: 3,
                placeholder: '请选择日期',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - (1000 * 60 * 60 * 24)
                    }
                },
                validator: {type: 'date', required: true, message: '请选择date', trigger: 'change'},
            }, {
                prop: 'this.form.textarea',
                label: '文本区',
                type: 4,
                maxlength: 100,
                placeholder: '请输入文本区',
                validator: {type: 'string', required: true, message: '请输入textarea', trigger: 'change'},
            }, {
                prop: 'this.form.radio',
                label: '单选框',
                type: 5,
                options: [{label: '单选1', value: 1}, {label: '单选2', value: 2}, {label: '单选3', value: 3, disabled: true,}],
                validator: {type: 'number', required: true, message: '请选择radio', trigger: 'change'},
            }, {
                prop: 'this.form.date_year',
                label: '年选择器',
                type: 6,
                placeholder: '请选择年',
                validator: {type: 'date', required: true, message: '请选择data_year', trigger: 'change'},
            }, {
                prop: 'this.form.file_list',
                label: '文件列表',
                type: 7,
                placeholder: '',
                validator: {type: 'date', required: true, message: '请输入file_list', trigger: 'change'},
            }, {
                prop: 'this.form.password',
                label: '密码',
                type: 8,
                validator: {type: 'date', required: true, message: '请输入password', trigger: 'change'},
            }, {
                prop: 'this.form.selection_remote',
                label: '远程搜索',
                loading: this.loading,
                remoteMethod: this.remoteMethod.bind(this),
                options: this.options,
                type: 9,
                validator: {type: 'date', required: true, message: '请选择selection_remote', trigger: 'change'},
            }, {
                prop: 'this.form.component',
                label: '自定义组件',
                type: 10,
            }, {
                prop: 'this.form.switch',
                label: '开关',
                type: 11,
                activeText: 'active-text',
                inactiveText: 'inactive-text',
                activeColor: '',
                inactiveColor: '',
                activeValue: 1,
                inactiveValue: 2,
                disabled: false,
                validator: {type: 'number', required: true, message: '请选择switch', trigger: 'change'},
            }]
          }
      },
      methods: {
          remoteMethod(query) {
              if (query !== '') {
                  this.loading = true;
                  setTimeout(() => {
                  this.loading = false;
                  this.options = this.list.filter(item => {
                      return item.label.toLowerCase()
                          .indexOf(query.toLowerCase()) > -1;
                      });
                  }, 200);
              } else {
                  this.options = [];
              }
          }
      },
      mounted() {
          this.list = this.states.map(item => {
              return { value: item, label: item };
          });
      }
  }
</script>

<style>
    .el-form-item__content {
        width: 340px;
    }
</style>
```
:::


### Form Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| formFormatData | 表单格式数据，参照 example         | Array           | —                     | []     |
| labelWidth | 表单项 label 宽度     | string         | —                      | '90px'   |
| labelPosition | 表单项 label 相对位置，left、right，可以参照下饿了么form组件         | String           | 'left'、'right'                    | 'right'     |
