<script>
    export default {
        name: 'disable-tips-button',
        inheritAttrs: false,
        props: {
            // 传入 String 数据，直接当作 tips 显示
            // 传入 Object 数据，当作 props 设置给 el-tooltip
            tooltip: {
                type: [Object, String],
                default: '当前不可用',
            },
        },
        render(h) {
            const renderTooltip = () => {
                if (!this.$attrs.disabled || this.$attrs.disabled === 'false') return null
                // 传入 String 数据，直接当作 tips 显示
                // 传入 Object 数据，当作 props 设置给 el-tooltip
                let props = this.tooltip
                if (typeof this.tooltip === 'string') {
                    props = {content: this.tooltip}
                }
                return h(
                    'el-tooltip',
                    {
                        props,
                    },
                    [
                        h(
                            'div',
                            {
                                class: 'button-tips-trigger',
                            },
                        ),
                    ],
                )
            }

            return h(
                'el-button',
                {
                    props: this.$attrs,
                    on: this.$listeners,
                    style: {
                        position: 'relative',
                    },
                    slot: 'reference',
                },
                [
                    ...this.$slots.default,
                    renderTooltip(),
                ],
            )
        },
    }
</script>

<style scoped>
    /deep/ .button-tips-trigger {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
