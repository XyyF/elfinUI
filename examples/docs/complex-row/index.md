<script>
    import baseVue from './import.js'

    export default baseVue
</script>
## Complex-row  复杂行组件
复杂行组件,根据传入不同参数的type与其他属性来指定渲染不同功能的组件 </br>
*每个组件的参数不一样，请参考案例*
### type 渲染指定类型的组件
类型值参考 complex-row/item-type

### 按钮
:::component
```html
<template>
   <complex-row :button-configs="buttonConfigs"></complex-row>
</template>

<script>
export default {
    components: {
        ComplexRow,
    },
    data() {
        return {
            buttonConfigs: [
                {
                    label: 'label信息:',
                    type: ItemType.BUTTON,
                    itemOptions: {
                        props: {
                            type: 'primary',
                        },
                        on: {
                            click: this.handleClickBtn.bind(this),
                        },
                        scopedSlots: {
                            default: (h) => h('span', '按钮'),
                        },
                    },
                },
                {
                    type: ItemType.BUTTON,
                    itemOptions: {
                        props: {
                            type: 'text',
                        },
                        scopedSlots: {
                            default: () => '文本按钮',
                        },
                    },
                },
            ],
        }
    },
    methods: {
        handleClickBtn() {
            this.$message.success('触发click')
        },
    },
}
</script>
```
:::
### xjl-buttons Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| buttonsConfig | 要使用的按钮数组 | Array | - | [] |
| searchable | 是否使用搜索栏 | Boolean | true/false | false |
| placeholder | 搜索框提示信息 | String | - | '请输入' |
| value | 下拉框相关值 | Object | - | {} |

