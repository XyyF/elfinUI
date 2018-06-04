<template>
    <el-form class="format-form" ref="formatForm" :model="mFormData" :rules="formRules" :label-width="labelWidth"
             :label-position="labelPosition">
        <transition-group
            @before-enter="animationBeforeEnter"
            @enter="animationEnter"
            @after-enter="animationAfterEnter"
            @leave="animationLeave"
            @after-leave="animationAfterLeave"
            :duration="0"
            tag="div">
            <el-form-item
                v-for="formatItem in formFormatData"
                :key="formatItem.label"
                :label="formatItem.label"
                :prop="formatItem.prop"
                :class="{'locked': formatItem.isLocked}"
                :required="formatItem.required"
                v-if="!formatItem.disappear">
                <!--普通-->
                <template v-if="formatItem.type === FormItemType.INPUT">
                    <el-input
                        class="same-width"
                        v-model.trim="mFormData[formatItem.prop]"
                        :maxlength="formatItem.maxlength"
                        :placeholder="formatItem.placeholder"
                        :disabled="formatItem.disabled || false"></el-input>
                </template>

                <!--选项-->
                <template v-else-if="formatItem.type === FormItemType.SELECTION">
                    <el-select
                        class="same-width"
                        v-model="mFormData[formatItem.prop]"
                        :placeholder="formatItem.placeholder || '请选择'"
                        :disabled="formatItem.disabled || false"
                        :loading="formatItem.loading || false"
                        :loading-icon="formatItem.loading || false"
                        :loading-text="formatItem.loadingText"
                        :no-data-text="formatItem.noDataText"
                        :value-key="formatItem.valueKey">
                        <el-option
                            v-for="(item, index) in formatItem.options"
                            :key="item.label"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </template>
                <!--日期-->
                <template v-else-if="formatItem.type === FormItemType.DATE">
                    <el-date-picker
                        class="same-width"
                        v-model="mFormData[formatItem.prop]"
                        type="date"
                        :editable="false"
                        :clearable="false"
                        :placeholder="formatItem.placeholder || '选择日期'"
                        :picker-options="formatItem.pickerOptions">
                    </el-date-picker>
                </template>
                <!--文本框-->
                <template v-else-if="formatItem.type === FormItemType.TEXTAREA">
                    <el-input
                        class="visit-content"
                        type="textarea"
                        v-model.trim="mFormData[formatItem.prop]"
                        :autosize="formatItem.autosize || { minRows: 2, maxRows: 4}"
                        resize="none"
                        :maxlength="formatItem.maxLength"
                        :placeholder="formatItem.placeholder">
                    </el-input>
                    <span v-show="formatItem.maxLength" class="text-area-input-tips">{{mFormData[formatItem.prop].length}}/{{formatItem.maxLength}}</span>
                </template>
                <!--单选-->
                <template v-else-if="formatItem.type === FormItemType.RADIO">
                    <el-radio-group class="same-width" v-model="mFormData[formatItem.prop]"
                                    :disabled="formatItem.disabled">
                        <el-radio-button
                            v-for="_item in formatItem.options"
                            :label="_item.value"
                            :key="_item.value">
                            {{_item.label}}
                        </el-radio-button>
                    </el-radio-group>
                </template>
                <!--选择年-->
                <template v-else-if="formatItem.type === FormItemType.DATE_YEAR">
                    <el-date-picker
                        v-model="mFormData[formatItem.prop]"
                        type="year"
                        :editable="false"
                        :clearable="false"
                        :placeholder="formatItem.placeholder || '选择年'">
                    </el-date-picker>
                </template>
                <!--文件列表-->
                <template v-else-if="formatItem.type === FormItemType.FILE_LIST">
                    <!--<file-list v-model="mFormData[formatItem.prop]"></file-list>-->
                </template>
                <!--密码-->
                <template v-else-if="formatItem.type === FormItemType.PASSWORD">
                    <el-input class="same-width" type="password" v-model.trim="mFormData[formatItem.prop]"></el-input>
                </template>
                <!--可搜索下拉框-->
                <template v-else-if="formatItem.type === FormItemType.SELECTION_REMOTE">
                    <el-select
                        class="same-width"
                        v-model="mFormData[formatItem.prop]"
                        filterable
                        remote
                        placeholder=""
                        :remote-method="formatItem.remoteMethod"
                        :loading="formatItem.loading"
                        @change="formatItem.changeEvent">
                        <el-option
                            v-for="option in formatItem.options"
                            :key="option.label"
                            :label="option.label || option"
                            :value="option.value || option">
                        </el-option>
                    </el-select>
                </template>
                <!--组件-->
                <template v-else-if="formatItem.type === FormItemType.COMPONENT">
                    <component :is="formatItem.component" v-model="mFormData[formatItem.prop]"
                               :format="formatItem"></component>
                </template>
                <!--开关-->
                <template v-else-if="formatItem.type === FormItemType.SWITCH">
                    <el-switch
                        v-model="mFormData[formatItem.prop]"
                        :on-text="formatItem.onText || ''"
                        :off-text="formatItem.offText || ''"
                        :on-color="formatItem.onColor"
                        :off-color="formatItem.offColor"
                        :disabled="formatItem.disabled || false"
                        :on-value="formatItem.onValue"
                        :off-value="formatItem.offValue">
                    </el-switch>
                </template>
                <!--数字-->
                <template v-else-if="formatItem.type === FormItemType.NUMBER">
                    <el-input-number
                        v-model="mFormData[formatItem.prop]"
                        :controls-position="formatItem.controlsPosition || 'right'"
                        :min="formatItem.hasOwnProperty('min') ? formatItem.min : -Infinity"
                        :max="formatItem.hasOwnProperty('max') ? formatItem.max : Infinity"
                        :size="formatItem.size || 'large'">
                    </el-input-number>
                </template>
            </el-form-item>
        </transition-group>
        <!--按钮-->
        <el-form-item v-if="$slots.tailFormItem">
            <slot name="tailFormItem"></slot>
        </el-form-item>
    </el-form>
