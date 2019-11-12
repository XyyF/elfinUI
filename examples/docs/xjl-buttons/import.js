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
                            'xjl-btn': true
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
            buttonsConfig1: [{
                type: 1,
                title: '我是button',
                class: {
                    'xjl-test': true,
                    'xjl-test11': true
                }
            }],
            buttonsConfig2: [{
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
                    input: this.changeDate1
                }
            }],
            buttonsConfig3: [{
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
            }],
            buttonsConfig4:[
                {
                    type: 4,
                    title: '我是单选',
                    class: { // 自定义样式
                        'xjl-test': true,
                        'xjl-test11': true
                    }
                }
            ],
            buttonsConfig5:[
                {
                    type: 5,
                    title: '我是Link,跳转到/previewer',
                    props: {
                        to: '/previewer'
                    }
                }
            ],
            buttonsConfig6: [
                {
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
            ],
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
            searchText: '',
            searchable: true,
            placeholder: '我是搜索默认值',
            value: {
                'key': '选项一',
            },
            value2: {
                'key': '选项一',
            },

        }
    },
    methods: {
        input(val) {
            this.buttonsConfig[6].compOptions.props.value = val.key
        },
        input2(val) {
            this.buttonsConfig7[0].compOptions.props.value = val.key
        },
        changeDate(val) {
            this.buttonsConfig[1].props.value = val
        },
        changeDate1(val) {
            this.buttonsConfig2[0].props.value = val
        }
    }
}