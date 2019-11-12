<script>
    /**
     * 代码导读
     *
     * 解析配置数据，渲染一系列 组件
     * 场景：学生列表页面，渲染表格上方的一系列按钮
     *
     * 传入的配置数据有不同的type，对应不用的组件类型
     */

    import renderFactory from './render_factory'

    export default {
        name: 'complex-row',
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {
                searchText: '',
            }
        },
        props: {
            /* Notice: 写下props数据的描述、用途 */
            /* Notice: props 里面的定义，使用此结构，type、default */
            buttonConfigs: {
                type: Array,
                default: () => [],
            },
            searchable: {
                type: Boolean,
                default: false,
            },
            placeholder: {
                type: String,
                default: '请输入搜索内容',
            },
            isButtonEmptyRender: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            /* Notice: 写下computed数据的描述 */
        },
        filters: {},
        methods: {
            /* Notice: 复杂的方法，写下说明 */
            updateSearchText(val) {
                this.searchText = val
                this.$emit('update:searchText', val)
            },
            // 渲染搜索框
            renderSearch(h) {
                const {
                    searchText,
                    updateSearchText,
                    placeholder,
                } = this

                return h('div', {}, [
                    h('el-input', {
                        class: 'search',
                        props: {
                            value: searchText,
                            size: 'medium',
                            clearable: true,
                        },
                        attrs: {
                            placeholder,
                        },
                        on: {
                            input: updateSearchText,
                        },
                    }, [
                        h(
                            'el-button',
                            {
                                props: {
                                    icon: 'el-icon-search',
                                },
                                slot: 'append',
                            },
                        ),
                    ]),
                ])
            },
        },
        watch: {
            /* Notice: 写下说明 */
        },
        render(h) {
            const {
                buttonsConfig,
                $slots,
                searchable,
                isButtonEmptyRender,
            } = this

            // 如果buttons为空 && 在button为空不渲染
            if (buttonsConfig.length === 0 && !isButtonEmptyRender) {
                return null
            }

            const leftButtons = buttonsConfig.filter(e => !e.right).map(config => {
                if (config.label) {
                    return h('div', {class: 'button__wrap'}, [
                        h('label', {class: 'select__label'}, config.label),
                        renderFactory.render(h, config),
                    ])
                }
                return renderFactory.render(h, config)
            })

            const rightButtons = buttonsConfig.filter(e => e.right).map(config => {
                if (config.label) {
                    return h('div', {class: 'button__wrap'}, [
                        h('label', {class: 'select__label'}, config.label),
                        renderFactory.render(h, config),
                    ])
                }
                return renderFactory.render(h, config)
            })

            return h(
                'div',
                {class: 'complex-row-root'},
                [
                    h(
                        'div',
                        {class: 'container'},
                        [
                            h('div', {class: 'buttons__left main'}, leftButtons),
                            h('div', {class: 'buttons__right main'}, rightButtons),
                            searchable ? this.renderSearch(h) : null,
                        ],
                    ),
                    // 自定义的扩展内容
                    h('div', {class: 'footer'}, $slots.default),
                ],
            )
        },
    }
</script>

<style lang="scss" scoped>
    .complex-row-root {
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        flex-shrink: 0;
    }

    .container {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }

    .main {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .main /deep/ .el-button {
        height: 35px;
        border-radius: 2px;
    }

    // 所有的按钮大小相同  -- 非文本的按钮
    .main /deep/ .el-button:not(.el-button--text) {
        min-width: 115px;
    }

    .buttons__left {
        flex-grow: 1;
        flex-wrap: wrap;
        align-items: center;
    }

    .buttons__right {
        flex-shrink: 0;
        flex-wrap: nowrap;
        align-items: center;
    }

    .search {
        flex-shrink: 0;
        width: 300px;
        margin-top: 5px;
    }

    // 部分类型组件 margin相同
    .xjl-button-item {
        margin: 5px 10px 5px 0;
    }

    // checkbox组件
    .render-checkbox {
        margin: 10px 10px 10px 0;
    }

    // badge 组件的 slot
    .badge-slot {
        margin: 0;
    }

    // popover 组件
    .render-popover {
        display: inline-block;
    }

    // date-picker 组件
    .render-date {
        height: 35px;
    }

    .render-date /deep/ .el-date-editor .el-range__icon {
        line-height: 1;
    }

    /*组件 的 label样式*/
    .complex-row-root /deep/ .select__label {
        text-align: right;
        vertical-align: middle;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 6px;
        box-sizing: border-box;
    }

    /*el-select样式*/
    .complex-row-root /deep/ .button__wrap > .el-select {
        width: 200px;
        height: 35px;
        /*margin: 5px 10px 5px 0;*/
        line-height: 35px;
        align-content: flex-end;

        /deep/ .el-input__inner {
            height: 35px;
            line-height: 35px;
        }
    }

    .complex-row-root /deep/ .update-root {
        display: flex;
    }
    .button__wrap{
        display: flex;
        align-items: center;
        margin-right: 15px;
    }
</style>