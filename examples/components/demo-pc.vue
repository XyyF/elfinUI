<template>
    <div class="demo-components-root">
        <div class="source">
            <slot name="source"></slot>
        </div>

        <transition-auto-height>
            <template slot-scope="props">
                <div
                    v-show="showMeta"
                    class="meta"
                    :style="props.transStyle">
                    <div class="description">
                        <slot></slot>
                    </div>
                    <slot name="highlight"></slot>
                </div>
            </template>
        </transition-auto-height>

        <div class="dome-block-control" @click="showMetaSta">
            <i v-if="showMeta" class="el-icon-caret-top"></i>
            <i v-else-if="!showMeta" class="el-icon-caret-bottom"></i>
            <span class="text-slide-enter-to">
                {{ this.showMeta ? '隐藏代码' : '显示代码' }}
            </span>
        </div>
    </div>
</template>

<script>
    import transitionAutoHeight from 'packages/transition-auto-height/src/main.vue'

    export default {
        name: 'demo-pc',
        components: {
            transitionAutoHeight
        },
        data() {
            return {
                showMeta: false
            }
        },
        methods: {
            showMetaSta() {
                this.showMeta = !this.showMeta
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.demo-components-root {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
    &.hover {
        box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
    }
    .demo-button {
        float: right;
    }
    .source {
        padding: 24px;
    }
    .meta {
        padding: 20px;
        background-color: #fafafa;
        border-top: solid 1px #eaeefb;
        overflow: hidden;
        transition: height .2s;
        .description {
            padding: 20px;
            box-sizing: border-box;
            border: solid 1px #ebebeb;
            border-radius: 3px;
            font-size: 14px;
            line-height: 22px;
            color: #666;
            word-break: break-word;
            background-color: #fff;
        }
    }
    .dome-block-control {
        border-top: 1px solid #eaeefb;
        height: 44px;
        box-sizing: border-box;
        background-color: #fff;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        display: flex;
        justify-content: center;
        margin-top: -1px;
        color: #d3dce6;
        cursor: pointer;
        position: relative;
        &:hover {
            background-color: #f9fafc;
            color: #409eff;
        }
        .el-icon-caret-bottom, .el-icon-caret-top {
            font-size: 16px;
            line-height: 44px;
            transition: .3s;
        }
        .text-slide-enter-to {
            position: absolute;
            -ms-transform: translateX(60px);
            transform: translateX(60px);
            font-size: 14px;
            line-height: 44px;
            transition: all .3s ease;
            opacity: 0;
        }
    }
    &:hover {
        .el-icon-caret-bottom, .el-icon-caret-top {
            -ms-transform: translateX(-30px);
            transform: translateX(-30px);
        }
        .text-slide-enter-to {
            -ms-transform: translateX(0px);
            transform: translateX(0px);
            opacity: 1;
        }
    }
}
</style>