</template>

/*********************************************/

<script>

    // todo 完善文档
    /**
     * 表单组件，支持各种样式的表单项
     * 如果有不支持的表单项，form_enum.js 中添加一个表单项类型，在此文件 template 中写样式 HTML
     */

    // methods
    /**
     * resetFields
     * 重置表单验证，还原表单验证的错误提示
     *
     this.$refs.form.resetFields()


     * validate
     * 表单验证方法
     *
     this.$refs.form.validate()
     */

    // props
    /**
     * formFormatData

     format = [{
            prop: 'author',
            label: '作者',
            type: FormItemType.INPUT,
            validator: {type: 'string', required: true, message: '请输入作者', trigger: 'change'},     // validator 更多用法请参照饿了么 表单组件 文档
        }]

     */
    import {
        Form,
        FormItem,
        Radio,
        RadioGroup,
        RadioButton,
        Input,
        DatePicker,
        Select,
        Option,
        Switch,
        InputNumber,
    } from 'meetin-sass-ui'
    import formItemType from './item-type'

    export default {
        name: 'XjlForm',
        components: {
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Radio.name]: Radio,
            [RadioGroup.name]: RadioGroup,
            [RadioButton.name]: RadioButton,
            [Input.name]: Input,
            [DatePicker.name]: DatePicker,
            [Select.name]: Select,
            [Switch.name]: Switch,
            [Option.name]: Option,
            [InputNumber.name]: InputNumber,
        },
        data() {
            return {
                mFormData: assignWithDefaultValue(this.value, this.formFormatData),
                loading: false,
                unwatchformData: null,
                FormItemType: formItemType,
            }
        },
        props: {
            // 表单格式数据，参照 example
            formFormatData: {
                type: Array,
                default: () => [],
            },
            // v-model 表单数据，可以是空对象 object = {}
            value: {
                type: Object,
                default: () => {
                    return {}
                },
            },
            // 表单项 label 宽度
            labelWidth: {
                type: String,
                default: '100px',
            },
            // 表单项 label 相对位置，left、right，可以参照下饿了么form组件
            labelPosition: {
                type: String,
                default: 'right',
            },
        },
        computed: {
            formRules() {
                const rules = {}
                this.formFormatData.forEach((formatItem) => {
                    if (formatItem.validator) {
                        rules[formatItem.prop] = formatItem.validator
                    }
                })
                return rules
            },
        },
        methods: {
            // 重置表单验证
            resetFields() {
                this.$refs.formatForm.resetFields()
            },
            // 表单验证
            validate() {
                return new Promise((resolve, reject) => {
                    this.$refs.formatForm.validate((valid) => {
                        if (valid) {
                            resolve()
                        } else {
                            reject(new Error('form validate failed'))
                        }
                    })
                })
            },
            validateField(prop) {
                return new Promise((resolve, reject) => {
                    this.$refs.formatForm.validateField(prop, (errorMessage) => {
                        if (errorMessage) {
                            reject(new Error(errorMessage))
                        } else {
                            resolve('')
                        }
                    })
                })
            },
            animationBeforeEnter(el) {
                el.style['margin-bottom'] = '0'
                el.style.overflow = 'hidden'
            },
            animationEnter(el, done) {
                console.log('before enter', el.clientHeight)
                el.originalHeight = `${el.clientHeight}px`
                el.style.height = '0'
                el.style['margin-bottom'] = '0'
                done()
            },
            animationAfterEnter(el) {
                console.log('enter', el.clientHeight)
                el.style.height = el.originalHeight
                el.style['margin-bottom'] = ''

                setTimeout(() => {
                    el.style.overflow = ''
                }, 300)
            },
            animationLeave(el, done) {
                console.log(el.clientHeight)
                el.style.overflow = 'hidden'
                el.style.height = '0'
                el.style['margin-bottom'] = '0'
                setTimeout(() => {
                    done()
                }, 300)
            },
            animationAfterLeave(el) {
                el.style.height = ''
                el.style['margin-bottom'] = '0'
            },
        },
        watch: {
            value: {
                deep: true,
                immediate: true,
                handler(newVal) {
                    if (this.unwatchformData) {
                        this.unwatchformData()
                    }
                    this.mFormData = assignWithDefaultValue(newVal, this.formFormatData)
                    this.unwatchformData = this.$watch('mFormData', (val) => {
                        this.$emit('input', val)
                    }, {
                        deep: true,
                    })
                },
            },
        },
    }

    /**
     * 利用表单格式数据来扩充表单对象，表单数据的属性必须和表单项一一对应，用户输入的数据方能放置于表单数据

     formData = {name: ''}
     format = [{prop: 'name'}, {prop: 'age'}]

     -->  newFormData = {name: '', age: ''}

     * @param formData  表单数据，从组件外传递进来，传递的数据可能是不完整的
     * @param formatData    表单的格式数据
     * @returns {*}
     */
    function assignWithDefaultValue(formData, formatData) {
        const defaultData = {}
        formatData.forEach((formatItem) => {
            defaultData[formatItem.prop] = formatItem.defaultValue || ''
        })
        return Object.assign({}, defaultData, formData)
    }
</script>

/*********************************************/

<style lang="scss" rel="stylesheet/scss">
    .format-form {
        .el-form-item {
            transition: height 0.3s, margin 0.3s;
        }
        .same-width {
            width: 100%;
        }
        .locked {
            pointer-events: none;
            opacity: 0.5;
        }
        .text-area-input-tips {
            color: #9FB9CC;
            font-size: 12px;
            line-height: 1;
            padding-top: 4px;
            position: absolute;
            top: 100%;
            right: 5px;
        }
        .disappear {
            height: 0;
        }
    }
</style>
