<script>
    import baseVue from './import.js'

    export default baseVue
</script>
## xjl-buttons  按钮控件
一共七种不同类型（1-7）的按钮控件,根据传入不同参数的type与其他属性使用 </br>
*每个组件的参数不一样，请参考案例*
### 标准用法 (所有用法)
可以一次配置多个或全部
:::component 
```html
<template>
    <div>
         <xjl-buttons 
         :buttons-config="buttonsConfig"
         :searchable="searchable"
         :placeholder="placeholder"
         :search-text.sync="searchText"
         :value="value"
         @input="input"
          ></xjl-buttons>
    </div>

</template>

<script>
import xjlButtons from 'packages/xjl-buttons/index'

export default {
    components: {
            xjlButtons
        },
        data() {
            return {
                /*
                * 1.按钮BUTTON 2.时间选择DATE_PICKER
                * 3.弹出框popover 4.单选框CHECKBOX
                * 5.路由跳转Link 6.Badge
                * 7.SELECT_LEFT 下拉选择
                * */
                buttonsConfig: [{
                    type: 1,
                    title: '我是button',
                    class: {
                        'xjl-test': true,
                        'xjl-test11': true
                    }
                }, {
                        type: 2,
                        class: {
                            'xjl-test': true,
                            'xjl-test11': true
                        },
                        attrs: {
                            placeholder: '请选择日期'
                        },
                        props: {
                            value: new Date()
                        },
                        on: {
                            input: this.changeDate
                        }
                    },
                    {
                        type: 3,
                        title: '我是slot',
                        popoverConfig: {
                            contentSlot: '123',
                            class: { // 自定义样式
                                'xjl-test': true,
                                'xjl-test11': true
                            },
                            contentSlot: {
                                dom: 'div',
                                options: {
                                    domProps: {
                                        innerHTML: '我是内容'
                                    }
                                }
                            }
                        },
                        buttonConfig: { // Button 的配置
                            class: {
                                'test': 123
                            }
                    }
                    }, {
                        type: 4,
                        title: '我是单选',
                        class: { // 自定义样式
                            'xjl-test': true,
                            'xjl-test11': true
                        }
                    }, {
                        type: 5,
                        title: '我是Link,跳转到/previewer',
                        props: {
                            to: '/previewer'
                        }
                    }, {
                        type: 6,
                        title: '我是Badge',
                        class:{ // 自定义样式
                            'xjl-test': true,
                            'xjl-test11': true
                        },
                        contentSlot: {
                            dom: 'sup',
                            options: {
                                class: {
                                    'el-badge__content':true,
                                     'is-fixed': true
                                },
                                domProps: {
                                    innerHTML: 15
                                }
                            }
                        }
                    }, {
                        type: 7,
                        props: 'key',
                        compOptions: {
                            options: [ // 选项列表
                                {
                                    value: '选项一'
                                },
                                {
                                    value: '选项二'
                                }
                            ],
                            props: { // 默认选项
                                value: '选项一'
                            },
                            attr: {
                                placeholder: '请选择'
                            }
                        }
                    }
                ],
                searchText: '',
                searchable: true,
                placeholder: '我是搜索默认值',
                value: {
                    'key': '选项一',
                }
            }
        },
        methods: {
            input(val) {
                this.buttonsConfig[6].compOptions.props.value = val.key
            },
            changeDate(val) {
                this.buttonsConfig[1].props.value = val
            }
        }
}
</script>
```
:::
### 搜索框
搜索框不能单独使用, 配合任意类型按钮使用
:::component 
```html
<template>
    <div>
         <xjl-buttons 
          :buttons-config="buttonsConfig1"
          :searchable="searchable"
          :placeholder="placeholder"
          :search-text.sync="searchText"
          ></xjl-buttons>
    </div>

</template>

<script>
import xjlButtons from 'packages/xjl-buttons/index'

export default {
    components: {
            xjlButtons
        },
        data() {
            return {

                buttonsConfig1: [{
                    type: 1,
                    title: '我是button',
                    class: {
                        'xjl-test': true,
                        'xjl-test11': true
                    }
                },
                searchText: '',
                searchable: true,
                placeholder: '我是搜索默认值'  
        }
}
}
</script>
```
:::

### type 1 按钮用法
:::component 
```html
<template>
    <div>
         <xjl-buttons 
         :buttons-config="buttonsConfig1"
          ></xjl-buttons>
    </div>

</template>

<script>
import xjlButtons from 'packages/xjl-buttons/index'

export default {
    components: {
            xjlButtons
        },
        data() {
            return {

                buttonsConfig1: [{
                    type: 1,
                    title: '我是button',
                    class: {
                        'xjl-test': true,
                        'xjl-test11': true
                    }
                }
        }
}
}
</script>
```
:::

