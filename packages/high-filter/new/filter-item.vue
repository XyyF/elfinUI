<script>
    import _ from 'lodash'
    import Vue from 'vue'

    export default {
        name: 'filter-item',
        inject: ['injRoot'],
        props: {
            /**
             * 过滤数据项的显示名
             */
            label: {
                type: String,
                default: ''
            },
            /**
             * 过滤数据项的 key
             */
            prop: {
                type: String,
                default: ''
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
                type: [Function, String, Object],
                default: null
            },
            /**
             * 渲染一个组件的所有配置
             */
            renderOptions: {
                type: Object,
                default: () => ({})
            },
            /**
             * 额外的数据，如果 render 是 function，会作为 render 的一个参数
             */
            extra: {
                type: Object,
                default: null
            },
            /**
             * 过滤数据总览时，自定义显示格式
             */
            formater: {
                type: Function,
                default: null,
            },
        },
        computed: {
            // 过滤项的数据
            value() {
                // todo
                if (this.injRoot.localData[this.prop] !==null && typeof this.injRoot.localData[this.prop] === 'object' && this.injRoot.localData[this.prop].length ===0) {
                    return undefined
                }
                return this.injRoot.localData[this.prop]
            }
        },
        methods: {
            // 同步数据到总览区域
            syncToSummary(newVal) {
                if (newVal || typeof newVal ==='boolean') {
                    const row = {
                        ...this._props
                    }
                    // 如果存在预览数据，就更新它，不存在就push一个新的
                    const summaryItem = this.injRoot.filterSummary.find(item => item.prop === this.prop)
                    if (summaryItem) {
                        summaryItem.value = this.formater ? this.formater(newVal, row) : newVal
                    }
                    else {
                        this.injRoot.filterSummary.push({
                            prop: this.prop,
                            label: this.label,
                            value: this.formater ? this.formater(newVal, row) : newVal
                        })
                    }
                }
                else {
                    const summaryIndex = this.injRoot.filterSummary.findIndex(item => item.prop === this.prop)
                    if (summaryIndex !== -1) {
                        this.injRoot.filterSummary.splice(summaryIndex, 1)
                    }
                }
            },
            // 同步数据到 filterData 中
            syncValue(val) {
                Vue.set(this.injRoot.localData, this.prop, val)
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
            } = this
            if (!render) return null

            // 初始化过滤数据总览
            syncToSummary(value)

            const vmodel = {
                props: {
                    value
                },
                on: {
                    input(val) {
                        syncValue(val)
                        syncToSummary(val)
                    }
                }
            }

            // itemContent 是 filter-item 的主体
            let itemContent = null
            if (typeof render === 'function') {
                itemContent = render(h, renderOptions, vmodel, extra)
            }
            else {
                const options = _.cloneDeep(renderOptions) || {}
                options.props = Object.assign({}, options.props, vmodel.props)
                options.on = Object.assign({}, options.on, vmodel.on)
                itemContent = h(render, {...options})
            }

            return h(
                'div',
                {
                    class: 'filter-item-root',
                },
                [
                    h(
                        'span',
                        {
                            class: 'item-label'
                        },
                        label
                    ),
                    itemContent
                ]
            )
        },
    }
</script>

<style scoped>
    .filter-item-root {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        min-width: 200px;
    }

    .item-label {
        font-size: 12px;
        margin-bottom: 5px;
    }

    .item-label + * {
        min-width: 200px;
    }
</style>