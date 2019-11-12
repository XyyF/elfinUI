<script>
    import baseVue from './import.js'

    export default baseVue
</script>

## form 表单

### 标准用法
基本的内置组件和用法
:::component 每一个表单项都对应formFormat的一项，包含输入框、文本框、选择框、日期选择框、单选框、切换、数字输入框、上传图片
```html
<template>
    <xjl-form
        v-model="formData"
        :form-format="formFormat"
        :form-options="formOptions">
    </xjl-form>
</template>

<script>
import XjlForm from 'packages/form/index'
import formItemType from 'packages/form/item-type'

export default {
    data() {
        return {
            formData: {
                input: null,
                textarea: null,
                selection: '',
                date: null,
                radio: null,
                switch: null,
                number: null,
                uploadImage: null
            },
            formOptions: {
                props: {
                    labelPosition: 'left',
                    labelWidth: '100px'
                }
            }
        }
    },
    components: {
        XjlForm,
    },
    computed: {
        formFormat() {
            return [{
                prop: 'input',
                label: 'input',
                type: formItemType.INPUT
            }, {
                prop: 'textarea',
                label: 'textarea',
                type: formItemType.TEXTAREA
            }, {
                prop: 'selection',
                label: 'selection',
                type: formItemType.SELECTION,
                compOptions: {
                    options: [{
                        value: 1,
                        label: '选项1'
                    }, {
                        value: 2,
                        label: '选项2'
                    }],
                }
            }, {
                prop: 'date',
                label: 'date',
                type: formItemType.DATE
            }, {
                prop: 'radio',
                label: 'radio',
                type: formItemType.RADIO,
                compOptions: {
                    options: [
                        {value: true, label: '是'},
                        {value: false, label: '否'},
                    ]
                }
            }, {
                prop: 'switch',
                label: 'switch',
                type: formItemType.SWITCH
            }, {
                prop: 'number',
                label: 'number',
                type: formItemType.NUMBER
            }, {
                prop: 'uploadImage',
                label: 'uploadImage',
                type: formItemType.UPLOAD_IMAGE
            }]
        },
    }
}
</script>
```
:::

### Form Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| value | 表单绑定值 | Object | — | {} |
| formOptions | el-form 的属性配置项，jsx形式 | Object | — | {}
| formFormat | 定义 el-form 子元素，包含 el-form-item 的配置项 | Array | — | [] |

### formFormat Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| label | form-item的label | String | —
| prop | 对应v-model绑定的字段名 | String | —
| type | 组件类型 | Number | 参见packages/form/item-type.js
| compOptions | 组件配置项 | Object | —
| compOptions.options | selection和radio的选项列表 | Array | —
| compOptions.on | 传入组件的事件 | Object | —
| compOptions.prop | 传入组件的prop | Object | —


### formOptions Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| 详见element | http://element-cn.eleme.io/#/zh-CN/component/form#form-attributes | - | —