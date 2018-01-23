<template>
    <div>
        <el-select
            @change="setSelectOptions"
            v-model="selected"
            :multiple="multiple"
            :filterable="filterable"
            :remote="remote"
            :placeholder="placeholder"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
                v-for="(item,index) in multipleOptions"
                :disabled="item.disabled"
                :key="index"
                :label="item.label"
                :value="item.value">
                <slot name="cell" :option="item"></slot>
            </el-option>
        </el-select>
        <div class="multiple-select-content">
            <div class="multiple-select-item" v-for="(item, index) in selectOptions" :key="index">
                <i @click="clearSelectItem(item)" class="el-icon-circle-close clear-item"></i>
                {{item.label}}
            </div>
        </div>
    </div>
</template>


<script>
    import {Select, Option} from 'meetin-sass-ui'

    export default {
        name: 'multiple-box',
        data() {
            return {
                selected: '',
                selectOptions: []
            }
        },
        components: {
            [Select.name]: Select,
            [Option.name]: Option
        },
        props: {
            multipleOptions: {
                type: Array,
                default: () => {
                    return [{label: '', value: ''}]
                }
            },
            isRequired: {
                type: Boolean,
                default: true
            },
            warningText: String,
            multiple: Boolean,
            filterable: Boolean,
            remote: Boolean,
            remoteMethod: {
                type: Function,
                default: null
            },
            loading: Boolean,
            placeholder: String,
            value: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            setSelectOptions(optionValue) {
                if (optionValue) {
                    const newValue = this.value.concat([optionValue])
                    this.$emit('setSelectOptions', newValue)
                    this.$emit('input', newValue)
                    if (this.remote) {
                        // 远程搜索
                        this.selected = '' // 选择之后清空选择框
                    }
                }
            },
            clearSelectItem(option) {
                this.selected = '';
                const foundIndex = this.value.findIndex(value => option.value === value)
                if (foundIndex < 0) {
                    return
                }
                const newValue = this.value.filter((element, index) => index !== foundIndex)
                this.$emit('clearSelectItem', newValue);
                this.$emit('input', newValue)
            }
        },
        watch: {
            value(val, oldVal) {
                if (this.remote) {
                    if (val.length < oldVal.length) {
                        // 删除一个选中项
                        this.selectOptions = this.selectOptions.filter((option) => {
                            return val.some(item => item === option.value)
                        })
                    } else {
                        const appendValue = val[val.length - 1]
                        const appendOptions = this.multipleOptions.filter(option => option.value === appendValue)
                        this.selectOptions = this.selectOptions.concat(appendOptions)
                    }
                } else {
                    this.selectOptions = this.multipleOptions.filter((option) => {
                        return val.some(item => item === option.value)
                    })
                }
            }
        }
    }

</script>

<style lang="scss" rel="stylesheet/scss">
    .multiple-select-content {
        margin-top: 15px;
        display: flex;
        flex-wrap: wrap;
        .multiple-select-item {
            position: relative;
            height: 30px;
            line-height: 30px;
            box-sizing: border-box;
            padding: 0 18px;
            margin-right: 14px;
            margin-bottom: 14px;
            background-color: #F4F8F9;
            border-radius: 4px;
            border: dashed 1px #36B459;
            .clear-item {
                font-size: 16px;
                color: #36B459;
                position: absolute;
                right: -5px;
                top: -5px;
            }
        }
    }
</style>
