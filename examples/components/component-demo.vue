<template>
    <div class="component-demo-root">

        <div class="component__instance">
            <slot name="instance"></slot>
        </div>

        <el-collapse-transition>
            <div v-show="showMeta" class="component__meta">
                <div class="meta__description">
                    <slot></slot>
                </div>
                <div class="meta__highlight">
                    <slot name="highlight"></slot>
                </div>
            </div>
        </el-collapse-transition>

        <div class="component__block-control" @click="showMetaSta">
            <i v-if="showMeta" class="el-icon-caret-top"></i>
            <i v-else class="el-icon-caret-bottom"></i>
            <span class="block-control__text">
                {{this.showMeta ? '隐藏代码' : '显示代码'}}
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'component-demo',
        components: {},
        data() {
            return {
                showMeta: false
            }
        },
        methods: {
            showMetaSta() {
                this.showMeta = !this.showMeta
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .component-demo-root {
        border: 1px solid #ebebeb;
        border-radius: 3px;
        transition: .2s;
        &:hover {
            box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
            .el-icon-caret-bottom, .el-icon-caret-top {
                -ms-transform: translateX(-30px);
                transform: translateX(-30px);
            }
            .block-control__text {
                -ms-transform: translateX(0px);
                transform: translateX(0px);
                opacity: 1;
            }
        }
    }

    .component__instance {
        padding: 24px;
    }

    .component__meta {
        padding: 20px;
        background-color: #fafafa;
        border-top: solid 1px #eaeefb;
        overflow: hidden;
        transition: height .2s;
    }

    .meta__description {
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

    .component__block-control {
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
    }

    .el-icon-caret-bottom, .el-icon-caret-top {
        font-size: 16px;
        line-height: 44px;
        transition: .3s;
    }

    .block-control__text {
        position: absolute;
        -ms-transform: translateX(60px);
        transform: translateX(60px);
        margin-left: 10px;
        font-size: 14px;
        line-height: 44px;
        transition: all .3s ease;
        opacity: 0;
    }

    /deep/ .meta__highlight .hljs {
        background-color: #fafafa;
    }
</style>
