<script>
    import asserts from '../__utils/typeof'
    import {getPropByPath} from '../__utils'

    import RenderFactory from './render_factory'

    export default {
        name: 'elfin-filters-item',
        inject: ['injRoot'],
        props: {
            /**
             * 过滤数据项的显示名
             */
            label: {
                type: String,
                default: '',
            },
            /**
             * 过滤数据项的 key
             */
            prop: {
                type: String,
                default: '',
            },
            /**
             * render: Function
             *   @param h 渲染函数
             *   @param renderOptions 即配置项当中的 renderOptions
             *   @param vmodel 处理数据同步，必须用此配置处理数据同步
             *      {
             *          props: {
             *              value: xx
             *          },
             *          on: {
             *              input(val) {
             *                  xxx
             *              }
             *          }
             *      }
             *
             * render: String  传入已注册组件的注册名，中横线语法的string
             *
             * render: Object[Vue Component] 传入一个组件实例
             */
            render: {
                type: [Function, String, Object, Number],
                default: null,
            },
            /**
             * 渲染一个组件的所有配置
             */
            renderOptions: {
                type: Object,
                default: () => ({}),
            },
            /**
             * 额外的数据，如果 render 是 function，会作为 render 的一个参数
             */
            extra: {
                type: Object,
                default: null,
            },
            /**
             * 过滤数据总览时，自定义显示格式
             */
            formater: {
                type: Function,
                default: null,
            },
            inline: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            // 过滤项的数据
            value() {
                const result = getPropByPath(this.injRoot.localData, this.prop)
                const value = result.o[result.k]
                // 如果是一个空数组的话
                if (asserts.isArray(value) && value.length === 0) {
                    return void 0
                }
                return value
            },
            // 是否是多选选项
            isMultiSelect() {
                if (!this.renderOptions.props) return false
                return this.renderOptions.props.multiple
            },
            formaterInRenderFactor() {
                if (this.formater) {
                    return this.formater
                }
                if (asserts.isNumber(this.render)) {
                    return RenderFactory.formater(this.render)
                }
                return null
            },
        },
        methods: {
            // 同步数据到总览区域
            syncToSummary(newVal) {
                // 兼容 false & 0
                if (newVal || asserts.isBoolean(newVal) || asserts.isNumber(newVal)) {
                    const row = {...this._props}
                    // 多选的话
                    if (this.isMultiSelect) {
                        // 判断是否需要更新 -- 只有 增加 | 删除 后才会更新
                        const includeSummary = this.injRoot.filterSummary.filter(item => item.prop === this.prop)
                        const isNeedUpdate = includeSummary.length !== newVal.length
                        if (!isNeedUpdate) return
                        // tips: 这里直接赋值会触发elfin-filters的更新，导致item更新，所以上面会进行判断以免循环
                        this.injRoot.filterSummary = this.injRoot.filterSummary
                            .filter(item => item.prop !== this.prop)
                            .concat(newVal.map(e => ({
                                prop: this.prop,
                                label: '',
                                value: this.formaterInRenderFactor ? this.formaterInRenderFactor(e, row) : e,
                                optionKey: e, // 作为标识的字段
                                isMultiple: true, // 是多选
                            })))
                        return
                    }
                    // format返回后有值才设置 (''、null、undefined不会展示)
                    // tips: 如check-box取消选中，为false，不会展示文本
                    // tips: 如果返回的是数字类型，那么就展示
                    const formatValue = this.formaterInRenderFactor ? this.formaterInRenderFactor(newVal, row) : newVal
                    if (formatValue || asserts.isNumber(formatValue)) {
                        // 如果存在预览数据，就更新它，不存在就push一个新的
                        const summaryItem = this.injRoot.filterSummary.find(item => item.prop === this.prop)
                        if (summaryItem) {
                            summaryItem.value = formatValue
                            summaryItem.optionKey = newVal
                        } else {
                            this.injRoot.filterSummary.push({
                                prop: this.prop,
                                label: this.label,
                                value: formatValue,
                                optionKey: newVal,
                                isMultiple: false,
                            })
                        }
                        return
                    }
                }
                // 删除值
                const summaryIndex = this.injRoot.filterSummary.findIndex(item => item.prop === this.prop)
                if (summaryIndex !== -1) {
                    this.injRoot.filterSummary.splice(summaryIndex, 1)
                }
            },
            // 同步数据到 filterData 中
            syncValue(val) {
                const result = getPropByPath(this.injRoot.localData, this.prop)
                if (result.o[result.k] === val) return
                this.$set(result.o, result.k, val)
            },
        },
        render(h) {
            const {
                label,
                render,
                renderOptions,
                syncValue,
                syncToSummary,
                value,
                extra,
                inline,
            } = this
            if (!render) return null

            // 初始化过滤数据总览
            syncToSummary(value)

            const vmodel = {
                props: {
                    value,
                },
                on: {
                    input(val) {
                        syncValue(val)
                        syncToSummary(val)
                    },
                },
            }

            // itemContent 是 filter-item 的主体
            let itemContent = null
            if (asserts.isFunction(render)) {
                itemContent = render(h, renderOptions, vmodel, extra)
            } else if (asserts.isNumber(render)) {
                itemContent = RenderFactory.render(h, renderOptions, vmodel, this._props, render)
            } else {
                const options = glodash.cloneDeep(renderOptions) || {}
                options.props = Object.assign({}, options.props, vmodel.props)
                options.on = Object.assign({}, options.on, vmodel.on)
                itemContent = h(render, {...options})
            }
            return (
                <div class={['filter-item-root', inline && 'is-inline']}>
                    {this.label && (
                            <span class="item-label">
                                {inline ? (label ? `${label}:` : '') : label}
                            </span>
                    )}
                    {itemContent}
                </div>
            )
        },
    }
</script>

<style scoped>
    .filter-item-root {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .filter-item-root.is-inline {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .item-label {
        font-size: 14px;
        margin: 0 0 5px 0;
    }

    .filter-item-root.is-inline .item-label {
        margin: 0 10px 0 0;
        flex-shrink: 0;
    }

    .filter-item-root.is-inline {
        margin-right: 20px;
    }

    .item-label + .el-select {
        min-width: 200px;
    }
</style>