<script>
    import renderFactory from './render_factory'

    export default {
        name: 'elfin-buttons',
        props: {
            /* Notice: 写下props数据的描述、用途 */
            /* Notice: props 里面的定义，使用此结构，type、default */
            buttonsConfig: {
                type: Array,
                default: () => [],
            },
        },
        render(h) {
            const {
                buttonsConfig,
            } = this

            // 如果buttons为空 && 在button为空不渲染
            if (buttonsConfig.length === 0) {
                return null
            }
            return (
                <div class="elfin-buttons-root">
                    <div class="container">
                        {buttonsConfig.filter(e => !e.hidden).map(config => {
                            return (
                                <div>
                                    {config.label && (<label>{config.label}</label>)}
                                    {renderFactory.render(h, config)}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        },
    }
</script>

<style lang="scss" scoped></style>