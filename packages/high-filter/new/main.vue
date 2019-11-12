<template>
    <div v-show="localVisible || filterSummary.length > 0" class="xjl-filter-root">
        <!-- 过滤数据总览区域 -->
        <div class="filter-summary">
            <!-- 数据展示 -->
            <div v-if="filterSummary.length > 0" class="filter-list">
                <template v-for="summary of filterSummary">
                    <span
                        :key="summary.prop"
                        class="summary-item">
                        <span>{{ summary.label }}：</span>
                        <span>{{ summary.value }}</span>
                        <span class="sep"></span>
                        <el-button
                            class="close-button"
                            icon="el-icon-close"
                            type="text"
                            @click="removeFilter(summary.prop)">
                        </el-button>
                    </span>
                </template>
            </div>
            <div v-else class="empty-tip">
                尚无筛选内容
            </div>
            <!-- 按钮 -->
            <div class="buttons">
                <el-button size="mini" @click="handleClearFilterData">
                    清空
                </el-button>
                <el-button size="mini" @click="switchVisible">
                    {{ localVisible ? '收起' : '展开' }}
                </el-button>
            </div>
        </div>

        <!-- 过滤项 slot -->
        <div v-show="localVisible" class="filter-detail">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
        name: 'high-filter',
        provide() {
            return {
                /**
                 * {
                 *     localData,
                 *     filterSummary,
                 * }
                 */
                injRoot: this,
            }
        },
        data() {
            return {
                // 组件自管理的过滤数据
                // provide 给子组件
                localData: {},
                // 过滤数据的摘要，独立显示
                // provide 给子组件
                filterSummary: [],
                unwatch: null,
                localVisible: this.visible,
            }
        },
        props: {
            // 使用 v-mode 维护数据
            value: {
                type: Object,
                default: () => ({}),
            },
            // 过滤组件是否可见
            visible: {
                type: Boolean,
                default: false,
            }
        },
        methods: {
            watchLocalData() {
                const handleChange = (val) => {
                    this.$emit('input', _.cloneDeep(val))
                }
                this.unwatch = this.$watch('localData', handleChange, {deep: true})
            },
            removeFilter(prop) {
                this.localData[prop] = ''
                // 直接 delete 不会触发UI更新
                delete this.localData[prop]
            },
            // clear
            handleClearFilterData() {
                this.localData = {}
            },
            switchVisible() {
                this.localVisible = !this.localVisible
                this.$emit('update:visible', this.localVisible)
            },
        },
        watch: {
            value: {
                deep: true,
                immediate: true,
                handler(val) {
                    this.unwatch && this.unwatch()
                    this.localData = _.cloneDeep(val) || {}
                    this.watchLocalData()
                },
            },
            visible(val) {
                this.localVisible = val
            }
        },
    }
</script>

<style scoped lang="scss">
    .xjl-filter-root {
        background: whitesmoke;
        padding: 15px 20px;
        border-radius: 4px;
    }

    /deep/ .xjl-filter-group + .xjl-filter-group {
        margin-top: 25px;
    }

    .filter-summary {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .summary-item {
        padding-left: 6px;
        border-radius: 4px;
        background: $--input-background-color;
        position: relative;
        color: $--color-text-secondary;
        margin-right: 15px;
        margin-top: 10px;
    }

    .sep {
        display: inline-block;
        width: 1px;
        height: 15px;
        background: $--color-primary-light-7;
        position: absolute;
        right: 25px;
        top: 5px;
    }

    .close-button {
        width: 25px;
        height: 25px;
        margin-left: 10px;
        padding: 0;
    }

    .filter-detail {
        margin-top: 15px;
    }

    .empty-tip {
        color: $--color-text-secondary;
        line-height: 25px;
    }

    .filter-list {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        margin-top: -10px;
    }

    .buttons {
        flex-shrink: 0;
        .el-button {
            height: 25px;
            padding-top: 0;
            padding-bottom: 0;
        }
    }
</style>