<script type="text/jsx">

    /**
     * 代码导读
     *
     * 解析配置数据，渲染 表单（form） 组件
     *
     * render_factory 渲染工厂
     * 获得每一个 form item 的 type，传入 render_factory ，
     * 渲染相应的 element 组件(Input、Button...)
     *
     */

    import {getPropByPath} from './utils'
    import renderFactory from './render_factory'
    import {cloneDeep} from 'lodash'

    // Example
    // 参考 readme.md 文件

    // 可配置项请参考 elementUI http://element-cn.eleme.io/#/zh-CN/component/form
    // formOptions 以及 formFormat 写法简单说明
    /*
        {
            // 和`v-bind:class`一样的 API
            class: {
              foo: true,
              bar: false
            },
            // 组件 props
            props: {
              myProp: 'bar'
            },
            // 事件监听器基于 `on`
            // 所以不再支持如 `v-on:keyup.enter` 修饰器
            // 需要手动匹配 keyCode。
            on: {
              click: this.clickHandler
            },
        }
        更多内容需要参考 Vue render 函数 https://cn.vuejs.org/v2/guide/render-function.html
     */

    export default {
        name: 'xjl-form',
        components: {
        },
        data() {
            return {}
        },
        props: {
            // 双向绑定的数据
            // value 可以包含嵌套的对象，甚至数组对象
            // value = {
            //     name: '',
            //     schools: [{
            //         schoolId: '',
            //         name: ''
            //     }, {
            //         schoolId: '',
            //         name: ''
            //     }],
            //     address: {
            //         road: '',
            //         country: ''
            //     }
            // }
            //
            // 类似这样结构的 value
            // el-form-item 当中的 prop 可以这样写
            //
            // prop='name'
            // prop='schools.0'
            // prop='schools.0.name'
            // prop='address.road'
            value: {
                type: Object,
                default: () => {
                    return {}
                },
            },
            // 定义 el-form 子元素，包含 el-form-item 的配置项
            // const format = {
            //     type: formItemType.SWITCH,
            //     prop: 'switch',
            //     label: '开关',
            //     itemOptions: { // 配置 el-form-item 的属性
            //         props: {
            //         },
            //     },
            //     compOptions: { // 配置 el-form-item 子元素的属性
            //         props: {
            //             disabled: false,
            //         },
            //     },
            // }
            //
            // el-form-item 嵌套 el-form-item 的情况
            // const formatMulti = {
            //     label: '',
            //     itemOptions: {},
            //     formats: [format. format]
            // }
            //
            // el-form-item 包含多个子元素无法处理，请使用 formItemType.COMPONENT
            //
            //////////////////////////////////////////
            // 在写 formFormat 时，有两个数据需要特殊处理
            // formFormat = [{
            //     type: formItemType.SWITCH,
            //     itemOptions: {
            //         props: {
            //             prop: 'switch', // 关键, 需要去掉
            //             label: '开关',    // 关键, 需要去掉
            //         },
            //     },
            //     compOptions: {
            //         props: {
            //             disabled: false,
            //         },
            //     },
            // }]
            //
            // ---> 将 itemOptions 当中的 prop 和 label 提高一个层级,
            // formFormat = [{
            //     type: formItemType.SWITCH,
            //     prop: 'switch', // 关键
            //     label: '开关',    // 关键
            //     itemOptions: {
            //         props: {
            //         },
            //     },
            //     compOptions: {
            //         props: {
            //             disabled: false,
            //         },
            //     },
            // }]
            //
            formFormat: {
                type: Array,
                default: () => ([]),
            },
            // el-form 的属性配置项
            formOptions: {
                type: Object,
                default: () => {
                    return {}
                },
            },
        },
        methods: {
            updateValue(key, val) {
                // 根据 formFormat 配置项里面的prop（可能是路径）更新数据
                /**
                 * xxx: 这里为什么要用深拷贝呢？
                 * 用了深拷贝导致任何一次编辑，都会引起所有数据触发 watch
                 * 暂时去掉 深拷贝
                 */
                const valueCopy = cloneDeep(this.value) // cloneDeep(this.value)
                const result = getPropByPath(valueCopy, key)
                if (result.o[result.k] === val) return
                result.o[result.k] = val
                this.$emit('input', valueCopy)
            },
            insertSuffix(itemOptions, h) {
                let suffix = null
                if (itemOptions.suffix && typeof itemOptions.suffix === 'string') {
                    suffix = h('span', {class: 'xjl-form-item-suffix'}, itemOptions.suffix)
                }
                else if (itemOptions.suffix) {
                    suffix = h(itemOptions.suffix, {class: 'xjl-form-item-suffix'})
                }

                if (suffix && itemOptions.class) {
                    if (typeof itemOptions.class === 'string') {
                        itemOptions.class = `${itemOptions.class} xjl-form-item--suffix`
                    }
                    else {
                        itemOptions.class['xjl-form-item--suffix'] = true
                    }
                }
                else if (suffix) {
                    itemOptions.class = 'xjl-form-item--suffix'
                }
                return suffix
            },
            validate(callback) {
                return this.$refs.elForm.validate(callback)
            },
        },
        render(h) {
            const {
                formFormat,
                value,
                updateValue,
                formOptions,
                insertSuffix,
            } = this

            const delegate = {value, updateValue}

            function formItems(formats) {
                // 只要主动配置hidden为false则过滤掉
                return formats.filter(item => !item.hidden).map(item => {
                    const key = (item.key ? item.key : item.prop) || item.label
                    const keyOption = {key}

                    const options = {
                        ...item.itemOptions,
                        ...keyOption,
                    }
                    if (!options.props) options.props = {}
                    Object.assign(options.props, {prop: item.prop, label: item.label})

                    // el-form-item 嵌套的情况，使用递归
                    // 对应一个item中使用多个校验规则的情况
                    const children = item.formats ? formItems(item.formats) : [
                        renderFactory.render(h, delegate, item),
                        insertSuffix(options, h),
                    ]
                    return h('el-form-item', options, children)
                })
            }

            const allFormItems = formItems(formFormat)
            if (this.$slots.tailFormItem) {
                const scopedSlots = {
                    default: () => this.$slots.tailFormItem,
                }
                allFormItems.push(h('el-form-item', {scopedSlots}))
            }
            const defaultFormOptions = {
                ref: 'elForm',
                class: 'edu-saas-ui-form'
            }
            // 不能直接使用 formOptions
            // 会报错
            return h('el-form', {...{...formOptions, ...defaultFormOptions}}, allFormItems)
        },
    }
</script>

<style scoped>
    .el-select {
        width: 312px;
    }

    .el-input {
        width: 312px;
    }

    .el-textarea {
        width: 312px;
    }

    .xjl-form-item--suffix /deep/ .el-form-item__content {
        display: flex;
        flex-direction: column;
    }

    .xjl-form-item-suffix {
        line-height: 1.5;
    }
</style>