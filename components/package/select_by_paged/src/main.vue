<template>
    <div class="select-by-paged-root">
        <el-select :class="{isSelect: value}"
                   class="select"
                   @change="changeValue"
                   :value="value">
            <el-option
                v-for="item in moreOptions"
                :key="item.label"
                :label="item.label"
                :disabled="item.disabled || item.isEnd"
                :value="item.value">
                <span style="text-align: center; width: 100%; display: inline-block; color: #5ec37a; cursor: pointer"
                      v-if="item.isEnd && !isLoadOver"
                      v-loading="loading"
                      @click="loadingMore">{{item.label}}</span>
            </el-option>
        </el-select>
    </div>
</template>

/*********************************************/

<script>
    import Vue from  'vue'
    import _ from 'lodash'
    import {Loading, Select, Option} from 'meetin-sass-ui'

    Vue.use(Loading.directive);

    export default {
        name: 'select-by-paged',
        components: {
            [Select.name]: Select,
            [Option.name]: Option,
        },
        data() {
            return {
                loading: false,
            }
        },
        props: {
            // 当前项的数组
            selectOptions: {
                type: Array,
                default: []
            },
            // v-model的值
            value: {
                type: String,
                default: ''
            },
            // 总数
            optionsSum: {
                type: Number,
                default: 0
            },
            // 加载方法，必须是异步函数
            fetchSelectOptions: {
                type: Function,
                default:() => {}
            }
        },
        computed: {
            moreOptions() {
                const options = _.cloneDeep(this.selectOptions)
                return this.isLoadOver ? options : [
                    ...options, {
                        value: 'isEnd',
                        label: '--更多--',
                        isEnd: true,
                    }]
            },
            // 是否已经加载完
            isLoadOver() {
                return this.getRowStartIndex() >= this.optionsSum
            }
        },
        methods: {
            // 选择选项触发
            changeValue(val) {
                this.$emit('input', val)
            },
            // 获取当前页第一条数据的序号。这个方法是给父组件调用的
            getRowStartIndex() {
                return this.selectOptions.length
            },
            // 点击加载更多
            loadingMore() {
                if (!this.isLoadOver) {
                    this.loading = true
                    this.fetchSelectOptions().then(() => {
                        this.loading = false
                    })
                }
            }
        },
    }
</script>

/*********************************************/

<style lang="scss" rel="stylesheet/scss">
    .select-by-paged-root {
        line-height: 40px;
        position: relative;
        font-size: 14px;
        .select {
            width: 100%;
            margin: 0;
            .el-input__inner {
                border-radius: 2px;
                border-color: #bfd9c8;
                &:hover {
                    border-color: #83a591;
                }
            }
        }
        .isSelect {
            .el-input__inner {
                border-color: #30AB4F;
            }
        }
        input {
            border-radius: 4px;
        }
    }
</style>
