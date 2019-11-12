<template>
    <transition-auto-height>
        <!-- 使用 slot-scope 会报错 -->
        <!--Duplicate presence of slot "default" found in the same render tree slot-scope-->
        <div
            v-show="isShowing"
            class="high-level-filter"
            :style="{transition: 'height 300ms'}">
            <slot></slot>
            <div class="aside">
                <el-tooltip
                    content="清除选项"
                    placement="left"
                    transition="false">
                    <div class="button clear-filter" @click="reset">
                        <i class="el-icon-refresh"></i>
                    </div>
                </el-tooltip>
                <el-tooltip
                    content="收起"
                    placement="left"
                    transition="false">
                    <div class="button hieedn-filter" @click="hide">
                        <i class="el-icon-arrow-up"></i>
                    </div>
                </el-tooltip>
            </div>
        </div>
    </transition-auto-height>
</template>

<script>
    /**
     * method
     *
     *
     * 展示高级过滤 UI
     * show(): void
     *
     * 隐藏高级过滤 UI
     * hide(): void
     *
     * 切换高级过滤 UI 展示状态 (展示 -> 隐藏， 隐藏 -> 展示)
     * switch(): void
     *
     * event
     *
     * 显示UI触发的事件
     * did-show
     *
     * 隐藏UI触发的事件
     * did-hide
     */
    import TransitionAutoHeight from '../transition_auto_height'

    export default {
        name: 'high-filter-wrapper',
        components: {
            TransitionAutoHeight,
        },
        mixins: [],
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {
                // 展示状态
                isShowing: false,
            }
        },
        props: {
            /* Notice: 写下props数据的描述、用途 */
            /* Notice: props 里面的定义，使用此结构，type、default */
        },
        computed: {
            /* Notice: 写下computed数据的描述 */
        },
        filters: {},
        methods: {
            /* Notice: 复杂的方法，写下说明 */
            show() {
                this.isShowing = true
            },
            hide() {
                this.isShowing = false
            },
            switchOpenState() {
                this.isShowing = !this.isShowing
                return this.isShowing
            },
            // 重置筛选项
            reset() {
                this.$emit('reset')
            },
        },
        watch: {
            isShowing(val) {
                if (val) {
                    this.$emit('did-show')
                }
                else {
                    this.$emit('did-hide')
                }
            },
        },
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        mounted() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        activated() {
        },
        deactivated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        errorCaptured() {
        },
    }
</script>

<style lang="scss" scoped>
    .high-level-filter {
        background-color: #fbfcfd;
        display: flex;
        border: 1px solid #D3D9DE;
    }

    .aside {
        flex-shrink: 0;
        padding: 5px;
    }

    .aside .button {
        width: 40px;
        height: 40px;
        border: 1px solid transparent;
        color: #94A2AD;
        background-color: #E1E6F0;
        border-radius: 20px;
        text-align: center;
        line-height: 40px;
        margin: 10px 5px 5px;
        cursor: pointer;

        &:hover {
            border-color: #30AB4F;
            color: #30AB4F;
            background-color: #FBFCFD;
        }
    }
</style>