<template>
    <div class="demo-components">
        <div class="source">
            <slot name="source"></slot>
        </div>
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
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import transitionAutoHeight from 'components/vue/transition_auto_height.vue'

    const marked = require('marked')

    @Component({
        name: 'demo-pc',
        components: {
            transitionAutoHeight,
        },
    })
    export default class DemoPc extends Vue {
        showMeta = true

        get textSlideName(): string {
            return this.showMeta ? '隐藏代码' : '显示代码'
        }

        showMetaSta() {
            this.showMeta = !this.showMeta
        }

        mounted() {
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
                margin: 10px;
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
</style>
