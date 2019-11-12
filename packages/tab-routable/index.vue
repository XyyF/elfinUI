<script>
    export default {
        name: 'tab-routable',
        data() {
            return {
                value: '',
            }
        },
        props: {
            /**
             * [
             *  {
             *      route: String,
             *      label: String,
             *      closable: Boolean,
             *      disabled: Boolean,
             *      lazy: Boolean
             *  }
             * ]
             */
            tabFormat: {
                type: Array,
                default: () => [],
            },
            /**
             * {
             *  props: {
             *      ...Tabs Attributes
             *  }
             *  on: {
             *      ...Tabs Events
             *  }
             * }
             */
            tabOptions: {
                type: Object,
                default: () => ({}),
            },
        },
        render(h) {
            const {
                tabFormat,
                tabOptions,
            } = this

            // 渲染 el-tab-pane
            const tabPanes = tabFormat.map(format => {
                const newFormat = {props: {}}
                newFormat.props = Object.assign({}, format, {name: format.route})
                return h(
                    'el-tab-pane',
                    {...newFormat},
                )
            })

            const clickEvent = (val) => {
                if (val && this.$router) {
                    this.$router.push({name: val.name})
                }
                // 如果外部设置了点击事件处理，也是需要触发的
                if (tabOptions.on) {
                    const tabClick = tabOptions.on.tabClick || tabOptions.on['tab-click']
                    if (tabClick) tabClick(val)
                }
            }
            // 处理 value 和 点击事件
            const newOptions = {...tabOptions}
            newOptions.props = Object.assign({}, newOptions.props, {value: this.value})
            newOptions.on = Object.assign({}, newOptions.on, {'tab-click': clickEvent})

            // 渲染 el-tabs
            return h(
                'el-tabs',
                {...newOptions},
                tabPanes,
            )
        },
        created() {
            this.value = this.$router.currentRoute.name
        },
    }
</script>

<style scoped lang="scss">
    .el-tabs {
        margin-top: 20px;
        padding: 0 24px;
        border-bottom: 1px solid #e4e7ed;
    }

    /deep/ .el-tabs__header {
        margin: 0;
    }
</style>