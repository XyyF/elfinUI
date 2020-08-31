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
                    this.$emit('input', glodash.cloneDeep(val))
                }
                this.unwatch = this.$watch('localData', handleChange, {deep: true})
            },
            handleSwitchVisible(visibleState) {
                if (this.localVisible === visibleState) return
                this.localVisible = visibleState
                this.$emit('update:visible', visibleState)
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
                        onClick={() => this.handleSwitchVisible(!this.localVisible)}>
                        更多筛选
                        <i class={this.localVisible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'}></i>
                    </el-button>
                )
            },
            // 初始化 elfin-filters__arrow 元素的offsetLeft
            initialArrowOffset() {
                const moreBtnEl = this.$el.querySelector('.elfin-filters__button--more')
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
                    this.localData = glodash.cloneDeep(val) || {}
                    this.watchLocalData()
                },
            },
            visible: {
                handler(v) {
                    this.handleSwitchVisible(v)
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

    .elfin-filters-root ::v-deep .elfin-filter-group + .elfin-filter-group {
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

    .outer-section {
        display: inline-flex;
        align-items: center;
        width: 100%;
        min-height: 55px;
    }

    /*强行横向排列*/
    .outer-section ::v-deep .filter-item-root {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
    }

    .elfin-filters__button--more {
        position: relative;
    }

    .elfin-filters__button--more ::v-deep i {
        margin-left: 2px;
    }

    .elfin-filters__arrow {
        position: absolute;
        background: #FBFCFD;
        width: 10px;
        height: 10px;
        left: 0;
        top: -5px;
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