### type 2 时间选择器用法
:::component 
```html
<template>
    <div>
         <xjl-buttons 
         :buttons-config="buttonsConfig2"
          ></xjl-buttons>
    </div>

</template>

<script>
import xjlButtons from 'packages/xjl-buttons/index'

export default {
    components: {
            xjlButtons
        },
        data() {
            return {

                buttonsConfig1: [{
                    type: 1,
                    title: '我是button',
                    class: {
                        'xjl-test': true,
                        'xjl-test11': true
                    }
                }
        }
}
    methods: {
            changeDate1(val) {
                this.buttonsConfig2[0].props.value = val
            }
        }
}
</script>
```
:::

### type 3 弹出框用法
:::component 
```html
<template>
    <div>
         <xjl-buttons 
         :buttons-config="buttonsConfig3"
          ></xjl-buttons>
    </div>

</template>

<script>
import xjlButtons from 'packages/xjl-buttons/index'

export default {
    components: {
            xjlButtons
        },
        data() {
            return {

                buttonsConfig1: [{
                                 type: 3,
                                 title: '我是slot',
                                 popoverConfig: {
                                     contentSlot: '123',
                                     class: { // 自定义样式
                                         'xjl-test': true,
                                         'xjl-test11': true
                                     },
                                     contentSlot: {
                                         dom: 'div',
                                         options: {
                                             domProps: {
                                                 innerHTML: '我是内容'
                                             }
                                         }
                                     }
                                 },
                                 buttonConfig: { // Button 的配置
                                     class: {
                                         'xjl-btn': true
                                     }
                             }
                         }]
        }
        }

}
</script>
```
:::

### type 4 单选框用法
:::component 
```html
<template>
    <div>
         <xjl-buttons 
         :buttons-config="buttonsConfig4"
          ></xjl-buttons>
    </div>

</template>

<script>
import xjlButtons from 'packages/xjl-buttons/index'

export default {
    components: {
            xjlButtons
        },
        data() {
            return {
                buttonsConfig4: [{
                     type: 4,
                     title: '我是单选',
                     class: { // 自定义样式
                         'xjl-test': true,
                         'xjl-test11': true
                     }
                 }]
        }
        }

}
</script>
```
:::

### type 5 跳转用法
:::component 
```html
<template>
    <div>
         <xjl-buttons 
         :buttons-config="buttonsConfig5"
          ></xjl-buttons>
    </div>

</template>

<script>
import xjlButtons from 'packages/xjl-buttons/index'

export default {
    components: {
            xjlButtons
        },
        data() {
            return {
                buttonsConfig5: [{
                                 type: 5,
                                 title: '我是Link,跳转到/previewer',
                                 props: {
                                     to: '/previewer'
                                 }
                             }]
        }
        }

}
</script>
```
:::

### type 6 角标用法
:::component 
```html
<template>
    <div>
         <xjl-buttons 
         :buttons-config="buttonsConfig6"
          ></xjl-buttons>
    </div>

</template>

<script>
import xjlButtons from 'packages/xjl-buttons/index'

export default {
    components: {
            xjlButtons
        },
        data() {
            return {
                buttonsConfig6:[{
                                   type: 6,
                                   title: '我是Badge',
                                   class:{ // 自定义样式
                                       'xjl-test': true,
                                       'xjl-test11': true
                                   },
                                   contentSlot: {
                                       dom: 'sup',
                                       options: {
                                           class: {
                                               'el-badge__content':true,
                                               'is-fixed': true
                                           },
                                           domProps: {
                                               innerHTML: 15
                                           }
                                       }
                                   }
                               }       
                           ]
        }
        }

}
</script>
```
:::

### type 7 下拉选择用法
:::component 
```html
<template>
    <div>
         <xjl-buttons 
         :buttons-config="buttonsConfig7"
         @input="input2"
         :value="value"
          ></xjl-buttons>
    </div>

</template>

<script>
import xjlButtons from 'packages/xjl-buttons/index'

export default {
    components: {
            xjlButtons
        },
        data() {
            return {
            buttonsConfig7: [
                {
                    type: 7,
                    props: 'key',
                    compOptions: {
                        options: [ // 选项列表
                            {
                                value: '选项一'
                            },
                            {
                                value: '选项二'
                            }
                        ],
                        props: { // 默认选项
                            value: '选项一'
                        },
                        attr: {
                            placeholder: '请选择'
                        }
                    }
                }
            ],
            value: {
                'key': '选项一',
            },
        }
        },
        methods: {
               input2(val) {
                   this.buttonsConfig7[0].compOptions.props.value = val.key
               },
        }

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

