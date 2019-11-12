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
    import ItemType from './item-type'

    export default {
        name: 'xjl-buttons',
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {
                searchText: '',
            }
        },
        props: {
            /* Notice: 写下props数据的描述、用途 */
            /* Notice: props 里面的定义，使用此结构，type、default */
            buttonsConfig: {
                type: Array,
                default: () => [],
            },
            searchable: {
                type: Boolean,
                default: false,
            },
            placeholder: {
                type: String,
                default: '请输入',
            },
            value: {
                type: Object,
                default: () => {
                    return {}
                },
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
            updateSelection(key, val) {
                this.value[key] = val
                this.$emit('input', this.value)
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
                searchText,
                updateSearchText,
                placeholder,
                updateSelection,
                value,
            } = this
            const delegate = {value, updateSelection}
            const buttons = buttonsConfig.map(config => {
                if (config.type !== ItemType.SELECT_RIGHT) {
                    return renderFactory.render(h, config, delegate)
                }
                if (config.type === ItemType.SELECT_LEFT) {
                    return renderFactory.render(h, config, delegate)
                }
            })

                    const select = buttonsConfig.map(config => {
                if (config.type === ItemType.SELECT_RIGHT) {

                    return renderFactory.render(h, config, delegate)
                }
            })

            if (buttons.length === 0) {
                return null
            }

            const searchDomRender = () => {
                return h(
                    'div',
                    {
                        class: 'update-root',
                    },
                    [
                        select,
                        h(
                            'el-input',
                            {
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
                            },
                            [
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
                    ],
                )
            }

            return h(
                'div',
                {class: 'xjl-buttons-root'},
                [
                    h(
                        'div',
                        {class: 'container'},
                        [
                            h('div', {class: 'main'}, buttons),
                            searchable ? searchDomRender() : null,
                        ],
                    ),
                    h('div', {class: 'footer'}, $slots.default),
                ],
            )
        },
        mounted() {
        },
    }
</script>

<style lang="scss" scoped>
    .xjl-buttons-root {
        padding: 25px 0;
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
        flex-wrap: wrap;
        flex-grow: 1;
        flex-shrink: 1;
        justify-content: flex-start;
        align-items: flex-start;
    }

    // 所有的按钮大小相同
    .main /deep/ .el-button {
        min-width: 115px;
        height: 35px;
        border-radius: 2px;
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

    /deep/ .el-select--large {
        height: 35px;
        margin: 5px 10px 5px 0;
        line-height: 35px;
        align-content: flex-end;

        /deep/ .el-input__inner {
            height: 35px;
            line-height: 35px;
        }
    }

    /deep/ .update-root {
        display: flex;
        flex: 0 0 489px;
    }
</style>