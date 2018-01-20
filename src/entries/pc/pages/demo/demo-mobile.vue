<template>
    <div class="demo-components">
        <div class="phone">
            <div class="scroll">
                <div class="vb-content">
                    <div class="source">
                        <slot name="source"></slot>
                    </div>
                </div>
            </div>
        </div>
        <div class="demo-wrap">
            <transition-auto-height>
                <template slot-scope="props">
                    <div class="meta" v-if="showMeta" :style="props.transStyle">
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
                <span class="text-slide-enter-to">{{textSlideName}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import marked from 'marked'
    import transitionAutoHeight from 'components/vue/transition_auto_height.vue'

    export default {
        name: 'demo-mobile',
        data () {
            return {
                showMeta: true,
            }
        },
        computed: {
            textSlideName () {
                return this.showMeta ? '隐藏代码' : '显示代码'
            },
        },
        methods: {
            showMetaSta () {
                this.showMeta = !this.showMeta
            },
        },
        components: {
            transitionAutoHeight,
        },
        mounted () {
            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false
            })
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../../../../common/pc/basic_const";

    .demo-components {
        display: flex;
        flex-flow: row nowrap;
        &.hover {
            box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
        }
        .demo-button {
            float: right;
        }
        .meta {
            background-color: #fafafa;
            border: solid 1px #eaeefb;
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
                margin: 10px;
                background-color: #fff;
            }
        }
        .dome-block-control {
            border: 1px solid #eaeefb;
            height: 44px;
            box-sizing: border-box;
            background-color: #fff;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            text-align: center;
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

        .phone {
            width: 320px;
            height: 486px;
            background: url('../../images/preview/phone.svg');
            position: relative;
            .scroll {
                display: block;
                width: 289px;
                height: 361px;
                position: relative;
                top: 61px;
                left: 15px;
                overflow: hidden;
            }
            .vb-content {
                display: block;
                overflow-x: hidden;
                overflow-y: scroll;
                height: 100%;
                width: 290px;
                &::-webkit-scrollbar { /* 滚动条整体部分 */
                    width: 5px;
                }
                &::-webkit-scrollbar-button { /* 滚动条两端的按钮 */
                    width: 0;
                    height: 0;
                }
                &::-webkit-scrollbar-track { /* 外层轨道 */
                    border-right: 1px solid transparent;
                    border-left: 1px solid transparent;
                }
                &::-webkit-scrollbar-track-piece { /*内层轨道，滚动条中间部分 */
                    background-color: #FFF;
                    border-radius: 10px;
                }
                &::-webkit-scrollbar-thumb { /* 滑块 */
                    border-radius: 8px;
                    background: #CBCBCB;
                }
                &::-webkit-scrollbar-corner { /* 边角 */
                    display: block;
                }
                &::-webkit-scrollbar-thumb:hover { /* 鼠标移入滑块 */
                    background: #909090;
                }
            }
            .source {
                width: 290px;
            }
        }

        .demo-wrap {
            margin-left: 10px;
            width: calc(100% - 330px);
            &:hover {
                .el-icon-caret-bottom, .el-icon-caret-top {
                    -ms-transform: translateX(-30px);
                    transform: translateX(-30px);
                }
                .text-slide-enter-to {
                    -ms-transform: translateX(-30px);
                    transform: translateX(-30px);
                    opacity: 1;
                }
            }
        }
    }
</style>
