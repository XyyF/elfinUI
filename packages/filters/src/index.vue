<script>
    export default {
        name: 'elfin-filters',
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
                // 是否展示 slot.default
                localVisible: false,
            }
        },
        props: {
            // 使用 v-mode 维护数据
            value: {
                type: Object,
                default: () => ({}),
            },
            visible: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            watchLocalData() {
                const handleChange = (val) => {
                    this.$emit('input', _.cloneDeep(val))
                }
                this.unwatch = this.$watch('localData', handleChange, {deep: true})
            },
            handleSwitchVisible() {
                this.localVisible = !this.localVisible
                this.$emit('update:visible', this.localVisible)
                if (this.localVisible) {
                    this.$nextTick(() => {
                        this.initialArrowOffset()
                    })
                }
            },
            // 渲染更多筛选按钮
            renderMoreFilters() {
                return (
                    <el-button
                        type="text"
                        class="elfin-filters__button--more"
                        onClick={this.handleSwitchVisible}>
                        更多筛选
                        <i class={this.localVisible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'}></i>
                    </el-button>
                )
            },
            // 初始化 elfin-filters__arrow 元素的offsetLeft
            initialArrowOffset() {
                const moreBtnEl = this.$el.querySelector('.elfin-filter__button--more')
                if (!moreBtnEl) return
                const filterWrapLeft = this.$el.querySelector('.filters-detail').offsetLeft
                const moreBtnWidth = moreBtnEl.offsetWidth
                const moreBtnLeft = moreBtnEl.offsetLeft
                const el = this.$el.querySelector('.elfin-filters__arrow')
                const left = moreBtnLeft - filterWrapLeft + (moreBtnWidth / 2) - 5
                el.style.left = `${left}px`
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
            visible: {
                handler(v) {
                    this.localVisible = v
                },
            },
        },
        render() {
            return (
                <div class="elfin-filters-root">
                    <div class="outer-section">
                        {this.$slots.outer}
                        {this.$slots.default && this.renderMoreFilters()}
                    </div>

                    <el-collapse-transition>
                        <div v-show={this.localVisible} class="filters-detail">
                            <div class="placeholder-content"></div>
                            <div class="elfin-filters__arrow"></div>
                            <div class="filters-detail-container">
                                {this.$slots.default}
                            </div>
                        </div>
                    </el-collapse-transition>
                </div>
            )
        },
    }
</script>

<style lang="scss" scoped>
    .elfin-filters-root {
        margin-bottom: 10px;
    }

    .elfin-filters-root ::v-deep .elfin-filters-group + .elfin-filters-group {
        margin-top: 25px;
    }

    .filters-detail {
        position: relative;
    }

    .filters-detail-container {
        padding: 20px;
        background: #FBFCFD;
        border-radius: 4px;
        border: 1px solid #E5E9F2;
    }

    /* 为了让动画更顺滑，避免使用margin，使用这个div做占位 */
    .placeholder-content {
        width: 100%;
        height: 8px;
    }

    .outer-section {
        display: inline-flex;
        align-items: center;
        width: 100%;
        min-height: 55px;
    }

    /*强行横向排列*/
    .outer-section ::v-deep .filters-item-root {
        display: inline-flex;
        flex-direction: row;
        align-items: center;

        margin-right: 10px;
    }

    .outer-section ::v-deep .elfin-filters-group {
        padding-bottom: 5px;
    }

    .outer-section ::v-deep .filters-item-root .item-label {
        margin-right: 10px;
    }

    .elfin-filters__button--more {
        position: relative;
    }

    .elfin-filter__button--more ::v-deep i {
        margin-left: 2px;
    }

    .elfin-filters__arrow {
        position: absolute;
        background: #FBFCFD;
        width: 10px;
        height: 10px;
        left: 0;
        top: 3px;
        border: none;
        border-top: 1px solid #E5E9F2;
        border-left: 1px solid #E5E9F2;
        transform: rotate(45deg);
        border-radius: 2px;
        /*禁用点击行为*/
        user-select: none;
        pointer-events: none;
    }
</style>