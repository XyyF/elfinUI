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
                    {buttonsConfig.filter(e => !e.hidden).map(config => {
                        return (
                            <div class="elfin-buttons-item">
                                {config.label && (<label>{config.label}</label>)}
                                {renderFactory.render(h, config)}
                            </div>
                        )
                    })}
                </div>
            )
        },
    }
</script>

<style lang="scss" scoped>
    .elfin-buttons-root {
        width: 100%;
        display: flex;
        flex-shrink: 0;
    }

    /*组件 的 label样式*/
    .elfin-buttons-root .elfin-buttons-item > label {
        text-align: right;
        vertical-align: middle;
        font-size: 14px;
        color: #606266;
        padding-right: 12px;
        box-sizing: border-box;
    }

    /*TODO: 布局组件*/
    .elfin-buttons-item {
        padding: 0 10px;
    }

    /*el-button统一样式控制*/
    .elfin-buttons-root ::v-deep .el-button {
        height: 35px;
        border-radius: 2px;
    }

    /*所有的按钮宽度控制  -- 非文本的按钮*/
    .elfin-buttons-root ::v-deep .el-button:not(.el-button--text) {
        min-width: 115px;
    }
</style>