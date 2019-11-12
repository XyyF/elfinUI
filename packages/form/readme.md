```
<template>
    <div class="xjl-demo">
        <xjl-form
            class="demo-container xjl-form"
            :formFormat="formFormatData"
            :formOptions="formOptions"
            v-model="formData">
        </xjl-form>
        {{formData}}
    </div>
</template>

<script>
    import XjlForm from 'components/pc/xjl-form/new'
    import formItemType from 'components/pc/xjl-form/item-type'

    function validator(rule, value, callback) {
        if (value) return callback()
        else return callback(new Error('请填写内容'))
    }

    export default {
        name: 'demo',
        components: {
            XjlForm,
        },
        data() {
            return {
                form: {
                    studentName: '454',
                },
                formData: {
                    switch: true,
                    studentName: '454',
                    arr: [{
                        label: '34',
                    }, {
                        label: '343',
                    }],
                },
                formFormatData: [
                    {
                        type: formItemType.SWITCH,
                        prop: 'switch',
                        label: '开关',
                        itemOptions: {
                            props: {
                            },
                        },
                        compOptions: {
                            props: {
                                disabled: false,
                            },
                        },
                    }, {
                        type: formItemType.INPUT,
                        prop: 'studentName',
                        label: '作者',
                        itemOptions: {
                            props: {
                                required: true,
                                rules: {validator, trigger: 'change'},
                            },
                            class: {
                                'form-item-attr': true
                            }
                        },
                        compOptions: {
                            class: 'small-input',
                            props: {
                                disabled: false,
                            },
                            attrs: {
                                placeholder: 'comp-attr',
                            },
                            
                            // 需要返回一个数组或者字符串
                            slots(h) {
                                return [h()]
                            }
                        },
                    }, {
                        label: '数组',
                        itemOptions: {
                            props: {
                                required: true
                            },
                        },
                        formats: [{
                            type: formItemType.INPUT,
                            prop: 'arr.0.label',
                            itemOptions: {
                                props: {
                                    rules: {required: true, message: '域名不能为空', trigger: 'blur'},
                                },
                            },
                        }, {
                            type: formItemType.INPUT,
                            prop: 'arr.1.label',
                            itemOptions: {
                                props: {
                                    rules: {required: true, message: '域名不能为空', trigger: 'blur'},
                                },
                            },
                        }],
                    },
                ],
            }
        },
        computed: {
            formOptions() {
                return {
                    props: {
                        labelWidth: '100px',
                        model: this.formData,
                    },
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    .xjl-demo {
        .demo-container {
            width: 450px;
            border: 1px solid #ddd;
            padding: 30px;
            border-radius: 4px;
        }
        .xjl-form {

        }
    }
</style>
```